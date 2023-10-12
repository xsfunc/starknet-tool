import { Button, IconButton, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useUnit } from 'effector-react'
import { addAccountModal } from './model'
import { addAccount } from '@/features/add-accounts-by-pk'
import { importAccounts } from '@/features/import-accounts'
import { seedPhraseDialog } from '@/features/add-seed'
import AddWalletIcon from '~icons/solar/add-square-bold'

export function AddAccountButton() {
  const { open: openMenu } = useUnit(addAccountModal)
  return (
    <IconButton onClick={openMenu} variant="solid" size="sm" color="primary">
      <AddWalletIcon />
    </IconButton>
  )
}

export function AddAccountDialog() {
  const { isOpen, close } = useUnit(addAccountModal)
  const { open: openImportDialog } = useUnit(importAccounts.dialog)
  const { open: openSeedDialog } = useUnit(seedPhraseDialog)
  const createAcc = useUnit(addAccount)

  function closeAndCreateBySeed() {
    close()
    openSeedDialog()
  }
  function closeAndCreateByPK() {
    close()
    createAcc()
  }
  function openImportDialogAndClose() {
    close()
    openImportDialog()
  }

  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ maxWidth: 500 }}
      >
        <Typography level="h4">
          Add accounts
        </Typography>

        <Stack spacing={1}>
          <Button onClick={closeAndCreateBySeed} variant="outlined">
            With new seed phrase
          </Button>
          <Button onClick={closeAndCreateByPK} variant="outlined">
            Generate private key
          </Button>
          <Button onClick={openImportDialogAndClose} variant="outlined">
            Import private keys
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
