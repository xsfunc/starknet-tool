import { createEvent, sample } from 'effector'
import { invoke } from '@withease/factories'
import { createForm } from 'effector-forms'
import { generateMnemonic, validateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { createModalDialog } from '@/shared/lib'
import { seedsManager } from '@/entities/seeds'
import { routes } from '@/shared/config'

const generateMnemonicCalled = createEvent()

export const seedPhraseDialog = invoke(createModalDialog<void>)
export const seedPhraseForm = createForm({
  fields: {
    mnemonic: {
      init: '' as string,
      rules: [
        {
          name: 'validate-phrase',
          validator: value => ({
            isValid: validateMnemonic(value, wordlist),
            errorText: 'Mnemonic phrase incorrect',
          }),
        },
      ],
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: generateMnemonicCalled,
  fn: () => generateMnemonic(wordlist),
  target: seedPhraseForm.fields.mnemonic.set,
})
sample({
  clock: seedPhraseForm.formValidated,
  fn: ({ mnemonic }) => ({
    uuid: crypto.randomUUID(),
    HDPathOffset: 0,
    HDPath: 'm/44\'/9004\'/0\'/0/',
    mnemonic,
  }),
  target: [
    routes.seeds.open,
    seedPhraseDialog.close,
    seedsManager.addSeed,
    seedPhraseForm.reset,
  ],
})

export { generateMnemonicCalled as generateMnemonic }
