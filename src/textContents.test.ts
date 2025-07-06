import { assertEquals } from '@std/assert'
import { TextContents } from './textContents.ts'

Deno.test('with default config, `toString()` converts to newline-delimited paragraphs', () => {
	const text = TextContents.from([
		{ kind: 'paragraph', sentences: ['A. ', 'B.'] },
		{ kind: 'paragraph', sentences: ['C. ', 'D.'] },
	]) as TextContents

	assertEquals(text.toString(), 'A. B.\n\nC. D.')
})
