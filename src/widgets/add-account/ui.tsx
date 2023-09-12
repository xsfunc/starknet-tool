import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import { useUnit } from 'effector-react'
import { importAccounts } from '@/features/import-accounts'
import { createAccount } from '@/features/create-accounts'

export function AddAccount() {
  const { open: openImportDialog } = useUnit(importAccounts.dialog)
  const createArgentXAccount = useUnit(createAccount)
  return (
    <Dropdown>
      <MenuButton
        size='sm'
        variant='solid'
        color='primary'
      >
        Add accounts
      </MenuButton>
      <Menu
        size='sm'
        placement='bottom-end'
      >
        <MenuItem onClick={() => createArgentXAccount()}>
          Create ArgentX account
        </MenuItem>
        <MenuItem onClick={() => openImportDialog()}>
          Import accounts
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
