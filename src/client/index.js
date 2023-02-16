import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'

const node = document.getElementById('root')

ReactDOM
  .createRoot(node)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )