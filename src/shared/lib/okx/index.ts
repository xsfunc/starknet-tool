import { rest } from './rest'
import { ws } from './ws'

export * from './types'
export const okx = {
  api: rest,
  ws,
}
