import type { RawAccount } from './types'

export function shortAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-6, -1)}`
}

export function downloadAccounts({ accounts }: { accounts: RawAccount[] }) {
  const accountsRows = accounts.map(acc => [
    acc.contractAddress,
    acc.privateKey,
    acc.publicKey,
  ].join(','))

  accountsRows.unshift([
    'Contract address',
    'Private Key',
    'Public Key',
  ].join(','))

  const accountsCsv = accountsRows.join('\n')
  const blob = new Blob([accountsCsv], { type: 'text/csv' })
  // Creating an object for downloading url
  const url = window.URL.createObjectURL(blob)
  // Creating an anchor(a) tag of HTML
  const a = document.createElement('a')
  // Passing the blob downloading url
  a.setAttribute('href', url)
  // Setting the anchor tag attribute for downloading
  // and passing the download file name
  a.setAttribute('download', 'accounts.csv')
  // Performing a download with click
  a.click()
}
