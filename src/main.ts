import images from './images'

import * as Shaders from './shaders'
import { HTML } from './web/html'
import { loadImage, mapRecord, Merge, Rand } from './utils'
import { ProgramWrapper, TexturesManager } from './webgl'
import { StyleSheetTree, WindowsManager } from './web/windows'
import spiralFirework from './spiral_fireworks'


function downloadImages<T extends string>(urlsMap: Record<T, string>): Promise<Record<T, HTMLImageElement>> {
    const urls = Object.entries<string>(urlsMap);
    return Promise.all(urls.map(([_, url]) => url).map(loadImage)).then(images =>
        Object.fromEntries(images.map((img, i) => ([urls[i][0], img]))) as Record<T, HTMLImageElement>
    );
}

downloadImages(images).then(images => {
    const styleSheet = document.querySelector("style")!.sheet!
    const canvas = document.querySelector('canvas')!
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    document.body.appendChild(canvas)
    const gl = canvas.getContext('webgl2')!
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const windows = new WindowsManager(HTML.CreateElement('div', (el) => document.body.appendChild(el)), new StyleSheetTree(styleSheet))
    let frameId = -1;
    const aspectRatio = canvas.width / canvas.height
    const tgAngle = Math.tan(Math.PI / 4)
    const projectionMatrix = new Float32Array([
        1 / tgAngle, 0, 0, 0,
        0, aspectRatio / tgAngle, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, canvas.width,
    ])
    const mvMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ])

    const textures = new TexturesManager(gl, images)

    const particlesSystems = {
        sparking: {
            sparks: new SparkShader(gl),
            tails: new TailShader(gl),
            settings: {
                count: {
                    type: 'int',
                    default: 200,
                },
                r: {
                    type: 'float',
                    default: 0.5 * canvas.width,
                    min: 0.1,
                },
                minSpeed: {
                    type: 'float',
                    default: 0.2 * canvas.width,
                },
                maxSpeed: {
                    type: 'float',
                    default: 0.5 * canvas.width,
                },
            },
            make(textures: TexturesManager<"spark">, { count, r, minSpeed, maxSpeed }: Record<string, number>) {
                const system = new ParticleSystem(count, r, minSpeed, maxSpeed)
                return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
                    system.update(dt);
                    this.sparks.draw(textures.get('spark'), mvMatrix, projectionMatrix, system.positions);
                    this.tails.draw(mvMatrix, projectionMatrix, system.paths, system.colors);
                }
            }
        },
        firework01: {
            firework: new FireworkShader(gl),
            settings: {
                count: {
                    type: 'int',
                    default: 40,
                },
                r: {
                    type: 'float',
                    default: Math.min(0.5 * canvas.width, 340),
                    min: 0.1,
                    max: 340,
                },
                minSpeed: {
                    type: 'float',
                    default: Math.min(0.5 * canvas.width, 138),
                }
            },
            make(textures: TexturesManager<"fireworkRed" | "fireworkGreen" | "fireworkBlue">, { count, r, minSpeed }: Record<string, number>) {
                const system = new FireworksParticleSystem(count, r, minSpeed, 0)
                const system2 = new FireworksParticleSystem(count, r, minSpeed, 1.5)
                const system3 = new FireworksParticleSystem(count, r, minSpeed, 3)
                const size = (r / 10) | 0
                return (dt: number, mvMatrix: Float32Array, projectionMatrix: Float32Array) => {
                    system.update(dt);
                    system2.update(dt);
                    system3.update(dt);
                    this.firework.draw(textures.get('fireworkBlue'), mvMatrix, projectionMatrix, system.positions, size, system.percent * 24)//system.size);
                    this.firework.draw(textures.get('fireworkGreen'), mvMatrix, projectionMatrix, system2.positions, size, system2.percent * 24)//system.size);
                    this.firework.draw(textures.get('fireworkRed'), mvMatrix, projectionMatrix, system3.positions, size, system3.percent * 24)//system.size);
                }
            }
        },
        firework03: spiralFirework(gl),
    } as const
    const systems = {
        sparking: "Бенгальский огонь",
        firework01: "Фейрверк 1",
        firework03: "Фейрверк спиральный",
    } as const
    let currentKey: keyof typeof systems = "firework03"
    let lastTick = 0
    const settingsContainer = HTML.CreateElement('article')
    windows.CreateInfoWindow("Настройки", HTML.CreateElement('article', HTML.Append(
        HTML.CreateSelector(currentKey, systems, (key) => {
            settingsContainer.innerHTML = ""
            if (frameId != -1)
                cancelAnimationFrame(frameId)
            const start = (input: unknown): void => {
                if (frameId != -1)
                    cancelAnimationFrame(frameId)
                const system = particlesSystems[key].make(textures, input as any)
                const draw = (currentTick: number) => {
                    const dt = (currentTick - lastTick) / 1000
                    lastTick = currentTick
                    gl.clearColor(0.1, 0.1, 0.1, 1.0)
                    gl.clearDepth(1.0)
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                    system(dt, mvMatrix, projectionMatrix)
                    frameId = requestAnimationFrame(draw)
                }
                frameId = requestAnimationFrame(draw)
            }
            const { settings, presets } = particlesSystems[key]
            const defaultSettings = HTML.Input.GetDefault(settings)
            const presetsButtons = mapRecord({
                default: defaultSettings,
                ...presets
            }, (preset) => {
                preset = Merge(defaultSettings, preset);
                return (input: any, actualize: (values: any) => void) => {
                    actualize(preset);
                    start(preset);
                }
            })
            settingsContainer.appendChild(HTML.Input.CreateForm(particlesSystems[key].settings, {
                start, ...presetsButtons
            }, "start"))
        }),
        settingsContainer
    )));
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

class FireworkShader extends ProgramWrapper<"texture" | "mvMatrix" | "pMatrix" | "size" | "frame", "position"> {
    private posBuffer: WebGLBuffer
    constructor(gl: WebGL2RenderingContext) {
        super(gl, Shaders.firework, {
            texture: "u_texture",
            mvMatrix: "u_mvMatrix",
            pMatrix: "u_pMatrix",
            size: "u_size",
            frame: "u_frame",
            // color: "u_color",
        }, {
            position: "a_position"
        })
        this.posBuffer = gl.createBuffer()!
    }
    draw(textureID: number, mvMatrix: Float32Array, pMatrix: Float32Array, positions: Float32Array, size = 32, frame = 20) {
        const gl = this.gl;
        gl.useProgram(this.program);
        gl.uniform1i(this.uniforms.texture, textureID);
        gl.uniform1f(this.uniforms.size, size);
        // gl.uniform3f(this.uniforms.color, 1, 0, 1);
        gl.uniform1i(this.uniforms.frame, frame);
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
