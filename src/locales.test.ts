import { assertEquals } from '@std/assert'
import { locales } from './locales.ts'
import currentSnapshots from './fixtures/snapshots.json' with { type: 'json' }
import { prng, SEED } from './_testUtils.ts'

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

			const stringified = new Set([
				actual.toString(),
			])
			assertEquals(stringified.size, 1, 'All ways of stringifying ParagraphContents give same result')

			const sections = actual.toString().split('\n\n')

			const snapshot = snapshots[locale] ?? (snapshots[locale] = { ...blankTest })
			if (UPDATE_SNAPSHOT) {
				snapshot.paragraphs = sections
			} else {
				assertEquals(sections, [...snapshot.paragraphs])
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
