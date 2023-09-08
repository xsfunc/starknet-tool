import { Container, Link, Stack, Typography } from '@mui/joy'

export function Footer() {
  return (
    <Container
      component='footer'
      maxWidth='lg'
    >
      <Stack
        sx={{ pb: 1, mt: 4, mb: 1 }}
        direction='row'
      >
        <Typography level='body-sm'>
          created by{' '}
          <Link href={'https://xsfunc.xyz'} target='_blank'>
            xsfunc
          </Link>
        </Typography>
      </Stack>
    </Container>
  )
}
