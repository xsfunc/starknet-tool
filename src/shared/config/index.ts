export * from './routes'
export * from './init'

export const constants = {
  main: {
    argentX: {
      proxyClassHash: '0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918',
      accountClassHash: '0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2',
    },
  },
}

export interface ERC20 { contractAddress: string; decimals?: number; symbol: string }
export type ERC20Tokens = Record<string, ERC20>
export const erc20Tokens: ERC20Tokens = {
  eth: {
    contractAddress: '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7',
    decimals: 18,
    symbol: 'eth',
  },
  usdc: {
    contractAddress: '0x053C91253BC9682c04929cA02ED00b3E423f6710D2ee7e0D5EBB06F3eCF368A8',
    symbol: 'usdc',
  },
  usdt: {
    symbol: 'usdt',
    contractAddress: '0x068F5c6a61780768455de69077E07e89787839bf8166dEcfBf92B645209c0fB8',
  },
  dai: {
    symbol: 'dai',
    contractAddress: '0x00dA114221cb83fa859DBdb4C44bEeaa0BB37C7537ad5ae66Fe5e0efD20E6eB3',
  },
} as const
