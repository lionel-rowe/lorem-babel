import { getRandomValuesSeeded, nextFloat64 } from '@std/random'

// random seed generated with crypto.getRandomValues(new BigUint64Array(1))[0]
export const SEED = 2115880546258684834n

// prng to ensure deterministic results during testing
export function prng(seed: bigint) {
	const getRandomValues = getRandomValuesSeeded(seed)
	return () => nextFloat64(getRandomValues)
}
