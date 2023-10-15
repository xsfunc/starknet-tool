import { createEffect, createEvent, sample } from 'effector'
import type { Output } from 'valibot'
import { array, boolean, enumType, literal, number, object, optional, parseAsync, partial, string, transform, union } from 'valibot'
import { invoke } from '@withease/factories'
import { accountsManager } from '@/entities/accounts'
import { seedsManager } from '@/entities/seeds'
import { settings } from '@/entities/settings'
import { createModalDialog, notify } from '@/shared/lib'

export const exportDataCalled = createEvent()
export const importDataCalled = createEvent()
export const fileAdded = createEvent<File | undefined>()

export const importDataDialog = invoke(createModalDialog<ImportSchema>)

const downloadDataFx = createEffect(downloadJSON)
const validateFileFx = createEffect(validateFile)
const loadDataFx = createEffect(loadJson)

// import section
sample({
  clock: fileAdded,
  filter: (file): file is File => Boolean(file),
  target: validateFileFx,
})
sample({
  clock: validateFileFx.fail,
  target: notify.prepend(incorrectFileMessage),
})
sample({
  clock: validateFileFx.doneData,
  target: importDataDialog.open,
})
sample({
  clock: importDataDialog.submit,
  source: validateFileFx.doneData,
  target: loadDataFx,
})

// export section
sample({
  clock: exportDataCalled,
  source: {
    accounts: accountsManager.rawAccounts,
    seeds: seedsManager.seeds,
    starknetProvider: settings.starknetProvider.instance,
    starknetExplorer: settings.explorer.instance,
    okxCredentials: settings.okx.credentials,
    passwordHash: settings.security.passwordHash,
  },
  target: downloadDataFx,
})

function coerceAccountSource(value: 'pk' | 'seed' | undefined): 'pk' | 'seed' {
  if (value === undefined)
    return 'pk'
  return value
}
const accountSchema = object({
  privateKey: string(),
  publicKey: string(),
  contractAddress: string(),
  contractType: literal('argent-x'),
  cairoVersion: optional(union([literal(0), literal(1), literal(2)])),
  source: transform(optional(enumType(['seed', 'pk'])), coerceAccountSource),
})
const seedSchema = object({
  uuid: string(),
  mnemonic: string(),
  HDPath: string(),
  HDPathOffset: number(),
})
const providerSchema = object({
  type: literal('rpc'),
  url: string(),
})
const okxSchema = object({
  apiKey: string(),
  apiSecret: string(),
  apiPassphrase: string(),
  encrypted: boolean(),
})
const importSchema = partial(object({
  accounts: array(accountSchema),
  seeds: array(seedSchema),
  passwordHash: string(),
  starknetExplorer: enumType(['voyager', 'oklink', 'starkscan']),
  starknetProvider: providerSchema,
  okxCredentials: okxSchema,
}))

type ImportSchema = Output<typeof importSchema>

async function validateFile(file: File) {
  const JSONResult = await readJSONFile(file)
  return parseAsync(importSchema, JSONResult)
}

function loadJson(data: ImportSchema) {
  if (data.accounts)
    accountsManager.setAccounts(data.accounts)
  if (data.seeds)
    seedsManager.setSeeds(data.seeds)
  if (data.okxCredentials)
    settings.okx.updateCredentials(data.okxCredentials)
  if (data.starknetProvider)
    settings.starknetProvider.change(data.starknetProvider)
  if (data.starknetExplorer)
    settings.explorer.change(data.starknetExplorer)
  if (data.passwordHash)
    settings.security.changePasswordHash(data.passwordHash)
}

function downloadJSON(exportData: object, exportName = 'xs-stark-export.json') {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData))}`
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', `${exportName}.json`)
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

function readJSONFile(file: File): Promise<object> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result as string))
      }
      catch (e) {
        reject(e)
      }
    }
    reader.readAsText(file)
  })
}

function incorrectFileMessage() {
  return { message: 'Incorrect file', type: 'error' } as const
}
