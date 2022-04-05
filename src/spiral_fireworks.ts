import { ProgramWrapper, TexturesManager } from "./webgl";
import * as Shaders from './shaders'
import { HTML } from "./web/html";
import { RecursivePartial } from "./utils";

const SettingsDescription = {
    count: { type: 'int', default: 40 },
    r: {
        type: 'float',
        default: 340,
        min: 0.1,
        max: 3400,
    },
    speed: { type: 'float', default: 1 },
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
    gravitation: { type: 'float', default: 0 },
} as const

type Settings = HTML.Input.ObjectType<typeof SettingsDescription>

interface ParticleSystemDemo<T extends HTML.Input.Values<string>, Textures extends string> {
    settings: T;
    make(textureManager: TexturesManager<Textures>, settings: HTML.Input.ObjectType<T>): { draw(dt: number, mvMatrix: Float32Array, pMatrix: Float32Array): void }
    presets?: RecursivePartial<HTML.Input.ObjectType<T>>[];
}

export default (gl: WebGL2RenderingContext) => ({
    firework: new FireworkShader3(gl),
    settings: SettingsDescription,
    make(textures: TexturesManager<"fireworkRed" | "fireworkGreen" | "fireworkBlue">, { size, groups, count, r, layers, speed, colors, gravitation }: Settings) {
        const times = new Float32Array(count).fill(0);
        const delta = 1 / count;
        const { red, green, blue } = colors;
        for (let i = 0; i < count; i++)
            times[i] = delta * (i % (count / groups));
        return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
            for (let i = 0; i < count; i++)
                times[i] = (times[i] + dt * speed) % 1;
            if (blue)
                this.firework.draw(textures.get('fireworkBlue'), mvMatrix, projectionMatrix, times, size, r, layers, gravitation, 24);
            if (green)
                this.firework.draw(textures.get('fireworkGreen'), mvMatrix, projectionMatrix, times, size, r, layers, gravitation, 24);
            if (red)
                this.firework.draw(textures.get('fireworkRed'), mvMatrix, projectionMatrix, times, size, r, layers, gravitation, 24);
        }
    },
    presets: {
        circle: {
            count: 40,
            size: 32,
            groups: 40,
            layers: 1,
        },
        double: {
            count: 40,
            size: 32,
            groups: 2,
            layers: 1,
        },
        explosion1: {
            count: 40,
            size: 256,
            groups: 20,
            layers: 2,
        },
        explosion2: {
            count: 40,
            size: 256,
            groups: 20,
            layers: 10.1,
        },
        Circular_saw: {
            count: 400,
            colors: { red: false, green: true, blue: false },
            size: 33,
            groups: 2,
            layers: 34,
        },
    },
})

class FireworkShader3 extends ProgramWrapper<"texture" | "mvMatrix" | "pMatrix" | "size" | "radius" | "count" | "layers" | "gravitation" | "framesCount", "time"> {
    private posBuffer: WebGLBuffer
    constructor(gl: WebGL2RenderingContext) {
        super(gl, Shaders.fireworkSpiral, {
            texture: "u_texture",
            mvMatrix: "u_mvMatrix",
            pMatrix: "u_pMatrix",
            size: "u_size",
            radius: "u_radius",
            count: "u_count",
            layers: "u_layers",
            gravitation: "u_gravitation",
            framesCount: "u_framesCount",
        }, {
            time: "a_time"
        })
        this.posBuffer = gl.createBuffer()!
    }
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, times: Float32Array, size: number, r: number, layers: number, g: number, framesCount: number) {
        const gl = this.gl;
        gl.useProgram(this.program);
        gl.uniform1i(this.uniforms.texture, textureID);
        gl.uniform1f(this.uniforms.size, size);
        gl.uniform1f(this.uniforms.radius, r);
        gl.uniform1i(this.uniforms.count, times.length);
        gl.uniform1f(this.uniforms.layers, layers);
        gl.uniform1f(this.uniforms.gravitation, g);
        gl.uniform1f(this.uniforms.framesCount, framesCount);
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