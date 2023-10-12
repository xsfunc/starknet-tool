import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { useUnit } from 'effector-react'
import { useForm } from 'effector-forms'
import { FormHelperText, Textarea } from '@mui/joy'
import type { FormEvent } from 'react'
import { importAccounts } from './model'

export function ImportAccountModalDialog() {
  const { isOpen, close } = useUnit(importAccounts.dialog)
  const { fields, submit, errorText } = useForm(importAccounts.form)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ minWidth: 600 }}
      >
        <Typography level="h3" sx={{ mb: 2 }}>
          Import accounts
        </Typography>

        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <FormControl error={fields.privateKeys.hasError()} size='sm'>
              <FormLabel>Private keys</FormLabel>
              <Textarea
                value={fields.privateKeys.value}
                onChange={e => fields.privateKeys.onChange(e.target.value)}
                minRows={6}
                maxRows={7}
              />
              <FormHelperText>{errorText('privateKeys')}</FormHelperText>
            </FormControl>
            <Button type="submit">
              Import
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}
