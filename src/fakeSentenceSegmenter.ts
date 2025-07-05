export class FakeSentenceSegmenter extends Intl.Segmenter {
	#re: RegExp

	constructor(targetLength: number, sentenceEnding: RegExp) {
		super('und', { granularity: 'sentence' })
		this.#re = new RegExp(String.raw`[\s\S]{${targetLength},}?(?:(?:${sentenceEnding.source})|$)`, 'dgv')
	}

	override segment(input: string): Intl.Segments {
		const arr = [...this.#segment(input)]

		return {
			[Symbol.iterator]: arr[Symbol.iterator].bind(arr),
			containing(i?: number) {
				i ??= 0
				// TODO: remove non-null assertion (current TS types for `Intl.Segments.containing` are wrong,
				// fixed in https://github.com/microsoft/TypeScript/pull/61236)
				return arr.find((s) => s.index <= i && s.index + s.input.length > i)!
			},
		}
	}

	*#segment(input: string): Generator<Intl.SegmentData, undefined, undefined> {
		this.#re.lastIndex = 0
		const m = [...input.matchAll(this.#re)]

		if (!m.length) {
			if (input.length > 0) {
				yield {
					segment: input,
					index: 0,
					input,
				}
			}

			return
		}

		const indices = m.map((x) => [x.index, x.index + x[0].length] as const)

		for (const [idx, [start, end]] of indices.entries()) {
			const prevEnd = idx === 0 ? 0 : indices[idx - 1]![1]

			if (start > prevEnd) {
				yield {
					segment: input.slice(prevEnd, start),
					index: prevEnd,
					input,
				}
			}

			if (start === end) continue

			yield {
				segment: input.slice(start, end),
				index: start,
				input,
			}
		}

		const i = indices.at(-1)![1]
		if (i < input.length) {
			yield {
				segment: input.slice(i),
				index: i,
				input,
			}
		}
	}
}
