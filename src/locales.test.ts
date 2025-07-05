import { assertEquals } from '@std/assert'
import { getRandomValuesSeeded, nextFloat64 } from '@std/random'
import { locales } from './locales.ts'
import currentSnapshots from './fixtures/snapshots.json' with { type: 'json' }

// random seed generated with crypto.getRandomValues(new BigUint64Array(1))[0]
const SEED = 2115880546258684834n

// prng to ensure deterministic results during testing
function prng(seed: bigint) {
	const getRandomValues = getRandomValuesSeeded(seed)
	return () => nextFloat64(getRandomValues)
}

const UPDATE_SNAPSHOT = Boolean(Deno.env.get('UPDATE_SNAPSHOT'))

type Result = { paragraphs: string[] }
type Snapshots = Record<string, Result>
const blankTest: Result = { paragraphs: [] }
const blankTests = Object.fromEntries(Object.keys(locales).map((k) => [k, { ...blankTest }])) as Snapshots
const snapshots: Snapshots = Deno.env.get('UPDATE_SNAPSHOT') ? blankTests : currentSnapshots as Snapshots

Deno.test('snapshots', async (t) => {
	for (const [locale, getLorem] of Object.entries(locales)) {
		const lorem = await getLorem()

		await t.step(locale, () => {
			lorem.random = prng(SEED)

			const options = {
				paragraphs: { min: 3, max: 5 },
				sentences: { min: 3, max: 6 },
			}

			const actual = lorem.text(options)
			const sentences = [...actual.sentences()]
			assertEquals([...actual].flat(), sentences)

			const stringified = new Set([
				actual.toString(),
				String(actual),
				`${actual}`,
				'' + actual + '',
				[...actual.paragraphs()].join('\n\n'),
			])
			assertEquals(stringified.size, 1, 'All ways of stringifying ParagraphContents give same result')

			const snapshot = snapshots[locale] ?? (snapshots[locale] = { ...blankTest })

			if (UPDATE_SNAPSHOT) {
				snapshot.paragraphs = [...actual.paragraphs()]
			} else {
				assertEquals([...actual.paragraphs()], [...snapshot.paragraphs])
			}
		})
	}

	if (UPDATE_SNAPSHOT) {
		await Deno.writeTextFile(
			'./src/fixtures/snapshots.json',
			JSON.stringify(
				Object.fromEntries(Object.entries(snapshots).sort(([a], [b]) => a.localeCompare(b, 'und'))),
				null,
				'\t',
			) + '\n',
		)
		Deno.exit()
	}
})
