import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { useUnit } from 'effector-react'
import { erasePasswordDialog } from '..'
import WarningIcon from '~icons/solar/shield-warning-broken'

export function ErasePasswordDialog() {
  const { isOpen, close, submit } = useUnit(erasePasswordDialog)
  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="remove account"
        aria-describedby='remove account from list'
      >
        <Typography
          level="title-lg"
          startDecorator={<WarningIcon />}
        >
          Confirmation
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
          Are you sure to erase password?
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={close}>
            Cancel
          </Button>
          <Button variant="solid" color="danger" onClick={submit}>
            Erase
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}
