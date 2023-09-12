import { createEvent, sample } from 'effector'
import { invoke } from '@withease/factories'
import { createForm } from 'effector-forms'
import { attachOperation } from '@farfetched/core'
import { settings } from '@/entities/settings'
import { createModal, notify, okx } from '@/shared/lib'

const topUpCalled = createEvent<string>()
const withdraw = attachOperation(okx.api.withdraw)

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
  fn: (credentials, { address, amount, fee }) => ({
    fee,
    credentials,
    toAddr: address,
    amt: amount,
    dest: '4', // onchain
    ccy: 'ETH',
    chain: 'ETH-StarkNet',
    walletType: 'private',
  } as const),
  target: [
    withdraw.start,
    topUpModal.close,
  ],
})

sample({
  clock: withdraw.finished.failure,
  fn: () => ({ message: 'Request failed', type: 'error' } as const),
  target: notify,
})
sample({
  clock: withdraw.finished.success,
  fn: ({ result }) => {
    if (result.code === '0') {
      return {
        message: 'Withdrawal request successfully sent',
        type: 'success',
      } as const
    }
    return {
      message: result.msg,
      type: 'error',
    } as const
  },
  target: notify,
})

export const topUpAccount = topUpCalled
