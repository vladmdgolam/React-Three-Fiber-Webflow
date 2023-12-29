import './styles.css'

import { createRoot } from 'react-dom/client'

import App, { videos } from './App'

createRoot(document.getElementById('root')).render(<App />)

Object.keys(videos).forEach((key) => {
  const rootId = `root-${key}`
  const rootElement = document.getElementById(rootId)
  if (rootElement) {
    createRoot(rootElement).render(<App video={videos[key]} />)
  } else {
    console.log(`Element with id '${rootId}' not found.`)
  }
})
