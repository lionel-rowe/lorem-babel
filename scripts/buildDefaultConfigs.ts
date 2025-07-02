import { Irregex, type Matcher } from '@li/irregex'
import { createConfig } from '../src/config.ts'
import type { LoremBabelConfig } from '../src/mod.ts'
import type { Locale } from '../src/types.ts'
import scraped from './scraped/all.json' with { type: 'json' }
import { regExpEscape } from '@li/regexp-escape-polyfill'

type ConfigFromScrapedConfig = {
	maxVocabSize?: number
	wordMatcher?: Pick<RegExp, 'test'>
	locale: Locale
	semanticCapitalization?: boolean
}

function configFromScraped(
	metaConfig: ConfigFromScrapedConfig,
): LoremBabelConfig {
	const { locale } = metaConfig

	return {
		...metaConfig,
		...createConfig({
			...metaConfig,
			locale: locale === 'lorem' ? 'xx' : locale,
			content: scraped[locale].content,
		}),
	}
}

class PartiallyLowerCaseWordMatcher extends Irregex {
	regex: RegExp
	config: {
		scriptId: string
		locale: Locale
		minLength: number
		minLengthExceptions: readonly string[]
		exclude: RegExp[]
	}

	constructor(
		config:
			& Partial<PartiallyLowerCaseWordMatcher['config']>
			& Pick<PartiallyLowerCaseWordMatcher['config'], 'scriptId' | 'locale'>,
	) {
		super()
		this.config = {
			minLength: 1,
			minLengthExceptions: [],
			...config,
			exclude: config.exclude ?? [],
		}

		this.config.exclude.push(
			wordsToRegExp(getLanguageAndRegionNamesForLocale(config.locale)),
		)

		this.regex = new RegExp(String.raw`^[\p{scx=${config.scriptId}}\p{M}]+$`, 'v')
		this.trackLastIndex = [this.regex]
	}

	getMatch(str: string): RegExpExecArray | null {
		const result = this.regex.exec(str)
		if (!result) return null

		const { locale, minLength, minLengthExceptions, exclude } = this.config

		const [m] = result
		if (m.toLocaleUpperCase(locale) === m) return null
		if (m.length < minLength && !minLengthExceptions.includes(m)) return null
		if (exclude.some((re) => re.test(m))) return null

		return result
	}
}

function wordsToRegExp(words: string[]) {
	return new RegExp(`^(?:${[...new Set(words.map((w) => regExpEscape(w.toLowerCase())))].join('|')})$`, 'i')
}

const DEFAULT_EXCLUDES = wordsToRegExp(
	// deno-fmt-ignore
	['unicode', 'windows', 'tahoma', 'arial', 'microsoft', 'unihan', 'hangul', 'adobe', 'novell', 'lotus', 'unisys', 'hebrew', 'endian', 'endianness', 'microsystems', 'separator', 'seperator', 'mozilla', 'apple', 'google', 'ibm', 'meta', 'facebook', 'netflix', 'oracle', 'plane', 'firefox', 'cyril'],
)
const NON_EN_EXCLUDES = wordsToRegExp(
	// deno-fmt-ignore
	['gives', 'higher', 'priority', 'ensuring', 'utility', 'future', 'preserving', 'past', 'antiquities', 'aims', 'first', 'instance', 'at', 'published', 'text', 'union', 'newspapers', 'and', 'magazines', 'printed', 'world', 'whose', 'number', 'is', 'undoubtedly', 'far', 'below', 'beyond', 'those', 'others', 'may', 'defined', 'obsolete', 'or', 'rare', 'these', 'are', 'better', 'candidates', 'registration', 'congesting', 'public', 'list', 'generally', 'useful', 'times', 'new', 'roman', 'systems', 'sun', 'basic', 'little', 'least', 'points', 'big', 'most', 'other', 'reserved', 'multilingual', 'capital', 'order', 'code', 'point', 'codepoint', 'byte', 'form', 'forms', 'web', 'pair', 'map', 'shift', 'bit', 'font', 'stream', 'escape', 'display', 'delta', 'block']
		.flatMap(x => [x, x.endsWith('s') && x.length > 2 ? x.slice(0, -1) : x + 's']),
)

