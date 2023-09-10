import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy'
import { useUnit } from 'effector-react'
import type { AccountAction as Props } from '@/entities/accounts'
import MenuIcon from '~icons/solar/menu-dots-outline'
import { topUpModal } from '@/features/top-up-accounts'

export function AccountAction({ address }: Props) {
  const { open: openTopUpModal } = useUnit(topUpModal)
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
        <MenuItem onClick={() => openTopUpModal({ address })}>
          Top up balance
        </MenuItem>
        <MenuItem>
          Deploy account contract
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
