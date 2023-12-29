import './styles.css'

import { createRoot } from 'react-dom/client'

import App, { videos } from './App'

function initializeReactApp() {
  createRoot(document.getElementById('root-og')).render(
    <App video={videos.og} />
  )
  createRoot(document.getElementById('root-lines')).render(
    <App video={videos.lines} />
  )
  createRoot(document.getElementById('root-spheres')).render(
    <App video={videos.spheres} />
  )
  createRoot(document.getElementById('root-cubes')).render(
    <App video={videos.cubes} />
  )
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeReactApp)
} else {
  initializeReactApp() // DOMContentLoaded has already fired
}
