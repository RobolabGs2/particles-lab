#version 300 es

in vec3 a_position;
uniform mat4 u_mvMatrix;
uniform mat4 u_pMatrix;
uniform float u_size;
void main() {
    gl_Position = u_pMatrix * u_mvMatrix * vec4(a_position, 1.);
    gl_PointSize = u_size;
}
