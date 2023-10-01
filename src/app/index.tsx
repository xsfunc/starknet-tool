import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { RouterProvider } from 'atomic-router-react'
import { TopUpModalDialog } from '@/features/top-up-accounts'
import { RemoveAccountDialog } from '@/features/remove-account'
import { AccountsDataModal } from '@/features/export-accounts/ui/data-modal'
import { RightBottomToaster } from '@/shared/lib'
import { ImportAccountModalDialog } from '@/features/import-accounts'
import { appStarted, router } from '@/shared/config'
import { PagesView } from '@/pages'
import { ErasePasswordDialog } from '@/entities/settings'

appStarted()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />
      <RouterProvider router={router}>
        <PagesView />
        <TopUpModalDialog />
        <RemoveAccountDialog />
        <ErasePasswordDialog />
        <ImportAccountModalDialog />
        <AccountsDataModal />
        <RightBottomToaster />
      </RouterProvider>
    </CssVarsProvider>
  </React.StrictMode>,
)
