import { useMemo } from "react"

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
  [0, 0, 0],
  [0, Math.PI / 2, 0],
  [0, 0, 0],
  [0, Math.PI / 2, 0],
]

// Custom hook for interpolation
export const useInterpolatedTransforms = (progress: number) => {
  const lerp = (start: number, end: number, alpha: number) => start * (1 - alpha) + end * alpha

  // Interpolated positions based on progress
  const interpolatedPositions = useMemo(() => {
    return positionsOG.map((posOG, index) => {
      const posTarget = positions[index]
      return posOG.map((value, axis) => lerp(value, posTarget[axis], progress))
    })
  }, [progress])

  // Interpolated rotations based on progress, initial rotation is 0
  const interpolatedRotations = useMemo(() => {
    return positionsOG.map((posOG, index) => {
      const posTarget = finRotations[index]
      return posOG.map((_, axis) => lerp(0, posTarget[axis], progress))
    })
  }, [progress])

  return { positions: interpolatedPositions, interpolatedRotations }
}