export const metaConfigs = {
	ar: {
		wordMatcher: /^[\p{scx=Arab}\p{M}]+$/u,
	},
	cs: {
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'cs',
			scriptId: 'Latn',
			minLength: 2,
			minLengthExceptions: [],
			exclude: [DEFAULT_EXCLUDES, NON_EN_EXCLUDES],
		}),
	},
	de: {
		semanticCapitalization: true,
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'de',
			scriptId: 'Latn',
			minLength: 2,
			minLengthExceptions: [],
			exclude: [DEFAULT_EXCLUDES, NON_EN_EXCLUDES],
		}),
	},
	el: {
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'el',
			scriptId: 'Greek',
			minLength: 2,
			minLengthExceptions: [],
			exclude: [DEFAULT_EXCLUDES, NON_EN_EXCLUDES],
		}),
	},
	en: {
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'en',
			scriptId: 'Latn',
			minLength: 2,
			minLengthExceptions: ['a'],
			exclude: [DEFAULT_EXCLUDES],
		}),
	},
	es: {
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'es',
			scriptId: 'Latn',
			minLength: 2,
			minLengthExceptions: ['y', 'a', 'o', 'u', 'e'],
			exclude: [DEFAULT_EXCLUDES, NON_EN_EXCLUDES],
		}),
	},
	got: {
		wordMatcher: /^[\p{scx=Goth}\p{M}]+$/u,
	},
	ja: {
		wordMatcher: /^[\p{scx=Han}\p{scx=Hira}\p{scx=Kana}]+$/u,
	},
	lorem: {},
	ru: {
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'ru',
			scriptId: 'Cyrl',
			minLength: 2,
			minLengthExceptions: ['в', 'с', 'у'],
			exclude: [DEFAULT_EXCLUDES, NON_EN_EXCLUDES],
		}),
	},
	th: {
		wordMatcher: /^[\p{scx=Thai}\p{M}]+$/u,
	},
	tr: {
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'tr',
			scriptId: 'Latn',
			exclude: [DEFAULT_EXCLUDES, NON_EN_EXCLUDES],
		}),
	},
	vi: {
		wordMatcher: new PartiallyLowerCaseWordMatcher({
			locale: 'vi',
			scriptId: 'Latn',
			exclude: [DEFAULT_EXCLUDES, NON_EN_EXCLUDES, /^(?:[a-z]{8,})$/i],
		}),
	},
	zh: {
		wordMatcher: /^\p{scx=Han}+$/u,
	},
	ko: {
		wordMatcher: /^\p{scx=Hangul}+$/u,
	},
} satisfies Record<
	Locale,
	{
		wordMatcher?: Matcher
		/**
		 * Whether the locale attaches grammatical significance to case (i.e. German, which capitalizes nouns).
		 */
		semanticCapitalization?: boolean
	}
>

await Promise.all(
	Object.entries(metaConfigs).map(async ([k, v]) => {
		const locale = k as keyof typeof metaConfigs
		const config = configFromScraped({ locale, ...v })

		const filePath = `./src/configs/${locale}.ts`

		await Deno.writeTextFile(
			filePath,
			`import type { LoremBabelConfig } from '../mod.ts'

/**
 * @module
 * Config used with LoremBabel to generate nonsense placeholder text in \`${locale}\` locale.
 */

/** LoremBabel configuration for \`${locale}\` locale */
const config: LoremBabelConfig = ${
				JSON.stringify(config, (k, v) => ['wordMatcher', 'content'].includes(k) ? undefined : v, '\t')
					.replaceAll(/\n\t{3}/gm, ' ')
					.replaceAll(/\n\t{2}}/gm, ' }')
			}

export default config`,
		)

		await new Deno.Command('deno', {
			args: ['fmt', filePath],
		}).spawn().output()
	}),
)

function permute(...charArrs: string[][]) {
	let out = ['']
	for (const arr of charArrs) {
		out = out.flatMap((x) => arr.map((y) => [x, y].join('')))
	}
	return out
}

function getLanguageAndRegionNamesForLocale(locale: Intl.LocalesArgument) {
	const a = 'a'.codePointAt(0)!
	const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCodePoint(a + i))

	const tryCodes2l = permute(alphabet, alphabet)

	const languages = new Set<string>()
	const languageNames = new Intl.DisplayNames(locale, { type: 'language' })

	for (const locale of Intl.NumberFormat.supportedLocalesOf(tryCodes2l)) {
		languages.add(languageNames.of(locale.split('-', 1)[0]) ?? locale)
	}

	const regions = new Set<string>()
	const regionNames = new Intl.DisplayNames(locale, { type: 'region' })

	for (const region of tryCodes2l.map((x) => x.toUpperCase())) {
		const name = regionNames.of(region)
		if (name !== region) {
			regions.add(name ?? region)
		}
	}

	return [...languages, ...regions]
}
