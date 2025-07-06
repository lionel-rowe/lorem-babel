import { assert } from '@std/assert/assert'
import { unreachable } from '@std/assert/unreachable'
import { sample } from '@std/random/sample'
import { randomIntegerBetween } from '@std/random/integer-between'
import { FakeSentenceSegmenter } from './fakeSentenceSegmenter.ts'
import { Heading, Paragraph, TextContents } from './textContents.ts'
import { toTitleCase } from '@std/text/unstable-to-title-case'

// perf: only attempt to segment sentences every N tokens
const CHECK_EVERY_N_TOKENS = 100
// perf: only attempt to generate a sentence with target length 10 times
const MAX_ATTEMPTS = 10

/** Config for {@linkcode LoremBabel} */
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

function getLengthBoundaries(boundaries: number | LengthBoundaries): LengthBoundaries {
	const out = typeof boundaries === 'number' ? { min: boundaries, max: boundaries } : boundaries

	for (const k of ['min', 'max'] as const) {
		assert(Number.isInteger(out[k]), `boundaries.${k} must be an integer`)
		out[k] ||= 0
		assert(Math.sign(out[k]) === 1, `boundaries.${k} must be positive`)
		assert(out.min <= out.max, `boundaries.min must be less than or equal to boundaries.max`)
	}

	return out
}

type GenerateOptions = {
	/**
	 * Sentences per paragraph.
	 * @default {{ min: 3, max: 5 }}
	 */
	sentences: number | LengthBoundaries
	/**
	 * Total number of paragraphs to output.
	 * @default {{ min: 3, max: 5 }}
	 */
	paragraphs: number | LengthBoundaries
	/**
	 * Density of headings in the text, as a fraction of the number of paragraphs.
	 * A value of 0 means no headings, a value of 1 means one heading per paragraph.
	 * @default {0}
	 */
	headingDensity: number
	/**
	 * Target number of words per sentence.
	 * If null, no target is applied, and sentence length is determined by the input text.
	 * @default {null}
	 */
	targetWordsPerSentence: number | LengthBoundaries | null
	/**
	 * Target number of words per heading. This has no effect if `headingDensity` is 0.
	 * If null, no target is applied, and heading length is determined by the input text.
	 * @default {8}
	 */
	targetWordsPerHeading: number | LengthBoundaries | null
}

