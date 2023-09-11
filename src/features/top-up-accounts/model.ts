import { createEvent, sample } from 'effector'
import { invoke } from '@withease/factories'
import { createForm } from 'effector-forms'
import { settings } from '@/entities/settings'
import { createModal, okx } from '@/shared/lib'
import type { Withdrawal } from '@/shared/lib/okx/types'

const topUpCalled = createEvent<string>()

export const topUpForm = createForm({
  fields: {
    address: {
      init: '' as string,
    },
    amount: {
      init: '0.001' as string,
    },
    fee: {
      init: '0.0001' as string,
    },
  },
  validateOn: ['submit'],
})

export const topUpModal = invoke(createModal<{ address: string }>)

sample({
  clock: topUpModal.opened,
  target: topUpForm.setForm,
})
sample({
  clock: topUpForm.formValidated,
  source: settings.okx.credentials,
  fn: (credentials, { address, amount, fee }): Withdrawal => ({
    fee,
    credentials,
    toAddr: address,
    amt: amount,
    dest: '4', // onchain
    ccy: 'ETH',
    chain: 'ETH-StarkNet',
    walletType: 'private',
  }),
  target: okx.api.withdraw.start,
})

export const topUpAccount = topUpCalled
