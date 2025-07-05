import { unreachable } from '@std/assert/unreachable'
import { randomIntegerBetween, sample } from '@std/random'
import { FakeSentenceSegmenter } from './fakeSentenceSegmenter.ts'
import { TextContents } from './textContents.ts'

function getLengthBoundaries(boundaries: number | LengthBoundaries): LengthBoundaries {
	return typeof boundaries === 'number' ? { min: boundaries, max: boundaries } : boundaries
}

export type LoremBabelConfig = {
	/** The locale of the text to generate */
	locale: string
	/** Number of tokens to use as context for the Markov chain */
	contextSize: number
	/**
	 * Input text to use as the basis for the generated text.
	 * Can be a string or an array of strings, in which case it will be interpreted as paragraphs.
	 */
	input: string | string[]
	/**
	 * Interpreted as RegExp source (v-mode). Only necessary for languages like
	 * Thai that do not have an easy way to delimit sentences.
	 */
	sentenceBreak?: string
}

type LengthBoundaries = {
	min: number
	max: number
}

type GenerateOptions = {
	// /** Words per sentence */
	// words: number | LengthBoundaries
	/** Sentences per paragraph */
	sentences: number | LengthBoundaries
	/** Paragraphs per text */
	paragraphs: number | LengthBoundaries
}

export const defaultGenerateOptions: GenerateOptions = {
	sentences: { min: 3 as const, max: 5 as const },
	paragraphs: { min: 3 as const, max: 5 as const },
}

/**
 * Generate paragraphs, sentences, and individual words of text in a variety of languages.
 *
 * @example
 *
 * ```ts
 * import { LoremBabel } from '@li/lorem-babel'
 * import config from '@li/lorem-babel/locales/ja' with { type: 'json' }
 *
 * const lorem = new LoremBabel(config)
 *
 * lorem.words().take(5).toArray()
 * // [ "は", "代用", "さ", "ビット", "は" ]
 *
 * lorem.text().toString()
 * // 来場者は職人技と精神性の証である。それは、パン生地をこね、パンを味わう。この学術...
 * ```
 */
export class LoremBabel {
	random = Math.random
	delimiter: string

	locale: string

	rules: Record<string, [string, ...string[]]>
	segmenters: {
		sentence: Intl.Segmenter
		word: Intl.Segmenter
	}

	constructor({ locale, input: original, contextSize, sentenceBreak }: LoremBabelConfig) {
		original = this.#inputToScalar(original)

		if (!original.trim()) throw new RangeError('Input must not be empty')

		locale = new Intl.Locale(locale).minimize().toString()
		this.delimiter = '\0'

		while (original.includes(this.delimiter)) {
			this.delimiter = String.fromCodePoint(
				this.delimiter.codePointAt(0)! + 1,
			)
		}

		const input = this.#prepareInput(original, locale)

		const rules: Record<string, [string, ...string[]]> = {}
		const tokens = input.split(this.delimiter)

		// "wrap around" to ensure tokens can keep generating indefinitely
		tokens.push(...tokens.slice(0, contextSize))

		for (let i = contextSize; i < tokens.length; ++i) {
			const token = tokens[i]
			const key = tokens.slice(i - contextSize, i).join(this.delimiter)
			if (Object.hasOwn(rules, key)) rules[key].push(token)
			else rules[key] = [token]
		}

		this.rules = rules

		this.locale = locale
		this.segmenters = {
			sentence: sentenceBreak
				? new FakeSentenceSegmenter(80, new RegExp(sentenceBreak, 'dgv'))
				: new Intl.Segmenter(this.locale, { granularity: 'sentence' }),
			word: new Intl.Segmenter(this.locale, { granularity: 'word' }),
		}
	}

