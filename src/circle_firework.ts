import * as Shaders from './shaders'
import { HTML } from './web/html'
import { ProgramWrapper, TexturesManager } from "./webgl"

export default (gl: WebGL2RenderingContext) => ({
    name: "Фейерверк",
    firework: new FireworkShader(gl),
    settings: {
        count: {
            type: 'int',
            default: 40,
        },
        r: {
            type: 'float',
            default: Math.min(0.5 * gl.drawingBufferWidth, 340),
            min: 0.1,
            max: 340,
        },
        speed: {
            type: 'float',
            default: Math.min(0.5 * gl.drawingBufferWidth, 138),
        }
    } as const,
    make(textures: TexturesManager<"fireworkRed" | "fireworkGreen" | "fireworkBlue">, { count, r, speed }: HTML.Input.ObjectType<typeof this["settings"]>) {
        const system1 = new FireworksParticleSystem(count, r, speed, 0)
        const system2 = new FireworksParticleSystem(count, r, speed, 1.5)
        const system3 = new FireworksParticleSystem(count, r, speed, 3)
        const size = (r / 10) | 0
        return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
            system1.update(dt);
            system2.update(dt);
            system3.update(dt);
            this.firework.draw(textures.get('fireworkBlue'), mvMatrix, projectionMatrix, system1.positions, size, system1.percent * 24);
            this.firework.draw(textures.get('fireworkGreen'), mvMatrix, projectionMatrix, system2.positions, size, system2.percent * 24);
            this.firework.draw(textures.get('fireworkRed'), mvMatrix, projectionMatrix, system3.positions, size, system3.percent * 24);
        }
    },
    presets: {
    },
})

class FireworksParticleSystem {
    positions = new Float32Array(this.count * 3)
    time = 0
    size = 0
    percent = 0
    constructor(public readonly count: number, readonly r: number, private minSpeed: number, delay: number = 0) {
        this.time -= delay
    }
    update(dt: number) {
        this.time += dt
        if (this.time < 0)
            return
        const r1 = this.r * 0.5
        const r2 = this.r * 2.5
        const dist = this.time * this.minSpeed
        const stepOne = dist < r1
        this.percent = dist / r2;
        for (let i = 0; i < this.count * 3; i += 3) {
            const angle = Math.PI * 2 / this.count * (i / 3)
            const dx = this.minSpeed * Math.cos(angle);
            const dy = this.minSpeed * Math.sin(angle) - (stepOne ? 0 : 30 * this.time * this.time)
            const dz = 0;
            this.positions[i + 0] += dx * dt;
            this.positions[i + 1] += dy * dt;
            this.positions[i + 2] += dz * dt;
            this.size = 32 * (dist / r1)
            if (dist > r2) {
                this.size = this.time =
                    this.positions[i] =
                    this.positions[i + 1] =
                    this.positions[i + 2] = 0;
            }
        }
    }
}

class FireworkShader {
    constructor(private gl: WebGL2RenderingContext) { }
    private posBuffer: WebGLBuffer = this.gl.createBuffer()!;
    private shader = new ProgramWrapper(this.gl, Shaders.firework, {
        texture: "u_texture",
        mvMatrix: "u_mvMatrix",
        pMatrix: "u_pMatrix",
        size: "u_size",
        frame: "u_frame",
    }, {
        position: "a_position"
    });
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, positions: Float32Array, size = 32, frame = 20) {
        const gl = this.gl;
        const { program, uniforms, attributes } = this.shader;
        gl.useProgram(program);
        gl.uniform1i(uniforms.texture, textureID);
        gl.uniform1f(uniforms.size, size);
        gl.uniform1i(uniforms.frame, frame);
        gl.uniformMatrix4fv(uniforms.mvMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(uniforms.pMatrix, false, pMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.vertexAttribPointer(attributes.position, 3, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(attributes.position)
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.drawArrays(gl.POINTS, 0, positions.length / 3)
        gl.useProgram(null);
    }
}
