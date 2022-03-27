/// <reference path='../module_types.d.ts'/>

import shaderVertex from './sparkler.vert'
import shaderFrag from './sparkler.frag'

import tailVertex from './tail.vert'
import tailFrag from './tail.frag'

export interface RawShaders {
    vertex: string,
    fragment: string,
}

export const spark: RawShaders = {
    vertex: shaderVertex,
    fragment: shaderFrag,
}

export const tail: RawShaders = {
    vertex: tailVertex,
    fragment: tailFrag,
}