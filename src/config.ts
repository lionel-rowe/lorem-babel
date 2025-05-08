import type { LoremBabelConfig } from './mod.ts'

// defaults
const MAX_VOCAB_SIZE = 800
const WORD_MATCHER = /^[\p{L}\p{M}\p{N}]+$/u
const EXCLUDE_PUNCT = /[•"'()\[\]\{\}\/／+&]/

type ContentToVocabularyParams = {
	content: string
	locale: string | Intl.Locale
	wordMatcher?: Pick<RegExp, 'test'>
	maxVocabSize: number
	semanticCapitalization?: boolean
}

function contentToVocabulary(
	{ content, locale, wordMatcher, maxVocabSize, semanticCapitalization }: ContentToVocabularyParams,
) {
	const wordFreqs = new Map<string, number>()

	const sent = new Intl.Segmenter(locale, { granularity: 'sentence' })
	const word = new Intl.Segmenter(locale, { granularity: 'word' })

	for (const x of sent.segment(content.normalize())) {
		let isFirstWord = true

		for (const s of word.segment(x.segment)) {
			if (s.isWordLike && (wordMatcher ?? WORD_MATCHER).test(s.segment)) {
				// We always normalize case for the first word, as its capitalization isn't necessarily due to being
				// a noun, even in German.
				const shouldNormalizeCase = semanticCapitalization ? isFirstWord : true

				const normalized = shouldNormalizeCase ? s.segment.toLocaleLowerCase(locale) : s.segment
				wordFreqs.set(normalized, (wordFreqs.get(normalized) ?? 0) + 1)
			}

			if (s.isWordLike) {
				isFirstWord = false
			}
		}
	}

	return [...wordFreqs].sort(([, a], [, b]) => b - a).slice(0, maxVocabSize).map((
		[word, weight],
	) => ({ word, weight }))
}

export function createConfig(
	metaConfig: {
		locale: string | Intl.Locale
		content: string
		maxVocabSize?: number
		wordMatcher?: Pick<RegExp, 'test'>
		/**
		 * Whether the locale attaches grammatical significance to case (i.e. German, which capitalizes nouns).
		 */
		semanticCapitalization?: boolean
	},
): LoremBabelConfig {
	const { content, locale, wordMatcher, maxVocabSize, semanticCapitalization } = metaConfig

	// we assume `content` is formatted in `\n\n`-separated paragraphs with no additional intra-paragraph whitespace other
	// than single spaces (per the scraping logic)

	const vocabulary = contentToVocabulary({
		content,
		locale,
		wordMatcher,
		maxVocabSize: maxVocabSize ?? MAX_VOCAB_SIZE,
		semanticCapitalization,
	})

	const wordSegmenter = new Intl.Segmenter(locale, { granularity: 'word' })
	const sentences = [...new Intl.Segmenter(locale, { granularity: 'sentence' }).segment(content)]
		.map((x) => x.segment)
		.map((x) => x.replace(/\n+$/g, ''))
		.filter(Boolean)
		.filter((x) => x.length > 20 /* chars */)

	const medialPunctMap = new Map<string, number>()

	const medialPunct: string[] = []

	for (const sentence of sentences) {
		let cursor = 0
		let prevIsWordLike = false

		// merge consecutive non-word-like segments
		const _wordSegments = [...wordSegmenter.segment(sentence)]
		const wordSegments: Intl.SegmentData[] = []
		for (const [i, w] of _wordSegments.entries()) {
			if (!i) {
				wordSegments.push(w)
			} else if (w.isWordLike) {
				wordSegments.push(w)
			} else if (!w.isWordLike && !wordSegments.at(-1)!.isWordLike) {
				// wordSegments.push(w)
				wordSegments.at(-1)!.segment += w.segment
			} else {
				wordSegments.push(w)
			}
		}

		for (const [i, wordSegment] of wordSegments.entries()) {
			using stack = new DisposableStack()
			stack.defer(() => {
				cursor += wordSegment.segment.length
				prevIsWordLike = Boolean(wordSegment.isWordLike)
			})

			if (wordSegment.isWordLike) {
				if (prevIsWordLike && wordSegment.index === cursor) {
					medialPunct.push('')
				}
				continue
			}

			if (
				!/[\p{P}\s]/u.test(wordSegment.segment) ||
				EXCLUDE_PUNCT.test(wordSegment.segment) ||
				/[\p{Ps}\p{Pe}\p{Pi}\p{Pf}]/u.test(wordSegment.segment) ||
				/\p{P}{2}/u.test(wordSegment.segment)
			) {
				continue
			}

			if (i === wordSegments.length - 1) {
				// sentence-final punct - ignore as this is handled separately
				continue
			}

			medialPunct.push(wordSegment.segment)
		}
	}

	for (const p of medialPunct) {
		medialPunctMap.set(p, (medialPunctMap.get(p) ?? 0) + 1)
	}

	const founds = new Set<string>()

	let medials = [...medialPunctMap.entries()].sort(([, a], [, b]) => b - a)
		.filter(([x]) => {
			const trimmed = x.trim()
			if (founds.has(trimmed)) return false
			founds.add(trimmed)
			return true
		})

	const JOINER = '\0'
	let _wrappers = sentences
		.map((x) => {
			const start = x.match(new RegExp(String.raw`^\s*[\p{Po}--"]`, 'v'))?.[0] ?? ''
			const end = x.match(new RegExp(String.raw`[\p{Po}--"]\s*$`, 'v'))?.[0] ?? ''

			return [start, end].join(JOINER)
		})
		.filter((x) => !/\n/.test(x) && !EXCLUDE_PUNCT.test(x))

	// we join sentences with sentence separator, so we can trim these here
	_wrappers = _wrappers.map((x) => x.trim())

	const wrappersMap = new Map<string, number>()
	for (const p of _wrappers) {
		wrappersMap.set(p, (wrappersMap.get(p) ?? 0) + 1)
	}

	const foundWrappers = new Set<string>()

	const wrappers = [...wrappersMap.entries()].sort(([, a], [, b]) => b - a)
		.filter(([x]) => {
			const trimmed = x.trim()
			if (foundWrappers.has(trimmed)) return false
			foundWrappers.add(trimmed)
			return true
		})
		.map(([k, v]) => {
			const wrapper = k.split(JOINER)
			if (wrapper.length !== 2) wrapper.push('')

			return [wrapper as [string, string], v] as const
		})

	medials = medials.filter(([x]) => !_wrappers.includes(x))

	const isSentenceSpaced = sentences.filter((x) => /\s$/.test(x)).length > sentences.length / 5

	for (const arr of [medials, wrappers]) {
		if (!arr.length) continue

		arr.sort(([, a], [, b]) => a - b)
		const topFreq = arr.at(-1)![1]
		for (const x of arr) {
			if (x[1] >= topFreq / 10) break
			arr.shift()
		}

		arr.reverse()
	}

	const sentenceWrappers = wrappers.map(([wrapper, weight]) => ({ weight, start: wrapper[0], end: wrapper[1] }))
	const wordSeparators = medials.map(([separator, weight]) => ({ weight, separator }))
		.filter((x) => !/[.!?。！？]/.test(x.separator))

	if (sentenceWrappers.length === 0) {
		sentenceWrappers.push({ weight: 1, start: '', end: '' })
	}
	if (wordSeparators.length === 0) {
		wordSeparators.push({ weight: 1, separator: '' })
	}

	const config = {
		...metaConfig,
		sentenceSeparator: isSentenceSpaced ? ' ' : '',
		wordSeparators,
		sentenceWrappers,
		vocabulary,
	}

	return config
}
