import { createHistoryRouter, createRoute } from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'
import { appStarted } from './init'

export const routes = {
  home: createRoute(),
  settings: createRoute(),
  accounts: createRoute(),
  seeds: createRoute(),
  password: createRoute(),
}

export const router = createHistoryRouter({
  routes: [
    { path: '/', route: routes.accounts },
    { path: '/settings', route: routes.settings },
    { path: '/accounts', route: routes.accounts },
    { path: '/seeds', route: routes.seeds },
    { path: '/password', route: routes.password },
  ],
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
