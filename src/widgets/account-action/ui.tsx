import { Dropdown, IconButton, ListDivider, Menu, MenuButton, MenuItem } from '@mui/joy'
import { useUnit } from 'effector-react'
import type { AccountAction as Props } from '@/entities/accounts'
import MenuIcon from '~icons/solar/menu-dots-outline'
import { topUpAccount } from '@/features/top-up-accounts'
import { removeAccountDialog } from '@/features/remove-account'
import { deployAccount } from '@/features/deploy-account'
import { upgradeAccount } from '@/features/update-contract'

export function AccountAction({ address }: Props) {
  const { open: openRemoveAccountDialog } = useUnit(removeAccountDialog)
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral', size: 'sm' } }}
      >
        <MenuIcon />
      </MenuButton>
      <Menu
        size='sm'
        placement='bottom-end'
      >
        <MenuItem onClick={() => topUpAccount(address)}>
          Top up balance
        </MenuItem>
        <MenuItem onClick={() => deployAccount(address)}>
          Deploy account contract
        </MenuItem>
        <MenuItem onClick={() => upgradeAccount(address)}>
          Upgrade account contract
        </MenuItem>
        <ListDivider />
        <MenuItem
          color='danger'
          onClick={() => openRemoveAccountDialog({ toRemove: address })}
        >
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
