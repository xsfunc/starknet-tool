import { Container, Stack, Typography } from '@mui/joy'
import React from 'react'
import { useUnit } from 'effector-react'
import { PagesMenu } from './pages-menu'
import { routes } from '@/shared/config'
import { LockButton } from '@/features/auth-with-password'
import { session } from '@/shared/session'

export function Header() {
  const openHome = useUnit(routes.home.open)
  const { isAuthorized } = useUnit(session)
  return (
    <HeaderContainer>
      <Stack
        alignItems="center"
        direction="row"
        spacing={0.5}
        sx={{ mr: 'auto' }}
      >
        <Typography
          fontWeight="bold"
          onClick={() => openHome}
          sx={{ cursor: 'pointer' }}
        >
          xsStark
        </Typography>

        {/* <IconButton
          size='sm'
          sx={{ display: { xs: 'none', sm: 'inherit' } }}
          component={Link}
          href='https://discord.gg/J9dsRCvzmC'
          target='_blank'
        >
          <DiscordIcon />
        </IconButton> */}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        {isAuthorized
          && (
            <>
              <LockButton />
              <PagesMenu />
            </>
          )}
      </Stack>
    </HeaderContainer>
  )
}

interface Props {
  children: React.ReactNode
}

export function HeaderContainer({ children }: Props) {
  return (
    <Container
      component="header"
      maxWidth="lg"
      sx={{
        height: 60,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        mb: 2,
      }}
    >
      {children}
    </Container>
  )
}
