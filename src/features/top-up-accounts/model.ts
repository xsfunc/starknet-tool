import { createEvent, sample } from 'effector'
import { debug } from 'patronum'
import { settings } from '@/entities/settings'
import { okxApi } from '@/shared/lib'
import type { Withdrawal } from '@/shared/lib/okx/types'

const topUpCalled = createEvent<string>()

sample({
  clock: topUpCalled,
  source: settings.okx.credentials,
  fn: (credentials, address): Withdrawal => ({
    credentials,
    ccy: 'ETH',
    amt: '0.001',
    dest: '4',
    toAddr: address,
    fee: '0.0001',
    chain: 'ETH-StarkNet',
    walletType: 'private',
  }),
  target: okxApi.mutation.withdraw.start,
})

debug({
  start: okxApi.mutation.withdraw.start,
  failed: okxApi.mutation.withdraw.$failed,
  status: okxApi.mutation.withdraw.$status,
})

export const topUpAccount = topUpCalled
