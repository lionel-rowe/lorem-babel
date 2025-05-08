import { LoremBabel, type LoremBabelConfig } from './mod.ts'
import { assert, assertArrayIncludes, assertEquals, assertMatch, assertThrows } from '@std/assert'
import { byteGeneratorSeeded, nextFloat64 } from '@std/random'
import snapshot from './fixtures/snapshot.json' with { type: 'json' }
import { type Locale, locales } from '../scripts/scrape.ts'

const configs = Object.fromEntries(
	await Promise.all(['lorem', ...locales].map(async (locale) => {
		return [
			locale,
			// @ts-ignore slow type checking
			(await import(`./configs/${locale}.ts`)).default,
		] as const
	})),
) as Record<Locale | 'lorem', LoremBabelConfig>

// random seed generated with crypto.getRandomValues(new BigUint64Array(1))[0]
const SEED = 2115880546258684834n

// prng to ensure deterministic results during testing
function prng(seed: bigint) {
	const byteGenerator = byteGeneratorSeeded(seed)
	return () => nextFloat64(byteGenerator)
}

const UPDATE_SNAPSHOT = Boolean(Deno.env.get('UPDATE_SNAPSHOT'))

Deno.test(LoremBabel.name, async (t) => {
	await t.step('throws if vocabulary is empty', () => {
		assertThrows(() =>
			new LoremBabel({
				locale: 'en',
				vocabulary: [],
			})
		)
	})

	await t.step('allows single-word vocabulary', () => {
		const lorem = new LoremBabel({
			locale: 'en',
			vocabulary: [{ word: 'word', weight: 1 }],
		})
		const words: string[] = lorem.words().take(5).toArray()
		assertEquals(words, ['word', 'word', 'word', 'word', 'word'])
	})

	await t.step('allows overriding the first sentence', () => {
		const lorem = new LoremBabel(configs.lorem)
		const text = lorem.text({
			paragraphsPerText: { min: 1, max: 1 },
			sentencesPerParagraph: { min: 3, max: 3 },
			wordsPerSentence: { min: 8, max: 25 },
		})

		text[0][0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

		assertMatch(
			text.toString(),
			/^Lorem ipsum dolor sit amet, consectetur adipiscing elit\.[\s\S]+/,
		)
	})

	await t.step('scalar word boundaries', () => {
		const lorem = new LoremBabel(configs.lorem)
		const text = lorem.text({
			wordsPerSentence: 10,
			paragraphsPerText: 1,
			sentencesPerParagraph: 1,
		})

		const str = text.toString()
		assertEquals(
			[...new Intl.Segmenter('en-US', { granularity: 'word' }).segment(str)].filter((x) => x.isWordLike).length,
			10,
		)
		assert(!str.includes('\n'))
	})

	await t.step(
		'with default config, `toString` converts to newline-delimited paragraphs and `sentenceSeparator`-delimited sentences',
		() => {
			const lorem = new LoremBabel({
				locale: 'en',
				vocabulary: [{ word: 'word', weight: 1 }],
				sentenceSeparator: '!',
				wordSeparators: [{ weight: 1, separator: '-' }],
				sentenceWrappers: [{ weight: 1, start: '[', end: ']' }],
			})

			assertEquals(
				lorem.text({
					wordsPerSentence: 3,
					paragraphsPerText: 2,
					sentencesPerParagraph: 2,
				}).toString(),
				`[Word-word-word]![Word-word-word]\n\n[Word-word-word]![Word-word-word]`,
			)
		},
	)

	type Result = { paragraphs: string[] }
	type Snapshots = Record<keyof typeof configs, Result>
	const blankTest: Result = { paragraphs: [] }
	const blankTests = Object.fromEntries(Object.keys(configs).map((k) => [k, { ...blankTest }])) as Snapshots
	const snapshots: Snapshots = Deno.env.get('UPDATE_SNAPSHOT') ? blankTests : snapshot as Snapshots

	await t.step('snapshots', async (t) => {
		for (const [key, snapshot] of Object.entries(snapshots)) {
			await t.step(key, () => {
				const locale = key as keyof typeof configs
				const config = configs[locale]
				const lorem = new LoremBabel(config)
				lorem.random = prng(SEED)

				const options = {
					paragraphsPerText: { min: 3, max: 5 },
					sentencesPerParagraph: { min: 3, max: 6 },
					wordsPerSentence: { min: 8, max: 25 },
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

				if (UPDATE_SNAPSHOT) {
					snapshot.paragraphs = [...actual.paragraphs()]
				} else {
					assertEquals([...actual.paragraphs()], [...snapshot.paragraphs])
				}
			})
		}

		if (UPDATE_SNAPSHOT) {
			await Deno.writeTextFile('./src/fixtures/snapshot.json', JSON.stringify(snapshots, null, '\t') + '\n')
			Deno.exit()
		}
	})
})

Deno.test('configs', async (t) => {
	await t.step('sanity checks', async (t) => {
		const SP = ' '
		const EMPTY = ''
		const LATIN_PERIOD = '.'
		const CJK_PERIOD = '。'

		await t.step('sentenceSeparator', () => {
			for (
				const [locale, expected] of [
					['ar', SP],
					['cs', SP],
					['de', SP],
					['es', SP],
					['got', SP],
					['ja', EMPTY],
					['lorem', SP],
					['ru', SP],
					['th', EMPTY],
					['tr', SP],
					['vi', SP],
					['zh', EMPTY],
				] as const
			) {
				const actual = configs[locale].sentenceSeparator
				assertEquals(
					actual,
					expected,
					`Unexpected sentenceSeparator for ${locale}: expected ${expected}, got ${actual}`,
				)
			}
		})

		await t.step('wordSeparators', () => {
			for (
				const [locale, expected] of [
					['ar', SP],
					['cs', SP],
					['de', SP],
					['es', SP],
					['got', SP],
					['ja', EMPTY],
					['lorem', SP],
					['ru', SP],
					['th', EMPTY],
					['tr', SP],
					['vi', SP],
					['zh', EMPTY],
				] as const
			) {
				const actual = configs[locale].wordSeparators?.[0].separator
				assertEquals(
					actual,
					expected,
					`Unexpected wordSeparators for ${locale}: expected ${expected}, got ${actual}`,
				)
			}
		})

		await t.step('sentenceWrappers', () => {
			for (
				const [locale, expected] of [
					['ar', LATIN_PERIOD],
					['cs', LATIN_PERIOD],
					['de', LATIN_PERIOD],
					['es', LATIN_PERIOD],
					['got', LATIN_PERIOD],
					['ja', CJK_PERIOD],
					['lorem', LATIN_PERIOD],
					['ru', LATIN_PERIOD],
					['th', EMPTY],
					['tr', LATIN_PERIOD],
					['vi', LATIN_PERIOD],
					['zh', CJK_PERIOD],
				] as const
			) {
				const actual = configs[locale].sentenceWrappers?.[0].end
				assertEquals(
					actual,
					expected,
					`Unexpected wordSeparators for ${locale}: expected ${expected}, got ${actual}`,
				)
			}
		})

		await t.step('vocabulary', () => {
			for (
				const [locale, expected] of [
					['de', ['das']],
					['es', ['como']],
					['ja', ['の']],
					['lorem', ['lorem']],
					['ru', ['это']],
					['zh', ['的']],
				] as const
			) {
				assertArrayIncludes(
					configs[locale].vocabulary.map((x) => x.word),
					expected,
					`Missing common vocabulary items for ${locale}: ${JSON.stringify(expected)}`,
				)
			}
		})
	})
})