/** Default text generation options */
export const defaultGenerateOptions = {
	sentences: { min: 3, max: 5 },
	paragraphs: { min: 3, max: 5 },
	headingDensity: 0,
	targetWordsPerSentence: null,
	targetWordsPerHeading: 8,
} as const satisfies GenerateOptions

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
	readonly #delimiter: string

	readonly locale: string

	readonly rules: Readonly<Record<string, readonly [string, ...string[]]>>
	readonly #segmenters: {
		sentence: Intl.Segmenter
		word: Intl.Segmenter
	}

	constructor({ locale, input: original, contextSize, sentenceBreak }: LoremBabelConfig) {
		original = this.#inputToScalar(original)

		if (!original.trim()) throw new RangeError('Input must not be empty')

		locale = new Intl.Locale(locale).minimize().toString()
		this.#delimiter = '\0'

		while (original.includes(this.#delimiter)) {
			this.#delimiter = String.fromCodePoint(
				this.#delimiter.codePointAt(0)! + 1,
			)
		}

		const input = this.#prepareInput(original, locale)

		this.rules = this.#buildRules({ input, contextSize })

		this.locale = locale
		this.#segmenters = {
			sentence: sentenceBreak
				? new FakeSentenceSegmenter(80, new RegExp(sentenceBreak, 'dgv'))
				: new Intl.Segmenter(this.locale, { granularity: 'sentence' }),
			word: new Intl.Segmenter(this.locale, { granularity: 'word' }),
		}
	}

	#buildRules({ input, contextSize }: { input: string; contextSize: number }) {
		const rules: Record<string, [string, ...string[]]> = {}
		const tokens = input.split(this.#delimiter)

		// "wrap around" to ensure tokens can keep generating indefinitely
		tokens.push(...tokens.slice(0, contextSize))

		for (let i = contextSize; i < tokens.length; ++i) {
			const token = tokens[i]
			const key = tokens.slice(i - contextSize, i).join(this.#delimiter)
			if (Object.hasOwn(rules, key)) rules[key].push(token)
			else rules[key] = [token]
		}

		return rules
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
			out += x.segment + this.#delimiter
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
		// const { paragraphs, headingDensity } = opts
		let headingDensity = opts.headingDensity
		assert(Number.isFinite(headingDensity), 'headingDensity must be a finite number')
		headingDensity ||= 0
		assert(headingDensity >= 0 && headingDensity <= 1, 'headingDensity must be between 0 and 1')

		const { min, max } = getLengthBoundaries(opts.paragraphs)
		const length = randomIntegerBetween(min, max, { prng: this.random })

		const text = new TextContents()

		for (let i = 0; i < length; ++i) {
			const addHeading = [0, 1].includes(headingDensity)
				? Boolean(headingDensity)
				: (this.random() < headingDensity)
			if (addHeading) text.push(Heading.from([this.heading(opts.targetWordsPerHeading)]))

			const { min, max } = getLengthBoundaries(opts.sentences)
			const length = randomIntegerBetween(min, max, { prng: this.random })
			const sentences = opts.targetWordsPerSentence == null
				? this.#sentences().take(length)
				: Array.from({ length }, () => this.sentence(opts.targetWordsPerSentence))

			text.push(Paragraph.from(sentences, (x, i) => i === length - 1 ? x.trimEnd() : x))
		}

		return text
	}

	/** Generates a heading, aiming for the specified target number of words */
	heading(targetWords?: number | LengthBoundaries | null): string {
		return toTitleCase(this.sentence(targetWords)).trimEnd().replace(/^\p{P}+|\p{P}+$/gu, '')
	}

	/** Generates a sentence, aiming for the specified target number of words */
	sentence(targetWords?: number | LengthBoundaries | null): string {
		if (targetWords == null) {
			for (const x of this.#sentences()) return x
			unreachable()
		}

		const boundaries = getLengthBoundaries(targetWords)
		const targetMin = boundaries.min
		const targetMax = boundaries.max
		const targetDistance = (boundaries.max - boundaries.min) / 2
		const iter = this.#sentences()

		let bestAttempt = { text: '', distance: Infinity }

		for (let i = 0; i < MAX_ATTEMPTS; ++i) {
			const text = iter.next().value

			const count = this.#countWords(text)

			if (count >= targetMin && count <= targetMax) return text

			const distance = 0 - (Math.min(targetMin - count, count - targetMax))

			const attempt = { text, distance }
			if (attempt.distance < targetDistance) return attempt.text
			if (attempt.distance < bestAttempt.distance) bestAttempt = attempt
		}

		return bestAttempt.text
	}

	#countWords(str: string): number {
		return [...this.#segmenters.word.segment(str)].filter((x) => x.isWordLike).length
	}

	/** Generates a Markov chain token-by-token. */
	*#tokens() {
		const tokens = sample(Object.keys(this.rules), { prng: this.random })!.split(this.#delimiter)
		yield* tokens

		while (true) {
			const key = tokens.join(this.#delimiter)

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
		for (const s of this.#withSegmenter(this.#segmenters.sentence)) {
			yield s.segment
		}
		unreachable()
	}

	*words(): Generator<string, never, undefined> {
		for (const s of this.#withSegmenter(this.#segmenters.word)) {
			if (s.isWordLike) yield s.segment
		}
		unreachable()
	}

	*#withSegmenter(segmenter: Intl.Segmenter): Generator<Intl.SegmentData, never, undefined> {
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
