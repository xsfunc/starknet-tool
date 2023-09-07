import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { Pages } from '@/pages'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />
      <Pages />
    </CssVarsProvider>
  </React.StrictMode>,
)
