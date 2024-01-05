import { Effects, useTexture } from '@react-three/drei'
import { ReactThreeFiber, extend, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useMemo } from 'react'
import { NearestFilter } from 'three'
import { mapLinear } from 'three/src/math/MathUtils'

import { vid } from '../../App'
import texture from '../../assets/shapes9.png'
import { HalftonePass } from './HalfTonePass'

extend({ HalftonePass })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      halftonePass: ReactThreeFiber.Node<HalftonePass, typeof HalftonePass>
    }
  }
}

type InitialProps = {
  radius?: number
  border?: number
}

export const HalfTone = ({ video }: vid) => {
  const { size, viewport } = useThree(({ size, viewport }) => ({
    size,
    viewport,
  }))
  const shapes = useTexture(texture, (t) => {
    t.magFilter = t.minFilter = NearestFilter
  })

  const initialProps: InitialProps = useMemo(() => {
    const border = mapLinear(video.scale || 1, 0, 1, 0.5, 0)
    const radius = mapLinear(video.resolution || 0.25, 0.17, 0.35, 24, 12)
    return { radius, border }
  }, [video])

  const [{ radius, border }, set] = useControls(() => ({
    radius: { value: initialProps.radius || 10, min: 0.5, max: 200, step: 0.1 },
    border: { value: initialProps.border || 0, min: 0, max: 0.5 },
  }))

  useEffect(() => {
    set({ radius: initialProps.radius, border: initialProps.border })
  }, [video])

  const params = {
    radius: radius * 2,
    tex: shapes,
    border,
  }

  if (!shapes) return null

  return (
    <Effects>
      <halftonePass
        args={[size.width * viewport.dpr, size.height * viewport.dpr, params]}
      />
    </Effects>
  )
}
