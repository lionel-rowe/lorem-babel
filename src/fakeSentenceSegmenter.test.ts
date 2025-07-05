import { assertEquals } from '@std/assert'
import { FakeSentenceSegmenter } from './fakeSentenceSegmenter.ts'

Deno.test(FakeSentenceSegmenter.name, async (t) => {
	await t.step('parity with Intl.Segmenter', async (t) => {
		for (
			const input of [
				'',
				' ',
				'. ',
				'A ',
				'A. ',
				'A. B',
				'A. B.',
				'A. B. C. ',
				'Aaa. Bbb. Ccc. ',
			]
		) {
			await t.step(`segments ${JSON.stringify(input)}`, () => {
				assertEquals(
					[...new FakeSentenceSegmenter(0, /\. /).segment(input)],
					[...new Intl.Segmenter('und', { granularity: 'sentence' }).segment(input)],
				)
			})
		}
	})

	await t.step('reversability', async (t) => {
		const checkReverse = (input: string, segmenter: FakeSentenceSegmenter) => {
			const segments = [...segmenter.segment(input)]
			const output = segments.map((x) => x.segment).join('')
			assertEquals(output, input)
		}

		checkReverse('aaaaa bbbbb cccccccccc sdhj a a ', new FakeSentenceSegmenter(5, / /))
		checkReverse('a a ', new FakeSentenceSegmenter(5, / /))
	})
})
