import { createRoute } from 'atomic-router'

export const constants = {
  main: {
    argentX: {
      proxyClassHash: '0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918',
      accountClassHash: '0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2',
    },
  },
}

export const routes = {
  home: createRoute(),
  settings: createRoute(),
  accounts: createRoute(),
}
