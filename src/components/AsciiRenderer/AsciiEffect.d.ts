import { Camera, Scene, WebGLRenderer } from "three"

export interface AsciiEffectOptions {
  resolution?: number
  scale?: number
  color?: boolean
  alpha?: boolean
  block?: boolean
  invert?: boolean
  letterSpacing?: number
  scaleSym?: number
}

export class AsciiEffect {
  constructor(renderer: WebGLRenderer, charSet?: string, options?: AsciiEffectOptions)
  domElement: HTMLElement

  render(scene: Scene, camera: Camera): void
  setSize(width: number, height: number): void
}
