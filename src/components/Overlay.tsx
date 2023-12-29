import { Image, useAspect, useVideoTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { useEffect } from 'react'
import { DoubleSide } from 'three'

import { vid } from '../App'
/* eslint-disable jsx-a11y/alt-text */
import { useLoadVideo } from '../hooks/useLoadVideo'
import { SceneEnum } from '../scenes'

// const videoSrcDefault = '/Squares_Slow_Linear.mp4'

function VideoMaterial({ url }: { url: string }) {
  const texture = useVideoTexture(url)
  return (
    <meshBasicMaterial side={DoubleSide} map={texture} toneMapped={false} />
  )
}

export const Overlay = ({
  img,
  set,
  video,
}: {
  img?: boolean
  set: (value: {
    characters?: string | undefined
    enabled?: boolean | undefined
    resolution?: number | undefined
    selectedScene?: SceneEnum | undefined
    imgEnabled?: boolean | undefined
    s?: number | undefined
  }) => void
  video: vid
}) => {
  const { viewport } = useThree()

  const [videoSrc, loadVideo] = useLoadVideo()

  useEffect(() => {
    if (videoSrc) {
      set({ imgEnabled: true })
    }
  }, [videoSrc, set])

  const { pic } = useControls({
    pic: {
      image: undefined,
    },
    loadVideo: button(() => loadVideo()),
  })

  const min = Math.min(viewport.width, viewport.height)

  const video_source = videoSrc || video

  const scale = useAspect(
    3840, // Pixel-width of the video
    2160, // Pixel-height of the video
    1 // Optional scaling factor
  )

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <group position-z={0}>
        {pic && img && !videoSrc ? (
          <Image url={pic} side={DoubleSide} scale={[min, min]} />
        ) : null}
        {img && video_source ? (
          <mesh>
            <planeGeometry args={[scale[0], scale[1]]} />
            <VideoMaterial url={video_source} />
          </mesh>
        ) : null}
      </group>
    </>
  )
}
