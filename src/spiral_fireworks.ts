import { ProgramWrapper, TexturesManager } from "./webgl";
import * as Shaders from './shaders'

interface Settings {
    count: number;
    r: number;
    speed: number;
    colors: {
        red: boolean;
        green: boolean;
        blue: boolean;
    };
    size: number;
    groups: number;
    layers: number;
}

function recordOf<Value, Keys extends string>(record: Record<Keys, Value>): Record<Keys, Value> {
    return record;
}

export default (gl: WebGL2RenderingContext) => ({
    firework: new FireworkShader3(gl),
    settings: {
        count: {
            type: 'int',
            default: 40,
        },
        r: {
            type: 'float',
            default: Math.min(0.5 * gl.drawingBufferWidth, 340),
            min: 0.1,
            max: 3400,
        },
        speed: {
            type: 'float',
            default: 1,
        },
        colors: {
            type: 'object',
            values: {
                red: { type: 'boolean', default: true },
                green: { type: 'boolean', default: true },
                blue: { type: 'boolean', default: true },
            }
        },
        size: { type: 'int', default: 32 },
        groups: { type: 'int', default: 1 },
        layers: { type: 'float', default: 2 },
    } as const,
    make(textures: TexturesManager<"fireworkRed" | "fireworkGreen" | "fireworkBlue">, { size, groups, count, r, layers, speed, colors }: Settings) {
        const times = new Float32Array(count).fill(0);
        const delta = 1 / count;
        const { red, green, blue } = colors;
        for (let i = 0; i < count; i++)
            times[i] = delta * (i % (count / groups));
        return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
            for (let i = 0; i < count; i++)
                times[i] = (times[i] + dt*speed) % 1;
            if (blue)
                this.firework.draw(textures.get('fireworkBlue'), mvMatrix, projectionMatrix, times, size, r, layers);
            if (green)
                this.firework.draw(textures.get('fireworkGreen'), mvMatrix, projectionMatrix, times, size, r, layers);
            if (red)
                this.firework.draw(textures.get('fireworkRed'), mvMatrix, projectionMatrix, times, size, r, layers);
        }
    },
    presets: recordOf<Settings, string>({
        circle: {
            count: 40,
            r: 340,
            speed: 1,
            colors: { red: true, green: true, blue: true },
            size: 32,
            groups: 40,
            layers: 1,
        },
        double: {
            count: 40,
            r: 340,
            speed: 1,
            colors: { red: true, green: true, blue: true },
            size: 32,
            groups: 2,
            layers: 1,
        },
        explosion1: {
            count: 40,
            r: 340,
            speed: 1,
            colors: { red: true, green: true, blue: true },
            size: 256,
            groups: 20,
            layers: 2,
        },
        explosion2: {
            count: 40,
            r: 340,
            speed: 1,
            colors: { red: true, green: true, blue: true },
            size: 256,
            groups: 20,
            layers: 10.1,
        },
    }),
})

class FireworkShader3 extends ProgramWrapper<"texture" | "mvMatrix" | "pMatrix" | "size" | "radius" | "count" | "layers", "time"> {
    private posBuffer: WebGLBuffer
    constructor(gl: WebGL2RenderingContext) {
        super(gl, Shaders.fireworkSpiral, {
            texture: "u_texture",
            mvMatrix: "u_mvMatrix",
            pMatrix: "u_pMatrix",
            size: "u_size",
            radius: "u_radius",
            count: "u_count",
            layers: "u_layers"
        }, {
            time: "a_time"
        })
        this.posBuffer = gl.createBuffer()!
    }
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, times: Float32Array, size: number, r: number, layers: number) {
        const gl = this.gl;
        gl.useProgram(this.program);
        gl.uniform1i(this.uniforms.texture, textureID);
        gl.uniform1f(this.uniforms.size, size);
        gl.uniform1f(this.uniforms.radius, r);
        gl.uniform1i(this.uniforms.count, times.length);
        gl.uniform1f(this.uniforms.layers, layers);
        gl.uniformMatrix4fv(this.uniforms.mvMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(this.uniforms.pMatrix, false, pMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.vertexAttribPointer(this.attributes.time, 1, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, times, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.attributes.time)
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.drawArrays(gl.POINTS, 0, times.length)
        gl.useProgram(null);
    }
}