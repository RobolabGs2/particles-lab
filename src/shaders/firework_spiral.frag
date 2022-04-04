#version 300 es

precision mediump float;

uniform sampler2D u_texture;

in float time;
out vec4 FragColor;

void main() {
    int frame = int(24.0*time);
    FragColor = mix(texture(u_texture, vec2((float(frame) * 256.0 + gl_PointCoord.x * 256.0) / (256.0 * 24.0), gl_PointCoord.y)), vec4(1.0, 0.0, 0.0, 1.0), 0.0);
}