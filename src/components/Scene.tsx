import { useControls } from 'leva'

import { vid } from '../App'
import { HalfTone } from './HalfTone'
import { Overlay } from './Overlay'

export const Scene = ({ video }: { video: vid }) => {
  const [{ enabled }, set] = useControls(() => ({
    enabled: { value: true, label: 'Effect' },
  }))

  return (
    <>
      {enabled && <HalfTone video={video} />}
      <Overlay set={set} img={true} video={video.src} />
    </>
  )
}

export default Scene
