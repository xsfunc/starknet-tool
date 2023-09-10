import { sample } from 'effector'
import { invoke } from '@withease/factories'
import { accountsModel } from '@/entities/accounts'
import { createModalDialog } from '@/shared/lib'

export const removeAccountDialog = invoke(createModalDialog<{ toRemove: string }>)

sample({
  clock: removeAccountDialog.submitted,
  source: accountsModel.rawAccounts,
  fn: (accounts, { toRemove }) => accounts.filter(acc => acc.contractAddress !== toRemove),
  target: accountsModel.rawAccounts,
})
