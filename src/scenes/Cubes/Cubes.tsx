import { useRef } from "react"
import { DirectionalLight } from "three"

import { CubesContext } from "./CubesContext"
import { CubesGroup } from "./CubesGroup"

export const transition = { type: "tween", duration: 2.5, repeat: Infinity, repeatType: "mirror" }

const positionsOG = [
  [0 * 2, 0 * 2, 0 * 2],
  [1 * 2, 0 * 2, 0 * 2],
  [1 * 2, 0 * 2, 1 * 2],
  [0 * 2, 0 * 2, 1 * 2],
]

const positions = [
  [-0.5 * 2, 0 * 2, 0.5 * 2],
  [0.5 * 2, 0 * 2, -0.5 * 2],
  [1.5 * 2, 0 * 2, 0.5 * 2],
  [0.5 * 2, 0 * 2, 1.5 * 2],
]

export const Cubes = () => {
  const dir = useRef<DirectionalLight>(null!)
  // useHelper(dir, DirectionalLightHelper, 1, "hotpink")

  // const { scale } = useControls({
  //   scale: { value: 1, min: 0, max: 2, step: 0.01 },
  // })

  return (
    <CubesContext.Provider value={{ scale: 1 }}>
      <ambientLight intensity={0.5} />
      <directionalLight ref={dir} position={[-10, 2.5, 10]} intensity={2.5} />
      {/* <RandomizedLight amount={2} /> */}

      <group rotation={[0, Math.PI / 2, Math.PI / 2]}>
        {positions.map((position, index) => {
          const i = positionsOG[index]
          const initialPosition = { x: i[0], y: i[1], z: i[2] }
          const animatePosition = { x: position[0], y: position[1], z: position[2] }
          return (
            <CubesGroup
              key={index}
              initial={initialPosition}
              animate={animatePosition}
              transition={transition}
              position={position as [x: number, y: number, z: number]}
            />
          )
        })}
      </group>
    </CubesContext.Provider>
  )
}
