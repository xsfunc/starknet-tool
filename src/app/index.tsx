import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { RouterProvider } from 'atomic-router-react'
import { RouterView } from './router/router-view'
import { router } from './router'
import { TopUpModalDialog } from '@/features/top-up-accounts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />
      <RouterProvider router={router}>
        <RouterView />
        <TopUpModalDialog />
      </RouterProvider>
    </CssVarsProvider>
  </React.StrictMode>,
)
