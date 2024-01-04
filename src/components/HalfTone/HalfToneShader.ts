/**
 * RGB Halftone shader for three.js.
 *	NOTE:
 * 		Shape (1 = Dot, 2 = Ellipse, 3 = Line, 4 = Square)
 *		Blending Mode (1 = Linear, 2 = Multiply, 3 = Add, 4 = Lighter, 5 = Darker)
 */

import fragmentShader from './frag.frag'

export const HalftoneShader = {
  uniforms: {
    tDiffuse: { value: null },
    shape: { value: 1 },
    radius: { value: 4 },
    rotateR: { value: (Math.PI / 12) * 1 },
    rotateG: { value: (Math.PI / 12) * 2 },
    rotateB: { value: (Math.PI / 12) * 3 },
    scatter: { value: 0 },
    width: { value: 1 },
    height: { value: 1 },
    blending: { value: 1 },
    blendingMode: { value: 1 },
    greyscale: { value: false },
    disable: { value: false },
    tex: { value: null },
    border: { value: 0 },
  },

  vertexShader: [
    'varying vec2 vUV;',

    'void main() {',

    '	vUV = uv;',
    '	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',

    '}',
  ].join('\n'),

  fragmentShader,
}
