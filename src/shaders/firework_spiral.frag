#version 300 es

precision mediump float;

uniform sampler2D u_texture;
uniform float u_framesCount;

in float time;
out vec4 FragColor;

void main() {
    FragColor = texture(u_texture, vec2((trunc(u_framesCount * time) + gl_PointCoord.x) / u_framesCount, gl_PointCoord.y));
}