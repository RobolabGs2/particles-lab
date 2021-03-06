import { ProgramWrapper, TexturesManager } from "./webgl";
import * as Shaders from './shaders'
import { HTML } from "./web/html";

const SettingsDescription = {
    count: { type: 'int', default: 1001 },
    speed: { type: 'float', default: 0.5 },
    fireColor: { type: 'color', default: "#FF0D05" },
    smokeColor: { type: 'color', default: "#1F1F1F" },
    size: { type: 'int', default: 64 },
    groups: { type: 'float', default: 1 },
    width: { type: 'float', default: 80 },
    gravitation: { type: 'float', default: -1500 },
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
    name: "Дым и огонь",
    shader: new SmokeShader(gl),
    settings: SettingsDescription,
    make(textures: TexturesManager<"smoke">, {
        fireColor: color, smokeColor: color2,
        size, groups, count, speed, gravitation,
        width,
    }: Settings) {
        const times = new Float32Array(count).fill(0);
        const delta = 1 / count;
        for (let i = 0; i < count; i++)
            times[i] = delta * (i % (count / groups));

        const smokeCount = count / 5
        const smokeTimes = new Float32Array(smokeCount).fill(0);
        const deltaSmoke = 1 / smokeCount;
        for (let i = 0; i < smokeCount; i++)
            smokeTimes[i] = deltaSmoke * (i % (smokeCount / groups));
        return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
            for (let i = 0; i < count; i++)
                times[i] = (times[i] + dt * speed) % 1;
            for (let i = 0; i < smokeCount; i++)
                smokeTimes[i] = (smokeTimes[i] + deltaSmoke * speed * 5) % 1;
            this.shader.draw(textures.get('smoke'), mvMatrix, projectionMatrix, times, size, gravitation, colorFromStringToVec4(color), width);
            this.shader.draw(textures.get('smoke'), mvMatrix, projectionMatrix, smokeTimes, size, gravitation, colorFromStringToVec4(color2), width, 0);
        }
    },
    presets: {
        Fireball: {
            width: 20,
        },
        Orange: {
            fireColor: "#D58E1A",
            smokeColor: "#38250b",
        },
        Green: {
            fireColor: "#1ad552",
            smokeColor: "#3a647e",
        }
    },
})

class SmokeShader {
    constructor(private gl: WebGL2RenderingContext) { }
    private posBuffer: WebGLBuffer = this.gl.createBuffer()!
    private shader = new ProgramWrapper(this.gl, Shaders.smoke, {
        texture: "u_texture",
        mvMatrix: "u_mvMatrix",
        pMatrix: "u_pMatrix",
        size: "u_size",
        gravitation: "u_gravitation",
        color: "u_color",
        shift: "u_timeShift",
        width: "u_width",
    }, {
        time: "a_time"
    });
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, times: Float32Array, size: number, g: number, color: [number, number, number, number], width: number, shift = 1) {
        const gl = this.gl;
        const { uniforms, attributes, program } = this.shader;
        gl.useProgram(program);
        gl.uniform1i(uniforms.texture, textureID);
        gl.uniform1f(uniforms.size, size);
        gl.uniform1f(uniforms.gravitation, g);
        gl.uniform1f(uniforms.shift, shift);
        gl.uniform1f(uniforms.width, width);
        gl.uniform4f(uniforms.color, ...color);
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