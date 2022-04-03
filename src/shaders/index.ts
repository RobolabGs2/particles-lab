/// <reference path='../module_types.d.ts'/>

export interface RawShaders {
    vertex: string,
    fragment: string,
}


import shaderVertex from './sparkler.vert'
import shaderFrag from './sparkler.frag'

export const spark: RawShaders = {
    vertex: shaderVertex,
    fragment: shaderFrag,
}

import tailVertex from './tail.vert'
import tailFrag from './tail.frag'

export const tail: RawShaders = {
    vertex: tailVertex,
    fragment: tailFrag,
}

import fireworkVertex from './firework.vert'
import fireworkFrag from './firework.frag'

export const firework: RawShaders = {
    vertex: fireworkVertex,
    fragment: fireworkFrag,
}