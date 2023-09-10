import { Button, FormControl, FormLabel, Input, Typography } from '@mui/joy'
import { useForm } from 'effector-forms'
import { okxCredentialsForm } from '@/entities/settings'

export function OkxSection() {
  const { fields, submit } = useForm(okxCredentialsForm)
  return <>
    <Typography level="title-lg" component='h2' sx={{ mb: 1 }}>
      OKX credentials
    </Typography>
    <FormControl size='sm' sx={{ mb: 1 }}>
      <FormLabel>API key</FormLabel>
      <Input
        value={fields.apiKey.value}
        onChange={e => fields.apiKey.onChange(e.target.value)}
      />
    </FormControl>
    <FormControl size='sm' sx={{ mb: 1 }}>
      <FormLabel>API secret</FormLabel>
      <Input
        value={fields.apiSecret.value}
        onChange={e => fields.apiSecret.onChange(e.target.value)}
      />
    </FormControl>
    <FormControl size='sm' sx={{ mb: 1 }}>
      <FormLabel>API passphrase</FormLabel>
      <Input
        value={fields.apiPassphrase.value}
        onChange={e => fields.apiPassphrase.onChange(e.target.value)}
      />
    </FormControl>

    <Button size='sm' onClick={() => submit()}>
      Save
    </Button>
  </>
}
