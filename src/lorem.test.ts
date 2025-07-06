import { LoremBabel } from './mod.ts'
import { assertEquals, assertInstanceOf, assertMatch, assertThrows } from '@std/assert'
import { locales } from './locales.ts'
import { Paragraph, TextContents } from './textContents.ts'

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
			input: 'hello',
			contextSize: 2,
		})
		const words: string[] = lorem.words().take(5).toArray()
		assertEquals(words, ['hello', 'hello', 'hello', 'hello', 'hello'])
	})

	await t.step('allows overriding the first sentence', async () => {
		const lorem = await locales.lorem()
		const text = lorem.text({
			paragraphs: { min: 1, max: 1 },
			sentences: { min: 3, max: 3 },
		})

		// @ts-expect-error Type 'number' is not assignable to type 'string'.
		text[0][0] = 1
		text[0][0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '

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
			sentences: 1,
		})

		assertInstanceOf(text, TextContents)
		assertEquals(text.length, 1)
		assertInstanceOf(text[0], Paragraph)
		assertEquals(text[0].length, 1)
	})
})
