import { Canvas } from '@react-three/fiber'

import { Menu } from './components/Menu'
import { Scene } from './components/Scene'

export default function App() {
  return (
    <>
      <Menu />
      <Canvas camera={{ far: 10000, near: 0.001 }}>
        <Scene />
      </Canvas>
    </>
  )
}
