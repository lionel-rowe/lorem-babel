import { assertEquals } from '@std/assert'
import { TextContents } from './textContents.ts'
import { Paragraph } from './textContents.ts'

Deno.test('with default config, `toString()` converts to newline-delimited paragraphs', () => {
	const text = TextContents.from([
		Paragraph.from(['A. ', 'B.']),
		Paragraph.from(['C. ', 'D.']),
	]) as TextContents

	assertEquals(text.toString(), 'A. B.\n\nC. D.')
})
