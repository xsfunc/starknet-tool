import type { ReactNode } from 'react'
import { Stack } from '@mui/joy'
import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'

interface Props {
  children: ReactNode
}

export function BaseLayout({ children }: Props) {
  return (
    <Layout>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </Layout>
  )
}

export function Layout({ children }: Props) {
  return (
    <Stack
      sx={{ boxSizing: 'border-box', minHeight: '100vh' }}
      direction='column'
    >
      {children}
    </Stack>
  )
}
