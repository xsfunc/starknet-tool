import { sample } from 'effector'
import { invoke } from '@withease/factories'
import { createModalDialog } from '@/shared/lib'
import { seedsManager } from '@/entities/seeds'

export const removeSeedDialog = invoke(createModalDialog<string>)

sample({
  clock: removeSeedDialog.submitted,
  target: seedsManager.removeSeed,
})
