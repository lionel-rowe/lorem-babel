type LoremBabelConfigFull = {
	locale: string | Intl.Locale
	vocabulary: readonly { weight: number; word: string }[]
	sentenceSeparator: string
	wordSeparators: readonly { weight: number; separator: string }[]
	sentenceWrappers: readonly { weight: number; start?: string; end: string }[]
	semanticCapitalization?: boolean
}

type RequiredConfigOptions = 'locale' | 'vocabulary'

/**
 * Configuration for a `LoremBabel` instance.
 */
export type LoremBabelConfig = Partial<LoremBabelConfigFull> & Pick<LoremBabelConfigFull, RequiredConfigOptions>

const defaults: Omit<LoremBabelConfigFull, RequiredConfigOptions> = {
	sentenceSeparator: ' ',
	wordSeparators: [
		{ weight: 1, separator: ' ' },
		{ weight: 0.075, separator: ', ' },
		{ weight: 0.0005, separator: ': ' },
		{ weight: 0.001, separator: '; ' },
	],
	sentenceWrappers: [
		{ weight: 1, start: '', end: '.' },
		{ weight: 0.01, start: '', end: '?' },
		{ weight: 0.005, start: '', end: '!' },
	],
}

type LengthBoundaries = {
	min: number
	max: number
}

function getLengthBoundaries(lengthBoundaries: number | LengthBoundaries): LengthBoundaries {
	if (typeof lengthBoundaries === 'number') {
		return { min: lengthBoundaries, max: lengthBoundaries }
	}
	return lengthBoundaries
}

type GenerateOptions = {
	wordsPerSentence: number | LengthBoundaries
	sentencesPerParagraph: number | LengthBoundaries
	paragraphsPerText: number | LengthBoundaries
}

const defaultGenerateOptions = {
	wordsPerSentence: { min: 8 as const, max: 25 as const },
	sentencesPerParagraph: { min: 3 as const, max: 5 as const },
	paragraphsPerText: { min: 3 as const, max: 5 as const },
} satisfies GenerateOptions

class TextContents extends Array {
	#sentenceSeparator!: string

	static fromParts(textParts: string[][], sentenceSeparator: string): TextContents {
		const p = new this(...textParts)
		p.#sentenceSeparator = sentenceSeparator
		return p
	}

	private constructor(...textParts: string[][]) {
		// @ts-ignore Argument of type 'string[]' is not assignable to parameter of type 'number'.
		super(...textParts)
	}

	*paragraphs(): Generator<string, undefined, undefined> {
		for (const x of this) {
			yield x.join(this.#sentenceSeparator)
		}
	}

	*sentences(): Generator<string, undefined, undefined> {
		for (const x of this) {
			yield* x
		}
	}

	override toString(): string {
		return [...this.paragraphs()].join('\n\n')
	}
}

type NonEmptyArr<T> = readonly [T, ...T[]]
function assertNonEmpty<T>(array: readonly T[], msg?: string): asserts array is NonEmptyArr<T> {
	if (!array.length) {
		throw new RangeError([msg, 'array is empty'].filter(Boolean).join(' '))
	}
}

/**
 * Generate paragraphs, sentences, and individual words of text in a variety of languages.
 *
 * @example
 *
 * ```ts
 * import { LoremBabel } from '@li/lorem-babel'
 * import ja from '@li/lorem-babel/locales/ja'
 *
 * const lorem = new LoremBabel(ja)
 *
 * lorem.words().take(5).toArray()
 * // [ "は", "代用", "さ", "ビット", "は" ]
 *
 * lorem.text().toString()
 * // 管轄でたをたのは収録ある分にで位置中国は万-で本質後...
 * ```
 */
export class LoremBabel {
	readonly config: LoremBabelConfigFull
	random = Math.random
	genericWordSeparator: string

