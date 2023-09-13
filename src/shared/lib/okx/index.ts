import { rest } from './rest'
import { ws } from './ws'

export * from './types'
export type { BalancesResponse } from './rest/balances'
export const okx = {
  api: rest,
  ws,
}
