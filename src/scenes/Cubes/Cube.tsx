import { motion } from "framer-motion-3d"

import { useCubeContext } from "./CubesContext"

export const Cube = (props: any) => {
  const { scale } = useCubeContext()
  return (
    <motion.mesh {...props} scale={scale}>
      <boxGeometry />
      <meshPhysicalMaterial ior={1.3} reflectivity={1.5} metalness={0.5} color="#aaa" />
    </motion.mesh>
  )
}
