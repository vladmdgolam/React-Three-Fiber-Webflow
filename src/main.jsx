import './styles.css'

import { createRoot } from 'react-dom/client'

import App, { videos } from './App'

function initializeReactApp() {
  const roots = [
    { id: 'root-cubes', video: videos.cubes },
    { id: 'root-og', video: videos.og },
    { id: 'root-lines', video: videos.lines },
    { id: 'root-spheres', video: videos.spheres },
  ]

  roots.forEach((root) => {
    try {
      const element = document.getElementById(root.id)
      if (element) {
        createRoot(element).render(<App video={root.video} />)
      } else {
        console.error(`Element with ID ${root.id} not found.`)
      }
    } catch (error) {
      console.error(
        `Failed to initialize React app in element with ID ${root.id}:`,
        error
      )
    }
  })
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeReactApp)
} else {
  initializeReactApp()
}
