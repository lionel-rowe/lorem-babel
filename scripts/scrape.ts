import { load } from 'cheerio'
import { AnchorMe } from 'irregex/matchers/anchorme.ts'
import { type Locale, locales } from '../src/types.ts'

type ScrapeConfig = {
	url: string | URL
	parentSelector: string
	childBlocksSelector?: string
	rejector?: string
	prepend?: string
}

const OVERWRITE_LOCALES = (() => {
	const str = Deno.env.get('OVERWRITE_LOCALES')?.trim() ?? ''
	return str === '*'
		? locales
		: str.split(',').filter(Boolean).filter((x) => locales.includes(x as Locale)) as readonly Locale[]
})()

function wikiConfig(locale: string): ScrapeConfig {
	return {
		url: `https://${locale}.wikipedia.org/wiki/Unicode`,
		parentSelector: '#mw-content-text, .mw-body-content',
		childBlocksSelector: 'p',
		rejector:
			'script, style, noscript, .listaref, ul, ol, table, [class*=not-searchable], [role=navigation], .reflist',
	}
}

const scrapeConfigs: Record<Locale, ScrapeConfig> = {
	// // TODO: `ang` (Old English)
	// ang: {
	// 	...wikiConfig('ang'),
	// 	// = /wiki/Capital_city
	// 	url: 'https://ang.wikipedia.org/wiki/Heafodstol',
	// },
	ar: wikiConfig('ar'),
	cs: wikiConfig('cs'),
	de: wikiConfig('de'),
	en: wikiConfig('en'),
	el: wikiConfig('el'),
	es: wikiConfig('es'),
	got: {
		...wikiConfig('got'),
		// = /wiki/Unicode
		url: 'https://got.wikipedia.org/wiki/𐌲𐌿𐍄𐍂𐌰𐌶𐌳𐌰',
	},
	ja: wikiConfig('ja'),
	lorem: {
		url: 'https://la.wikisource.org/wiki/De_finibus_bonorum_et_malorum/Liber_Primus',
		parentSelector: '#mw-content-text .text',
		prepend: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	ru: wikiConfig('ru'),
	th: {
		...wikiConfig('th'),
		// = /wiki/Computer (Unicode article is too short)
		url: 'https://th.wikipedia.org/wiki/คอมพิวเตอร์',
	},
	tr: wikiConfig('tr'),
	vi: wikiConfig('vi'),
	zh: wikiConfig('zh'),
	ko: wikiConfig('ko'),
}

if (import.meta.main) {
	const filePath = './scripts/scraped/all.json'
	const configs: Record<Locale, { content: string; url: string }> = JSON.parse(await Deno.readTextFile(filePath))
	const existing = new Set(Object.keys(configs) as Locale[])

	const written: Locale[] = []

	await Promise.all(
		Object.entries(scrapeConfigs).map(async ([_locale, config]) => {
			const locale = _locale as Locale

			if (existing.has(locale) && !OVERWRITE_LOCALES.includes(locale)) return

			const { url, parentSelector, childBlocksSelector, rejector, prepend } = config
			const res = await fetch(url)
			const $ = load(await res.text())

			const $content = $(parentSelector).eq(0).find(childBlocksSelector ?? 'p')

			if (rejector) {
				$content.find(rejector).remove()
			}

			const content = [
				prepend,
				new AnchorMe()[Symbol.replace](
					[...$content].map((x) => $(x).text().replaceAll(/\s+/g, ' ').trim()).join('\n\n'),
					' ',
				),
			].filter(Boolean).join('\n\n')

			configs[locale] = { content, url: url.toString() }
			written.push(locale)
		}),
	)

	await Deno.writeTextFile(
		filePath,
		JSON.stringify(
			Object.fromEntries(Object.entries(configs).sort(([a], [b]) => a.localeCompare(b))),
			null,
			'\t',
		) + '\n',
	)

	console.info(`Wrote ${written.length} locales: ${JSON.stringify(written)}`)
}
