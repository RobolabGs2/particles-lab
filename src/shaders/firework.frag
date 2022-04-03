#version 300 es

precision mediump float;
uniform sampler2D u_texture;
out vec4 FragColor;

uniform int u_frame;

void main() {
    FragColor = mix(texture(u_texture, vec2(
        (float(u_frame)*256.0 + gl_PointCoord.x *256.0)/(256.0*24.0), 
        gl_PointCoord.y)), vec4(1.0, 0.0, 0.0, 1.0), 0.0);
}