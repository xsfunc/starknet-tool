import { Box, Button, Card, CardContent, FormControl, FormHelperText, IconButton, Input, Typography } from '@mui/joy'
import { useForm } from 'effector-forms'
import type { FormEvent } from 'react'
import { useUnit } from 'effector-react'
import { authWithPasswordForm, logout } from '.'
import LockIcon from '~icons/solar/lock-keyhole-minimalistic-unlocked-bold'

export function AuthWithPasswordForm() {
  const { fields, submit } = useForm(authWithPasswordForm)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <Box
      sx={{ height: '70vh' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >

      <Card sx={{ minWidth: 300, maxWidth: 500, my: 'auto' }}>
        <CardContent>
          <Typography level="title-lg" component='h2' sx={{ mb: 1 }}>
            Password
          </Typography>

          <form onSubmit={onSubmit}>
            <FormControl error={fields.password.hasError()} size='sm' sx={{ mb: 1 }}>
              <Input
                autoFocus={true}
                type='password'
                placeholder='Enter password to unlock'
                value={fields.password.value}
                onChange={e => fields.password.onChange(e.target.value)}
              />
              <FormHelperText >{fields.password.errorText()}</FormHelperText>
            </FormControl>
            <Button type='submit' size='sm' fullWidth>
              Unlock
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export function LockButton() {
  const lock = useUnit(logout)
  return (
    <IconButton
      onClick={() => lock()}
      variant="plain"
      size='sm'
    >
      <LockIcon />
    </IconButton>
  )
}
