import type { AccountData } from '@/entities/accounts'

export function downloadAccounts({ accounts }: { accounts: AccountData[] }) {
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
