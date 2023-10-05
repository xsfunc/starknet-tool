export function shortMnemonic(mnemonic: string) {
  const start = mnemonic.split(' ').slice(0, 2).join(' ')
  const end = mnemonic.split(' ').slice(-1)
  return `${start}...${end}`
}
