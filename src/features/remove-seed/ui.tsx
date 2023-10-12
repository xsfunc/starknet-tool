import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { useUnit } from 'effector-react'
import { removeSeedDialog } from './model'
import WarningIcon from '~icons/solar/shield-warning-broken'

interface Props {
  uuid: string
}

export function RemoveSeedButton({ uuid }: Props) {
  const { open } = useUnit(removeSeedDialog)
  return (
    <Button
      onClick={() => open(uuid)}
      color="danger"
      size="sm"
    >
      Remove seed
    </Button>
  )
}

export function RemoveSeedDialog() {
  const { isOpen, close, submit } = useUnit(removeSeedDialog)
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
          Are you sure to delete seed?
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
