import { LoremBabel } from './mod.ts'
import { assert, assertEquals, assertMatch, assertThrows } from '@std/assert'
import { locales } from './locales.ts'

Deno.test(LoremBabel.name, async (t) => {
	await t.step('throws if input is empty', () => {
		assertThrows(() =>
			new LoremBabel({
				locale: 'en',
				input: '',
				contextSize: 2,
			})
		)
	})

	await t.step('allows single-word input', () => {
		const lorem = new LoremBabel({
			locale: 'en',
			input: 'Hello. ',
			contextSize: 2,
		})
		const words: string[] = lorem.words().take(5).toArray()
		assertEquals(words, ['Hello', 'Hello', 'Hello', 'Hello', 'Hello'])
	})

	await t.step('allows overriding the first sentence', async () => {
		const lorem = await locales.lorem()
		const text = lorem.text({
			paragraphs: { min: 1, max: 1 },
			sentencesPerParagraph: { min: 3, max: 3 },
		})

		assert(text[0].kind === 'paragraph')
		// @ts-expect-error Type 'number' is not assignable to type 'string'.
		text[0].sentences[0] = 1
		text[0].sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '

		assertMatch(
			text.toString(),
			/^Lorem ipsum dolor sit amet, consectetur adipiscing elit\. [\s\S]+/,
		)
	})

	await t.step('`text()` returns `TextContents` containing `Paragraph`s', () => {
		const lorem = new LoremBabel({
			locale: 'en',
			input: 'Word. ',
			contextSize: 2,
		})
		const text = lorem.text({
			paragraphs: 1,
			sentencesPerParagraph: 1,
		})

		assertEquals(text.length, 1)
		assert(text[0].kind === 'paragraph')
		assertEquals(text[0].sentences.length, 1)
	})

	await t.step('`heading()` returns appropriately capitalized heading', () => {
		const lorem = new LoremBabel({
			locale: 'tr',
			input: 'II ii.',
			contextSize: 2,
		})

		const text = lorem.heading(1)

		assertEquals(text, 'Iı İi')
	})
})
