import { Leva } from 'leva'
import { useState } from 'react'

import useHotkey from '../hooks/useHotkey'

export const Menu = () => {
  const [menu, setMenu] = useState(false)
  useHotkey('m', () => setMenu((prev) => !prev))
  return <Leva hidden={!menu} />
}
