import { Button } from '@mui/joy'
import { useList, useUnit } from 'effector-react'

import Box from '@mui/joy/Box'
import { argentXManager, starknetManager } from '@/shared/lib'

export function AccountsPage() {
  const { createAccount } = useUnit(argentXManager)
  return <>
    <Button
      onClick={() => createAccount()}
    >
      Add account
    </Button>
    <AccountList />
  </>
}

export default function AccountList() {
  // const { accounts } = useUnit(starknetManager)
  const list = useList(starknetManager.accounts, ({ privateKey, contractAddress }, index) => (
    <li>
      [{index}] {contractAddress.slice(0, 5)} {privateKey.slice(0, 5)}
    </li>
  ))

  return (
    <Box sx={{}}>
      {list}
    </Box>
  )
}