	#inputToScalar(input: string | string[]): string {
		return Array.isArray(input) ? input.join('\n\n') : input
	}

	#prepareInput(input: string, locale: Intl.LocalesArgument): string {
		const sentencesAreSpaceDelimited = input.split(' ').length > input.length / 50
		const space = sentencesAreSpaceDelimited ? ' ' : ''

		const s = input.replaceAll(/\n+/g, space).trim() + space

		let out = ''

		for (const x of new Intl.Segmenter(locale, { granularity: 'word' }).segment(s)) {
			out += x.segment + this.delimiter
		}

		return out
	}

	/**
	 * Get random placeholder text based on the supplied options.
	 *
	 * @param options - generation options
	 * @returns the text contents separated into paragraphs and sentences
	 *
	 * @example
	 *
	 * ```ts
	 * import { LoremBabel } from '@li/lorem-babel'
	 * import config from '@li/lorem-babel/locales/vi' with { type: 'json' }
	 *
	 * const lorem = new LoremBabel(config)
	 * const text = lorem.text({
	 * 	sentences: { min: 2, max: 3 },
	 * 	paragraphs: { min: 3, max: 3 },
	 * })
	 * // TextContents(3) [ ... ]
	 * text.toString()
	 * // "Thiên đường cho chợ luôn sôi động. Các nhà bóng người.\n\nGa tàu hỏa nhộn nhịp tại vĩnh cửu. Không gian dường như một nhịp điệu, tiếng lá cây xanh mướt, thu hút những bước qua những quan của rạn san hô nuôi dưỡng cơ hội.\n\nMùi thơm của mình. Môi trường yên và sinh tồn trong chu kỳ tự. Giữa những trải qua rừng cây cỏ mới, gia vị mới ra."
	 * ```
	 */
	text(options?: Partial<GenerateOptions>): TextContents {
		const opts = { ...defaultGenerateOptions, ...options }

		const { min, max } = getLengthBoundaries(opts.paragraphs)

		const length = randomIntegerBetween(min, max, { prng: this.random })

		return TextContents.fromParts(
			Array.from({ length }, () => {
				const { min, max } = getLengthBoundaries(opts.sentences)
				const length = randomIntegerBetween(min, max, { prng: this.random })
				return this.#sentences().take(length).toArray().map((x, i, a) => i === a.length - 1 ? x.trimEnd() : x)
			}),
			'',
		)
	}

	/** Generates a Markov chain token-by-token. */
	*#tokens() {
		const tokens = sample(Object.keys(this.rules), { prng: this.random })!.split(this.delimiter)
		yield* tokens

		while (true) {
			const key = tokens.join(this.delimiter)

			// If rules doesn't have `key` prop then EoF (this can never happen if `wrap=true`)
			if (!Object.hasOwn(this.rules, key)) return

			const token = sample(this.rules[key], { prng: this.random })
			yield token

			for (let i = 0; i < tokens.length; ++i) {
				tokens[i] = tokens[i + 1] ?? token
			}
		}
	}

	*#sentences(): Generator<string, never, undefined> {
		for (const s of this.#withSegmenter(this.segmenters.sentence)) {
			yield s.segment
		}
		unreachable()
	}

	*words(): Generator<string, never, undefined> {
		for (const s of this.#withSegmenter(this.segmenters.word)) {
			if (s.isWordLike) yield s.segment
		}
		unreachable()
	}

	*#withSegmenter(segmenter: Intl.Segmenter): Generator<Intl.SegmentData, never, undefined> {
		// perf: only attempt to segment sentences every N tokens
		const CHECK_EVERY_N_TOKENS = 100

		let i = 0
		let buf = ''

		for (const token of this.#tokens()) {
			i = (i + 1) % CHECK_EVERY_N_TOKENS
			buf += token

			if (i !== 0) continue

			const segments = [...segmenter.segment(buf)]

			for (let i = 1; i < segments.length - 1; ++i) {
				yield segments[i]!
			}

			buf = segments.slice(-2).map((x) => x.segment).join('')
		}
		unreachable()
	}
}
