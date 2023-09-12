import { createMutation, createQuery } from '@farfetched/core'
import { withdrawal } from './withdrawal'
import { balances } from './balances'

export const rest = {
  withdraw: createMutation({ handler: withdrawal }),
  balances: createQuery({ handler: balances }),
}
