#version 300 es
#define PI  3.141592653589793
#define PI_2 6.283185307179586
in float a_time;

uniform mat4 u_mvMatrix;
uniform mat4 u_pMatrix;
uniform float u_size;
uniform float u_layers;
uniform float u_gravitation;
uniform float u_timeShift;
out float time;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
        323758.5453123);
}

void main() {
    vec2 pos = vec2((vec2(-100, -200) + random(vec2(float(gl_VertexID) * u_layers, -gl_VertexID)) * 200.).x, -500. * u_timeShift + 400. * (u_timeShift - 1.)) - vec2(0, u_gravitation) * 0.5 * a_time * a_time;
    gl_Position = u_pMatrix * u_mvMatrix * vec4(pos, 0, 1.);
    time = smoothstep(0.0, 1.0, abs(u_timeShift - a_time));
    gl_PointSize = u_size * time;
}
