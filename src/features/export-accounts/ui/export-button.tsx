import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import { useUnit } from 'effector-react'
import { accountsDataModal, exporter } from '../model'
import DropDownIcon from '~icons/solar/alt-arrow-down-bold'

export function ExportButton() {
  const { open: openAccountsData } = useUnit(accountsDataModal)
  const { downloadCsv } = useUnit(exporter)
  return (
    <>
      <Dropdown>
        <MenuButton
          size="sm"
          endDecorator={<DropDownIcon />}
        >
          Export
        </MenuButton>
        <Menu size="sm" placement="bottom-end">
          <MenuItem onClick={() => openAccountsData()}>
            Simple text
          </MenuItem>
          <MenuItem onClick={() => downloadCsv()}>
            Download csv
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  )
}
