import { Canvas } from '@react-three/fiber'

import cubes from './assets/Cubes.mp4'
import lines from './assets/lines.mp4'
import shperes from './assets/spheres_1.mp4'
import og from './assets/Squares_Slow_Linear.mp4'
import { Menu } from './components/Menu'
import { Scene } from './components/Scene'

export type vid = {
  src: any
  resolution?: number
  scale?: number
  dimensions?: number[]
  [key: string]: any
}

export const videos: { [key: string]: vid } = {
  og: { src: og },
  cubes: {
    src: cubes,
    resolution: 0.25,
    scale: 0.75,
  },
  spheres: {
    src: shperes,
    resolution: 0.35,
    scale: 0.55,
  },
  lines: {
    src: lines,
    resolution: 0.25,
    scale: 0.75,
  },
}

export default function App({ video = videos.og }: { video: vid }) {
  return (
    <>
      <Menu />
      <Canvas gl={{ alpha: true }} camera={{ far: 10000, near: 0.001 }}>
        <Scene video={video} />
      </Canvas>
    </>
  )
}
