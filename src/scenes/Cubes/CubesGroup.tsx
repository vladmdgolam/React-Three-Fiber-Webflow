import { motion } from "framer-motion-3d"

import { Cube } from "./Cube"
import { transition } from "./Cubes"

const positionsOG = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 0, 1],
  [0, 0, 1],
]

const positions = [
  [-0.5, 0, 0.5],
  [0.5, 0, -0.5],
  [1.5, 0, 0.5],
  [0.5, 0, 1.5],
]

const finRotations = [
  [0, Math.PI / 2, 0],
  [0, 0, 0],
  [0, Math.PI / 2, 0],
  [0, 0, 0],
]

export const CubesGroup = ({
  initial,
  animate,
  ...props
}: {
  initial?: any
  animate?: any
  [key: string]: any
}) => {
  return (
    <motion.group {...props} initial={initial} animate={animate}>
      {positions.map((position, index) => {
        const initialProps = {
          x: positionsOG[index][0],
          y: positionsOG[index][1],
          z: positionsOG[index][2],
        }
        const animateProps = {
          x: position[0],
          y: position[1],
          z: position[2],
          rotateX: finRotations[index][0],
          rotateY: finRotations[index][1],
          rotateZ: finRotations[index][2],
        }
        return (
          <Cube transition={transition} key={index} initial={initialProps} animate={animateProps} />
        )
      })}
    </motion.group>
  )
}
