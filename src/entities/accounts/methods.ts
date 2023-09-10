export function shortAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-6, -1)}`
}
