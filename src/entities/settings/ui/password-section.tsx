import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, Typography } from '@mui/joy'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import type { FormEvent } from 'react'
import { erasePasswordDialog, passwordForm, settings } from '../.'

export function PasswordSection() {
  const { fields, submit, errorText } = useForm(passwordForm)
  const { open } = useUnit(erasePasswordDialog)
  const { usePassword } = useUnit(settings.security)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  }

  return <>
    <Typography level="title-lg" component='h2' sx={{ mb: 1 }}>
      Password
    </Typography>
    <form onSubmit={onSubmit}>
      <FormControl error={fields.password.hasError()} size='sm' sx={{ mb: 1 }}>
        <FormLabel>New password</FormLabel>
        <Input
          type='password'
          value={fields.password.value}
          onChange={e => fields.password.onChange(e.target.value)}
        />
        <FormHelperText>{errorText('password')}</FormHelperText>
      </FormControl>
      <FormControl error={fields.confirmPassword.hasError()} size='sm' sx={{ mb: 1 }}>
        <FormLabel>Confirm password</FormLabel>
        <Input
          type='password'
          value={fields.confirmPassword.value}
          onChange={e => fields.confirmPassword.onChange(e.target.value)}
        />
        <FormHelperText>{errorText('confirmPassword')}</FormHelperText>
      </FormControl>

      <Stack direction='row' gap={1}>
        <Button type='submit' size='sm'>
          Change password
        </Button>
        <Button disabled={!usePassword} color='danger' size='sm' onClick={open}>
          Erase
        </Button>
      </Stack>
    </form>
  </>
}
