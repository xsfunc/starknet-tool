import { createEvent, sample } from 'effector'
import type { SubscriptionArg } from '@/shared/lib'
import { okx } from '@/shared/lib'
import { settings } from '@/entities/settings'
import { routes } from '@/shared/config'
import { chainAuthorized } from '@/shared/session'

export const wsConnect = createEvent()

sample({
  clock: wsConnect,
  target: okx.ws.connect,
})
sample({
  clock: okx.ws.connected,
  source: settings.okx.credentials,
  target: okx.ws.login,
})
sample({
  clock: okx.ws.loggedIn,
  fn: (): SubscriptionArg[] => ([{ channel: 'withdrawal-info' }]),
  target: okx.ws.subscribe,
})

// sample({
//   clock: okx.ws.subscribed,
//   fn: (): SubscriptionTopic[] => ([{ channel: 'withdrawal-info' }]),
//   target: okx.ws.unsubscribe,
// })

export const authorizedAccountsRoute = chainAuthorized({
  route: routes.accounts,
  redirectLoginRoute: routes.password,
  authRequired: settings.security.usePassword,
})
