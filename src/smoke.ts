import { ProgramWrapper, TexturesManager } from "./webgl";
import * as Shaders from './shaders'
import { HTML } from "./web/html";

const SettingsDescription = {
    count: { type: 'int', default: 101 },
    r: {
        type: 'float',
        default: 340,
        min: 0.1,
        max: 3400,
    },
    speed: { type: 'float', default: 0.1 },
    color: { type: 'color', default: "#FFFFFF" },
    size: { type: 'int', default: 32 },
    groups: { type: 'int', default: 1 },
    layers: { type: 'float', default: 3 },
    gravitation: { type: 'float', default: -4000 },
} as const

type Settings = HTML.Input.ObjectType<typeof SettingsDescription>

function colorFromStringToVec4(s: string): [number, number, number, number] {
    s = s.substring(1); // cut #
    switch (s.length) {
        case 6:
            return [...([0, 2, 4] as const).map(i => parseInt(s.substring(i, i + 2), 16) / 255), 1] as [number, number, number, number]
        case 8:
            return ([0, 2, 4, 6] as const).map(i => parseInt(s.substring(i, i + 2), 16) / 255) as [number, number, number, number]
    }
    throw new Error(`Can't parse color ${s}.`);
}

export default (gl: WebGL2RenderingContext) => ({
    firework: new FireworkShader(gl),
    settings: SettingsDescription,
    make(textures: TexturesManager<"smoke">, { color, size, groups, count, r, layers, speed, gravitation }: Settings) {
        const times = new Float32Array(count).fill(0);
        const delta = 1 / count;
        for (let i = 0; i < count; i++)
            times[i] = delta * (i % (count / groups));
        return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
            for (let i = 0; i < count; i++)
                times[i] = (times[i] + dt * speed) % 1;
            this.firework.draw(textures.get('smoke'), mvMatrix, projectionMatrix, times, size, r, layers, gravitation, 9, colorFromStringToVec4(color));
        }
    },
    presets: {
    },
})

class FireworkShader {
    constructor(private gl: WebGL2RenderingContext) { }
    private posBuffer: WebGLBuffer = this.gl.createBuffer()!
    private shader = new ProgramWrapper(this.gl, Shaders.smoke, {
        texture: "u_texture",
        mvMatrix: "u_mvMatrix",
        pMatrix: "u_pMatrix",
        size: "u_size",
        radius: "u_radius",
        count: "u_count",
        layers: "u_layers",
        gravitation: "u_gravitation",
        framesCount: "u_framesCount",
        color: "u_color"
    }, {
        time: "a_time"
    });
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, times: Float32Array, size: number, r: number, layers: number, g: number, framesCount: number, color: [number, number, number, number]) {
        const gl = this.gl;
        const { uniforms, attributes, program } = this.shader;
        gl.useProgram(program);
        gl.uniform1i(uniforms.texture, textureID);
        gl.uniform1f(uniforms.size, size);
        gl.uniform1f(uniforms.radius, r);
        gl.uniform1i(uniforms.count, times.length);
        gl.uniform1f(uniforms.layers, layers);
        gl.uniform1f(uniforms.gravitation, g);
        gl.uniform4f(uniforms.color, ...color);
        gl.uniform1f(uniforms.framesCount, framesCount);
        gl.uniformMatrix4fv(uniforms.mvMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(uniforms.pMatrix, false, pMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.vertexAttribPointer(attributes.time, 1, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, times, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(attributes.time)
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.drawArrays(gl.POINTS, 0, times.length)
        gl.useProgram(null);
    }
}