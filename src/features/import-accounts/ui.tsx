import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { useUnit } from 'effector-react'
import { useForm } from 'effector-forms'
import { Textarea } from '@mui/joy'
import { importAccounts } from './model'

export function ImportAccountModalDialog() {
  const { isOpen, close } = useUnit(importAccounts.dialog)
  const { fields, submit } = useForm(importAccounts.form)
  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ minWidth: 500 }}
      >
        <Typography level="h3" sx={{ mb: 2 }}>
          Import accounts
        </Typography>

        <Stack spacing={2}>
          <FormControl size='sm'>
            <FormLabel>Private keys</FormLabel>
            <Textarea
              minRows={6}
              value={fields.privateKeys.value}
              onChange={e => fields.privateKeys.onChange(e.target.value)}
            />
          </FormControl>
          <Button
            onClick={() => submit()}
            type="submit"
          >
            Import
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
