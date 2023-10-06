import type { EventPayload } from 'effector'
import { createEffect, createEvent, sample } from 'effector'
import { starknetUtils } from '@/shared/lib'
import { seedsManager } from '@/entities/seeds'
import type { Seed } from '@/entities/seeds/types'
import type { BaseAccountData } from '@/entities/accounts'
import { accountsManager } from '@/entities/accounts'
import { withSeed } from '@/entities/seeds/with-seed'

type UpdateSeedPayload = EventPayload<typeof seedsManager.updateSeed>
type CreateAccountFxReturn = Awaited<ReturnType<typeof starknetUtils.createAccountsWithSeed>>
type CreateAccountsFxParams = Seed & Parameters<typeof starknetUtils.createAccountsWithSeed>[0]
type CreateAccountsFxDone = EventPayload<typeof createAccountsFx.done>

const createAccountsFx = createEffect<CreateAccountsFxParams, CreateAccountFxReturn>(starknetUtils.createAccountsWithSeed)
const addAccountsCalled = createEvent<{ uuid: string; count: number }>()

sample({
  clock: withSeed(addAccountsCalled),
  fn: ({ seed, provider, count }) => ({ ...seed, provider, accountsCount: count }),
  target: createAccountsFx,
})
sample({
  clock: createAccountsFx.done,
  target: [
    accountsManager.addAccounts.prepend(addSourceUUID),
    seedsManager.updateSeed.prepend(incrementHDPathOffset),
  ],
})

export const addAccountsBySeed = addAccountsCalled
export const accountsCreationPending = createAccountsFx.pending

function incrementHDPathOffset({ params }: CreateAccountsFxDone): UpdateSeedPayload {
  const { uuid, accountsCount, HDPathOffset } = params
  const update = { HDPathOffset: HDPathOffset + accountsCount }
  return { uuid, update }
}

function addSourceUUID({ params, result: accounts }: CreateAccountsFxDone): BaseAccountData[] {
  return accounts.map(account => ({ ...account, sourceUuid: params.uuid }))
}
