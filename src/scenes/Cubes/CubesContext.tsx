import { createContext, useContext } from "react"

// Define the shape of the context data
interface CubesContextType {
  scale: number
}

// Create the context with a default value
export const CubesContext = createContext<CubesContextType>({ scale: 1 })

// useCubeContext is a custom hook that eases the use of the context
export const useCubeContext = () => {
  const context = useContext(CubesContext)
  if (!context) {
    throw new Error("useCubeContext must be used within a CubesProvider")
  }
  return context
}
