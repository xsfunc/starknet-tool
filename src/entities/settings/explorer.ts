import { createEvent, createStore } from 'effector'
import { persist } from 'effector-storage/local'

type Explorer = 'voyager' | 'oklink' | 'starkscan'

const base: Record<Explorer, string> = {
  starkscan: 'https://starkscan.co',
  oklink: 'https://www.oklink.com/starknet',
  voyager: 'https://voyager.online',
}

const updateCalled = createEvent<Explorer>()
const $explorer = createStore<Explorer>('starkscan')
  .on(updateCalled, (_, newValue) => newValue)

export const explorer = {
  active: $explorer,
  update: updateCalled,
  contractLink: $explorer.map(contractLinkWithExplorer),
  txLink: $explorer.map(txLinkWithExplorer),
}

persist({ store: $explorer, key: 'starknet-explorer' })

function txLinkWithExplorer(explorer: Explorer) {
  return (tx: string) => base[explorer].concat(`/tx/${tx}`)
}
function contractLinkWithExplorer(explorer: Explorer) {
  const reducers: Record<Explorer, (address: string) => string> = {
    oklink: (address: string) => base.oklink.concat(`/address/${address}`),
    voyager: (address: string) => base.voyager.concat(`/contract/${address}`),
    starkscan: (address: string) => base.starkscan.concat(`/contract/${address}`),
  }
  return reducers[explorer]
}
