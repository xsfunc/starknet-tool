import { attach, createEffect } from 'effector'
import { invoke } from '@withease/factories'
import { downloadAccounts } from './methods'
import { accountsModel } from '@/entities/accounts'
import { createModal } from '@/shared/lib'

const downloadAccountsFx = createEffect(downloadAccounts)
export const accountsDataModal = invoke(createModal<void>)
export const exporter = {
  downloadCsv: attach({
    source: { accounts: accountsModel.rawAccounts },
    effect: downloadAccountsFx,
  }),
}
