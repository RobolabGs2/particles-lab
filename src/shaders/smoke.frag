#version 300 es

precision mediump float;

uniform sampler2D u_texture;
uniform vec4 u_color;

in float time;
out vec4 FragColor;

void main() {
    FragColor = texture(u_texture, gl_PointCoord) * vec4(u_color.xyz, time);
}