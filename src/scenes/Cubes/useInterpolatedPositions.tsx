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

// Custom hook for interpolation
export const useInterpolatedPositions = (progress: number) => {
  const lerp = (start: number, end: number, alpha: number) => start * (1 - alpha) + end * alpha

  // Interpolated positions based on progress
  const interpolatedPositions = useMemo(() => {
    return positionsOG.map((posOG, index) => {
      const posTarget = positions[index]
      return posOG.map((value, axis) => lerp(value * 2, posTarget[axis] * 2, progress))
    })
  }, [progress])

  return { positions: interpolatedPositions }
}
