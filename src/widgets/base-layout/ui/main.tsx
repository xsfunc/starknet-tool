import { Container } from '@mui/joy'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export function Main({ children }: Props) {
  return (
    <Container
      maxWidth='lg'
      component='main'
      sx={{ flexGrow: 1 }}
    >
      {children}
    </Container>
  )
}
