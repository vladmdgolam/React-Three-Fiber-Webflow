import { useEffect, DependencyList } from "react"

const useHotkey = (
  targetKey: string,
  callback: () => void,
  deps: DependencyList = []
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event
    key === targetKey && callback()
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
}

export default useHotkey
