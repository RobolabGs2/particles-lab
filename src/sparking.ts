import * as Shaders from './shaders'
import { Rand } from './utils'
import { HTML } from './web/html'
import { ProgramWrapper, TexturesManager } from './webgl'

export default (gl: WebGL2RenderingContext) => ({
    name: "Бенгальский огонь",
    sparks: new SparkShader(gl),
    tails: new TailShader(gl),
    settings: {
        count: {
            type: 'int',
            default: 200,
        },
        r: {
            type: 'float',
            default: 0.5 * gl.drawingBufferWidth,
            min: 0.1,
        },
        minSpeed: {
            type: 'float',
            default: 0.2 * gl.drawingBufferWidth,
        },
        maxSpeed: {
            type: 'float',
            default: 0.5 * gl.drawingBufferWidth,
        },
    } as const,
    make(textures: TexturesManager<"spark">, { count, r, minSpeed, maxSpeed }: HTML.Input.ObjectType<typeof this["settings"]>) {
        const system = new ParticleSystem(count, r, minSpeed, maxSpeed)
        return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
            system.update(dt);
            this.sparks.draw(textures.get('spark'), mvMatrix, projectionMatrix, system.positions);
            this.tails.draw(mvMatrix, projectionMatrix, system.paths, system.colors);
        }
    },
    presets: {
        Small: {
            count: 40,
            r: 150,
            minSpeed: 200,
            maxSpeed: 500,
        }
    },
})

class SparkShader {
    constructor(private gl: WebGL2RenderingContext) { }
    private posBuffer: WebGLBuffer = this.gl.createBuffer()!;
    private shader = new ProgramWrapper(this.gl, Shaders.spark, {
        texture: "u_texture",
        mvMatrix: "u_mvMatrix",
        pMatrix: "u_pMatrix",
    }, {
        position: "a_position"
    })
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, positions: Float32Array) {
        const gl = this.gl;
        const { program, uniforms, attributes } = this.shader;
        gl.useProgram(program);
        gl.uniform1i(uniforms.texture, textureID);
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

class TailShader {
    constructor(private gl: WebGL2RenderingContext) { }
    private posBuffer: WebGLBuffer = this.gl.createBuffer()!;
    private colorBuffer: WebGLBuffer = this.gl.createBuffer()!;
    private shader = new ProgramWrapper(this.gl, Shaders.tail, {
        mvMatrix: "u_mvMatrix",
        pMatrix: "u_pMatrix",
    }, {
        position: "a_position",
        color: "a_color",
    });
    draw(mvMatrix: Float32Array, pMatrix: Float32Array, paths: Float32Array, colors: Float32Array) {
        const gl = this.gl;
        const { program, uniforms, attributes} = this.shader;
        gl.useProgram(program);
        gl.uniformMatrix4fv(uniforms.mvMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(uniforms.pMatrix, false, pMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.vertexAttribPointer(attributes.position, 3, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, paths, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(attributes.position)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(attributes.color, 3, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(attributes.color)
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.drawArrays(gl.LINES, 0, paths.length / 3)
        gl.useProgram(null);
    }
}

class ParticleSystem {
    positions = new Float32Array(this.count * 3)
    paths = new Float32Array(this.count * 3 * 2)
    colors = new Float32Array(this.count * 3 * 2).fill(1)
    speeds = new Float32Array(this.count * 3)
    private setRandomSpeed(shift: number) {
        let x = Math.random()
        let y = Math.random()
        let z = Math.random()
        const d = Math.sqrt(x * x + y * y + z * z)
        const l = Rand.range(this.minSpeed, this.maxSpeed)
        this.speeds[shift + 0] = Rand.sign() * (x / d * l);
        this.speeds[shift + 1] = Rand.sign() * (y / d * l);
        this.speeds[shift + 2] = Rand.sign() * (z / d * l);
    }
    constructor(public readonly count: number, readonly r: number, private minSpeed: number, private maxSpeed: number) {
        for (let i = 0; i < count * 3; i += 3) {
            this.setRandomSpeed(i);
        }
        for (let i = 0; i < count * 3 * 2; i += 6) {
            this.colors[i + 3] = 0.47
            this.colors[i + 4] = 0.31
            this.colors[i + 5] = 0.24
        }
    }
    update(dt: number) {
        for (let i = 0; i < this.count * 3; i += 3) {
            const x = this.paths[2 * i + 3] = this.positions[i] += this.speeds[i] * dt
            const y = this.paths[2 * i + 4] = this.positions[i + 1] += this.speeds[i + 1] * dt
            const z = this.paths[2 * i + 5] = this.positions[i + 2] += this.speeds[i + 2] * dt
            if (z * z + y * y + x * x >= this.r * this.r) {
                this.paths[2 * i + 3] =
                    this.paths[2 * i + 4] =
                    this.paths[2 * i + 5] =
                    this.positions[i] =
                    this.positions[i + 1] =
                    this.positions[i + 2] = Rand.signed(0.05 * this.r);
                this.setRandomSpeed(i);
            }
        }
    }
}

