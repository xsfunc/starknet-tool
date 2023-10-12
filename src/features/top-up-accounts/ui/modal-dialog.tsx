import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { useUnit } from 'effector-react'
import { useForm } from 'effector-forms'
import { topUpForm, topUpModal } from '../model'

export function TopUpModalDialog() {
  const { isOpen, close } = useUnit(topUpModal)
  const { fields, submit } = useForm(topUpForm)
  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ maxWidth: 500 }}
      >
        <Typography level="h3" sx={{ mb: 2 }}>
          Top up account balance
        </Typography>

        <Stack spacing={2}>
          <FormControl size="sm">
            <FormLabel>Account address</FormLabel>
            <Input
              autoFocus
              required
              value={fields.address.value}
              onChange={e => fields.address.onChange(e.target.value)}
            />
          </FormControl>
          <FormControl size="sm">
            <FormLabel>Token</FormLabel>
            <Input
              disabled
              value="ETH"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              required
              type="number"
              value={fields.amount.value}
              onChange={e => fields.amount.onChange(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fee</FormLabel>
            <Input
              required
              type="number"
              value={fields.fee.value}
              onChange={e => fields.fee.onChange(e.target.value)}
            />
          </FormControl>
          <Button
            onClick={() => submit()}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
