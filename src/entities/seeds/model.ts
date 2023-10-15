import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import type { Seed } from './types'

const setSeedsCalled = createEvent<Seed[]>()
const addSeedCalled = createEvent<Seed>()
const removeSeedCalled = createEvent<string>()
const updateSeedCalled = createEvent<{ uuid: string; update: Partial<Seed> }>()

const $seeds = createStore<Seed[]>([])
const $hasSeeds = $seeds.map(seeds => seeds.length > 0)

sample({
  clock: setSeedsCalled,
  target: $seeds,
})
sample({
  clock: addSeedCalled,
  source: $seeds,
  fn: (seeds, seed) => [...seeds, seed],
  target: $seeds,
})
sample({
  clock: updateSeedCalled,
  source: $seeds,
  fn(seeds, { uuid, update }) {
    return seeds.map(seed =>
      (seed.uuid === uuid)
        ? ({ ...seed, ...update })
        : seed)
  },
  target: $seeds,
})
sample({
  clock: removeSeedCalled,
  source: $seeds,
  fn: (seeds, uuid) => seeds.filter(seed => seed.uuid !== uuid),
  target: $seeds,
})

export const seedsManager = {
  seeds: $seeds,
  hasSeeds: $hasSeeds,
  addSeed: addSeedCalled,
  setSeeds: setSeedsCalled,
  updateSeed: updateSeedCalled,
  removeSeed: removeSeedCalled,
}

persist({ store: $seeds, key: 'starknet-seeds' })
