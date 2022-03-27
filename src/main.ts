import sparkURL from './spark.png'

import * as Shaders from './shaders'
import { loadImage, Rand } from './utils'
import { ProgramWrapper, TexturesManager } from './webgl'

Promise.all(([sparkURL]).map(loadImage)).then(images => {
    const canvas = document.querySelector('canvas')!
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    document.body.appendChild(canvas)
    const gl = canvas.getContext('webgl2')!


    const aspectRatio = canvas.width / canvas.height
    const tgAngle = Math.tan(Math.PI / 4)
    const projectionMatrix = new Float32Array([
        1 / tgAngle, 0, 0, 0,
        0, aspectRatio / tgAngle, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ])
    const mvMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ])

    const textures = new TexturesManager(gl, {
        spark: images[0],
    })

    const sparks = new SparkShader(gl);
    const tails = new TailShader(gl);
    const system = new ParticleSystem(200, 0.5, 0.2, 0.5)

    let lastTick = 0
    const draw = (dt: number) => {
        system.update((dt - lastTick) / 1000);
        lastTick = dt
        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        sparks.draw(textures.get('spark'), mvMatrix, projectionMatrix, system.positions);
        tails.draw(mvMatrix, projectionMatrix, system.paths, system.colors);

        requestAnimationFrame(draw)
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    draw(0)
})



class SparkShader extends ProgramWrapper<"texture" | "mvMatrix" | "pMatrix", "position"> {
    private posBuffer: WebGLBuffer
    constructor(gl: WebGL2RenderingContext) {
        super(gl, Shaders.spark, {
            texture: "u_texture",
            mvMatrix: "u_mvMatrix",
            pMatrix: "u_pMatrix",
        }, {
            position: "a_position"
        })
        this.posBuffer = gl.createBuffer()!
    }
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, positions: Float32Array) {
        const gl = this.gl;
        gl.useProgram(this.program);
        gl.uniform1i(this.uniforms.texture, textureID);
        gl.uniformMatrix4fv(this.uniforms.mvMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(this.uniforms.pMatrix, false, pMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.vertexAttribPointer(this.attributes.position, 3, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.attributes.position)
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.drawArrays(gl.POINTS, 0, positions.length / 3)
        gl.useProgram(null);
    }
}

class TailShader extends ProgramWrapper<"mvMatrix" | "pMatrix", "position" | "color"> {
    private posBuffer: WebGLBuffer
    private colorBuffer: WebGLBuffer;
    constructor(gl: WebGL2RenderingContext) {
        super(gl, Shaders.tail, {
            mvMatrix: "u_mvMatrix",
            pMatrix: "u_pMatrix",
        }, {
            position: "a_position",
            color: "a_color",
        })
        this.posBuffer = gl.createBuffer()!;
        this.colorBuffer = gl.createBuffer()!;
    }
    draw(mvMatrix: Float32Array, pMatrix: Float32Array, paths: Float32Array, colors: Float32Array) {
        const gl = this.gl;
        gl.useProgram(this.program);
        gl.uniformMatrix4fv(this.uniforms.mvMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(this.uniforms.pMatrix, false, pMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.vertexAttribPointer(this.attributes.position, 3, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, paths, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.attributes.position)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(this.attributes.color, 3, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.attributes.color)
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
