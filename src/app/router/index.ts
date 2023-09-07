import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'
import { routes } from '@/shared/config'

const history = createBrowserHistory()
const routesConfig = [
  { path: '/', route: routes.home },
  { path: '/settings', route: routes.settings },
  { path: '/accounts', route: routes.accounts },
]

export const router = createHistoryRouter({ routes: routesConfig })
router.setHistory(history)
