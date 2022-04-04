#version 300 es
#define PI  3.141592653589793
#define PI_2 6.283185307179586
in float a_time;

uniform mat4 u_mvMatrix;
uniform mat4 u_pMatrix;
uniform float u_size;
uniform float u_radius;
uniform int u_count;
uniform float u_layers;

out float time;
void main() {
    float angle = PI_2 / (float(u_count) / u_layers) * float(gl_VertexID);
    vec2 pos = vec2(cos(angle), sin(angle)) * u_radius * a_time;
    gl_Position = u_pMatrix * u_mvMatrix * vec4(pos, 0, 1.);
    gl_PointSize = u_size;
    time = smoothstep(0.0, 1.0, a_time);
}
