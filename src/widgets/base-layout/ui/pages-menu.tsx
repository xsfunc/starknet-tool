import { Divider, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import { useUnit } from 'effector-react'
import { routes } from '@/shared/config'

export function PagesMenu() {
  const openAccounts = useUnit(routes.accounts.open)
  const openSeeds = useUnit(routes.seeds.open)
  const openSettings = useUnit(routes.settings.open)

  return <Dropdown>
    <MenuButton size='sm'>
      Menu
    </MenuButton>

    <Menu
      sx={{ minWidth: 150 }}
      placement='bottom-end'
      id='pages-menu'
      size='sm'
    >
      <MenuItem onClick={() => openAccounts()}>
        Accounts
      </MenuItem>
      <MenuItem onClick={() => openSeeds()}>
        Seeds
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => openSettings()}>
        Settings
      </MenuItem>
    </Menu>
  </Dropdown>
}
