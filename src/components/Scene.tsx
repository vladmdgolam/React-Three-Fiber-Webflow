import { useControls } from 'leva'

import { vid } from '../App'
import { SceneEnum } from '../scenes'
import { AsciiRenderer } from './AsciiRenderer/AsciiRenderer'
import { Overlay } from './Overlay'

function calculateLetterSpacing(resolution: number): number {
  // Коэффициенты полинома 5-й степени
  const coefs = [
    21.56082936, -71.81363766, 93.2904845, -59.70661848, 19.49278035,
    -2.97980132,
  ]

  // Вычисление значения полинома
  let ls = 0
  for (let i = 0; i < coefs.length; i++) {
    ls += coefs[i] * Math.pow(resolution, coefs.length - 1 - i)
  }

  return ls
}

function getCoefficient(scale: number): number {
  const m = 11.93
  const b = -10.87
  return m * scale + b
}

export const Scene = ({ video }: { video: vid }) => {
  const [
    { characters, enabled, resolution, selectedScene, imgEnabled, s },
    set,
  ] = useControls(() => ({
    characters: {
      // value: "ABCDFGHI",
      value: 'ABCDEFGHI',
    },
    enabled: { value: true, label: 'Effect' },
    // resolution = 0.15,
    resolution: {
      value: video.resolution || 0.17,
      min: 0.01,
      max: 1,
      step: 0.01,
    },
    selectedScene: {
      label: 'Scene',
      value: SceneEnum.Cubes,
      options: Object.values(SceneEnum),
    },
    imgEnabled: true,
    s: {
      value: 1,
      min: -10,
      max: 10,
      step: 0.001,
    },
  }))

  const { scale } = useControls({
    scale: { value: video.scale || 1, min: 0, max: 2, step: 0.01 },
  })

  const ls = calculateLetterSpacing(resolution)
  const coeff = getCoefficient(scale)

  return (
    <>
      {/* <RandomizedLight key={String(img)} /> */}
      <directionalLight intensity={0.5} />
      {/* {!imgEnabled && (
        <Bounds fit key={selectedScene}>
          <Center key={selectedScene}>
            {createElement(scenes[selectedScene])}
          </Center>
        </Bounds>
      )} */}
      {enabled && (
        <AsciiRenderer
          letterSpacing={ls * coeff * s}
          invert={false}
          key={characters + resolution}
          characters={characters}
          resolution={resolution}
          scale={scale}
        />
      )}
      <Overlay set={set} img={imgEnabled} video={video.src} />
    </>
  )
}

export default Scene
