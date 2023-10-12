import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { useUnit } from 'effector-react'
import { removeAccountDialog } from '.'
import WarningIcon from '~icons/solar/shield-warning-broken'
import { shortAddress } from '@/entities/accounts/methods'

export function RemoveAccountDialog() {
  const { isOpen, close, submit, store } = useUnit(removeAccountDialog)
  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="remove account"
        aria-describedby="remove account from list"
      >
        <Typography
          level="title-lg"
          startDecorator={<WarningIcon />}
        >
          Confirmation
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
          Are you sure to delete account
          {' '}
          {store && shortAddress(store.toRemove)}
          ?
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={close}>
            Cancel
          </Button>
          <Button variant="solid" color="danger" onClick={submit}>
            Delete
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}
