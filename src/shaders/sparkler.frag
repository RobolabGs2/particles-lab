#version 300 es

precision mediump float;
uniform sampler2D u_texture;
out vec4 FragColor;

void main() {
    FragColor = texture(u_texture, gl_PointCoord);
}
