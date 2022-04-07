import images from './images'

import { HTML } from './web/html'
import { downloadImages, loadSettingsFromURL, mapRecord, Merge, RecursivePartial } from './utils'
import { TexturesManager } from './webgl'
import { StyleSheetTree, WindowsManager } from './web/windows'
import spiralFirework from './spiral_fireworks'
import circleFirework from './circle_firework'
import sparking from './sparking'
import smoke from './smoke'

const particlesSystemsFactory = {
    sparking: sparking,
    circleFirework: circleFirework,
    spiralFirework: spiralFirework,
    smoke: smoke,
} as const

type SystemID = keyof typeof particlesSystemsFactory;

function isSystemID(s: string): s is SystemID {
    return Reflect.has(particlesSystemsFactory, s);
}

const { systemID } = loadSettingsFromURL({
    systemID: "sparking"
})

if (!isSystemID(systemID)) {
    throw new Error(`Unknown system '${systemID}'`);
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

    const textures = new TexturesManager(gl, images)
    const windows = new WindowsManager(HTML.CreateElement('div', (el) => document.body.appendChild(el)), new StyleSheetTree(styleSheet))
    function ViewPreset(preset: object) {
        windows.CreateCloseableWindow("Preset", HTML.CreateElement('pre', HTML.SetText(JSON.stringify(preset, undefined, 4))))
    }
    function CopyPreset(preset: object) {
        navigator.clipboard.writeText(JSON.stringify(preset, undefined, 4))
    }
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

    const particlesSystems = mapRecord(particlesSystemsFactory, (desc) => (desc(gl)));
    let lastTick = 0
    let frameId = -1;
    const settingsContainer = HTML.CreateElement('article')

    windows.CreateInfoWindow("Настройки", HTML.CreateElement('article', HTML.Append(
        HTML.CreateSelector(systemID, mapRecord(particlesSystems, (({ name }) => name)), (key) => {
            settingsContainer.innerHTML = ""
            if (frameId != -1)
                cancelAnimationFrame(frameId)
            const description = particlesSystems[key];
            type Settings = HTML.Input.ObjectType<typeof description["settings"]>
            const start = (input: Settings): void => {
                if (frameId != -1)
                    cancelAnimationFrame(frameId)
                const system = description.make(textures, input as any);
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
            const { settings, presets } = description;
            const defaultSettings = HTML.Input.GetDefault(settings)
            const presetsButtons = mapRecord<keyof typeof presets, RecursivePartial<Settings>, (i: Settings, a: (v: Settings) => void) => void>({
                Default: defaultSettings,
                ...presets
            }, (partialPreset) => {
                const preset = Merge(defaultSettings, partialPreset);
                return (input: Settings, actualize: (values: Settings) => void) => {
                    actualize(preset);
                    start(preset);
                }
            })
            settingsContainer.appendChild(HTML.Input.CreateForm(settings, { Start: start, ...presetsButtons, ViewPreset, CopyPreset }, "Start"))
        }),
        settingsContainer
    )));
})