	/**
	 * Create a new `LoremBabel` instance.
	 *
	 * @param config - configuration for the `LoremBabel` instance
	 */
	constructor(config: LoremBabelConfig) {
		this.config = { ...defaults, ...config }

		this.genericWordSeparator = [...this.config.wordSeparators].sort((a, b) => b.weight - a.weight)[0].separator

		for (const k of ['vocabulary', 'sentenceWrappers', 'wordSeparators'] as const) {
			assertNonEmpty<unknown>(this.config[k], k)
		}

		const { locale } = this.config
		new Intl.Locale(locale)
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
	 * import vi from '@li/lorem-babel/locales/vi'
	 *
	 * const lorem = new LoremBabel(vi)
	 * const text = lorem.text({
	 * 	wordsPerSentence: { min: 5, max: 10 },
	 * 	sentencesPerParagraph: { min: 2, max: 3 },
	 * 	paragraphsPerText: { min: 3, max: 3 },
	 * })
	 * // TextContents(3) [ ... ]
	 * text.toString()
	 * // "Năng bởi sử-trong nhất tự. Hợp ra mặc đầu khác. Có nó chữ mặt phân các thêm chẽ dù.\n\nCác bit chính, tự có trong trái được pair escape. Nhỏ ký các phần ký khi khuyến ban. Một mở tốn từ và bố số mục ở.\n\nNhững các đã hình hệ. Nhiều trùm nếu pháp cũ, số cho số. Lưu sự lý kỳ trong hiện giá có."
	 * ```
	 */
	text(options?: Partial<GenerateOptions>): TextContents {
		const opts = { ...defaultGenerateOptions, ...options }
		const { min, max } = getLengthBoundaries(opts.paragraphsPerText)
		const length = this.#randBetween(min, max)

		return TextContents.fromParts(
			Array.from({ length }, () => {
				return this.#sentences(opts)
			}),
			this.config.sentenceSeparator,
		)
	}

	/**
	 * Randomly generate individual words.
	 * Returns an infinite iterator, so care needs to be taken to avoid infinite loops.
	 *
	 * @example
	 * ```ts
	 * import { LoremBabel } from '@li/lorem-babel'
	 * import el from '@li/lorem-babel/locales/el'
	 *
	 * const lorem = new LoremBabel(el)
	 * lorem.words().take(5).toArray()
	 * // example output: [ "τα", "χαρακτήρων", "προς", "στις", "στο" ]
	 * ```
	 */
	*words(): Generator<string, never, undefined> {
		let prevWord = ''
		whileLoop: while (true) {
			// try 10 times for a non-repeated next word
			for (let i = 0; i < 10; ++i) {
				const word = this.#weighted(this.config.vocabulary).word
				if (word !== prevWord) {
					yield word
					prevWord = word
					continue whileLoop
				}
			}

			// otherwise just take the next one regardless of repetition
			yield this.#weighted(this.config.vocabulary).word
		}
	}

	#capitalize(str: string): string {
		let firstChar = ''
		for (const char of str) {
			firstChar = char
			break
		}
		return firstChar.toLocaleUpperCase(this.config.locale) + str.slice(firstChar.length)
	}

	#sentence(options: {
		isLastOfParagraph: boolean
		wordsPerSentence: LengthBoundaries | number
	}): string {
		const { min, max } = getLengthBoundaries(options.wordsPerSentence)
		const length = this.#randBetween(min, max)

		const words = this.words()

		const { start, end } = options.isLastOfParagraph
			? this.config.sentenceWrappers[0]!
			: this.#weighted(this.config.sentenceWrappers)

		return (start ?? '') + this.#capitalize(
			Array.from({ length }).flatMap((_, i) => {
				const word = words.next().value
				return i
					? [
						i < 3 || i > length - 3
							? this.genericWordSeparator
							: this.#weighted(this.config.wordSeparators).separator,
						word,
					]
					: [word]
			}).join(''),
		) + end
	}

	#sentences(options: Pick<GenerateOptions, 'wordsPerSentence' | 'sentencesPerParagraph'>): string[] {
		const { min, max } = getLengthBoundaries(options.sentencesPerParagraph)
		const length = this.#randBetween(min, max)

		return Array.from({ length }, (_, i) => {
			return this.#sentence({
				...options,
				isLastOfParagraph: i === length - 1,
			})
		})
	}

	#randBetween(min: number, max: number): number {
		min = Math.min(min, max)
		max = Math.max(min, max)
		return Math.floor(this.random() * (max - min + 1) + min)
	}

	#weighted<T extends { weight: number }>(items: readonly T[]): T {
		const total = Object.values(items).reduce((sum, { weight }) => sum + weight, 0)

		const rnd = this.random() * total
		let accumulator = 0

		for (const item of items) {
			accumulator += item.weight

			if (rnd < accumulator) {
				return item
			}
		}

		return items[0]
	}
}
