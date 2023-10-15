import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { useUnit } from 'effector-react'
import { Stack } from '@mui/joy'
import { importDataDialog } from '../model'

export function ImportDataDialog() {
  const { isOpen, close, submit } = useUnit(importDataDialog)
  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="remove account"
        aria-describedby="remove account from list"
      >
        <Typography level="title-lg">
          Import data
        </Typography>
        <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
          Are you sure to import new data? All previous data that conflict with imported will be deleted.
        </Typography>
        <Stack gap={1} direction="row" justifyContent="flex-end" sx={{ pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={close}>
            Cancel
          </Button>
          <Button variant="solid" color="primary" onClick={submit}>
            Import
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
