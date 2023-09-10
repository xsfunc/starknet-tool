import { Box, Button, FormControl, FormLabel, Input, Typography } from '@mui/joy'
import { useForm } from 'effector-forms'
import { addAccount, addAccountsForm } from './model'

export function AddAccounts() {
  const { fields, submit } = useForm(addAccountsForm)
  return <Box
    sx={{
      flex: 1,
      maxWidth: 1200,
      width: '100%',
      mx: 'auto',
    }}
  >
    <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
      Add accounts
    </Typography>

    <FormControl size='sm' sx={{ mb: 1 }}>
      <FormLabel>Count</FormLabel>
      <Input
        value={fields.count.value}
        onChange={e => fields.count.onChange(e.target.value)}
      />
    </FormControl>
    <FormControl size='sm' sx={{ mb: 1 }}>
      <FormLabel>Count</FormLabel>
      <Input
        value={fields.tags.value}
        onChange={e => fields.tags.onChange(e.target.value)}
      />
    </FormControl>

    <Button size='sm' onClick={() => submit()}>
      Add
    </Button>
  </Box>
}

export function AddAccountButton() {
  return <Button
    size='sm'
    onClick={() => addAccount()}
  >
    Add account
  </Button>
}
