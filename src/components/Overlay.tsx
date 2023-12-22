import { Image, OrbitControls, useVideoTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { useEffect } from 'react'
import { DoubleSide } from 'three'

import videoSrcDefault from '../assets/Squares_Slow_Linear.mp4'
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

  return (
    <>
      <OrbitControls makeDefault />
      <group position-z={0}>
        {pic && img && !videoSrc ? (
          <Image url={pic} side={DoubleSide} scale={[min, min]} />
        ) : null}
        {img && (videoSrc || videoSrcDefault) ? (
          <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <VideoMaterial url={videoSrc || videoSrcDefault} />
          </mesh>
        ) : null}
      </group>
    </>
  )
}
