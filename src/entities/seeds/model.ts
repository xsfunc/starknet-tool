import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { Seed } from './types'

const addSeedCalled = createEvent<Seed[]>()
const removeSeedCalled = createEvent<string>()

const $seeds = createStore<Seed[]>([])

sample({
  clock: addSeedCalled,
  source: $seeds,
  fn: (seeds, seed) => [...seed, ...seeds],
  target: $seeds,
})
sample({
  clock: removeSeedCalled,
  source: $seeds,
  fn: (seeds, mnemonic) => {
    return seeds.filter(seed => seed.mnemonic !== mnemonic)
  },
  target: $seeds,
})

export const seedsManager = {
  seeds: $seeds,
  addSeed: addSeedCalled,
  removeSeed: removeSeedCalled,
}

persist({ store: $seeds, key: 'starknet-seeds' })
