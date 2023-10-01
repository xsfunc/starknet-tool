import { type RouteInstance, type RouteParams, type RouteParamsAndQuery, chainRoute } from 'atomic-router'
import type { Store } from 'effector'
import { createEvent, createStore, sample } from 'effector'
import { and, not, or } from 'patronum'

const $isAuthorized = createStore(false)

export const session = {
  isAuthorized: $isAuthorized,
}

interface ChainAuthorizedProps<T extends RouteParams> {
  route: RouteInstance<T>
  redirectLoginRoute: RouteInstance<T>
  authRequired: Store<boolean>
}

export function chainAuthorized<Params extends RouteParams>({
  route,
  redirectLoginRoute,
  authRequired,
}: ChainAuthorizedProps<Params>) {
  const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthorized = sample({
    clock: authCheckStarted,
    filter: or(session.isAuthorized, not(authRequired)),
  })
  const notAuthorized = sample({
    clock: authCheckStarted,
    filter: and(authRequired, not(session.isAuthorized)),
  })

  sample({
    clock: authCheckStarted,
    filter: not(authRequired),
    fn: () => true,
    target: session.isAuthorized,
  })
  sample({
    clock: notAuthorized,
    target: redirectLoginRoute.navigate,
  })

  return chainRoute({
    route,
    beforeOpen: authCheckStarted,
    openOn: alreadyAuthorized,
  })
}

interface ChainGuestProps<T extends RouteParams> {
  route: RouteInstance<T>
  redirectRoute: RouteInstance<T>
  authRequired: Store<boolean>
}

export function chainGuest<Params extends RouteParams>({
  authRequired,
  route,
  redirectRoute,
}: ChainGuestProps <Params>) {
  const guestCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
  const isGuest = sample({
    clock: guestCheckStarted,
    filter: and(authRequired, not(session.isAuthorized)),
  })

  const alreadyAuthorized = sample({
    clock: guestCheckStarted,
    filter: or(session.isAuthorized, not(authRequired)),
  })
  sample({
    clock: alreadyAuthorized,
    target: redirectRoute.navigate,
  })

  return chainRoute({
    route,
    beforeOpen: guestCheckStarted,
    openOn: [isGuest],
  })
}
