import { Button, FormControl, FormLabel, IconButton, Input, Typography } from '@mui/joy'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { okxCredentialsForm, settings } from '@/entities/settings'
import EyeBoldIcon from '~icons/solar/eye-bold'
import EyeClosedBoldIcon from '~icons/solar/eye-closed-bold'

export function OkxSection() {
  const { isValidating } = useUnit(settings.okx)
  const { fields, submit } = useForm(okxCredentialsForm)
  const [passOpen, setPassOpen] = useState(false)
  return <>
    <Typography level="title-lg" component='h2' sx={{ mb: 1 }}>
      OKX credentials
    </Typography>
    <FormControl size='sm' sx={{ mb: 1 }} disabled={isValidating}>
      <FormLabel>API key</FormLabel>
      <Input
        value={fields.apiKey.value}
        onChange={e => fields.apiKey.onChange(e.target.value)}
      />
    </FormControl>

    <FormControl size='sm' sx={{ mb: 1 }} disabled={isValidating}>
      <FormLabel>API secret</FormLabel>
      <Input
        value={fields.apiSecret.value}
        onChange={e => fields.apiSecret.onChange(e.target.value)}
      />
    </FormControl>

    <FormControl size='sm' sx={{ mb: 1 }} disabled={isValidating}>
      <FormLabel>API passphrase</FormLabel>
      <Input
        value={fields.apiPassphrase.value}
        onChange={e => fields.apiPassphrase.onChange(e.target.value)}
        type={passOpen ? 'text' : 'password'}
        endDecorator={
          <IconButton onClick={() => setPassOpen(!passOpen)}>
            {passOpen ? <EyeClosedBoldIcon /> : <EyeBoldIcon />}
          </IconButton>
        }
      />
    </FormControl>

    <Button
      loading={isValidating}
      onClick={() => submit()}
      size='sm'
    >
      Save
    </Button>
  </>
}
