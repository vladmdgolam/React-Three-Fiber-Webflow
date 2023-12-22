// hooks/useLoadVideo.tsx
import { useCallback, useState } from "react"

export const useLoadVideo = (): [string | null, (callback?: (src: string) => void) => void] => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  const loadVideo = useCallback((callback?: (src: string) => void): void => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "video/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const videoUrl = URL.createObjectURL(file)
        setVideoSrc(videoUrl)
        callback && callback(videoUrl)
      }
    }
    input.click()
  }, [])

  return [videoSrc, loadVideo]
}
