import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import { useUnit } from 'effector-react'
import { Textarea } from '@mui/joy'
import { accountsDataModal } from '../model'
import { accountsManager } from '@/entities/accounts'

export function AccountsDataModal() {
  const { rawAccounts } = useUnit(accountsManager)
  const { isOpen, close } = useUnit(accountsDataModal)
  const addresses = rawAccounts
    .map(acc => acc.contractAddress)
    .join('\n')

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={close}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          p: 3,
          maxWidth: 800,
          minWidth: 600,
          borderRadius: 'md',
          boxShadow: 'lg',
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.surface',
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Accounts addresses
        </Typography>
        <Textarea
          size="sm"
          variant="soft"
          value={addresses}
          minRows={20}
        />
      </Sheet>
    </Modal>
  )
}
