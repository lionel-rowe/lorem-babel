import { defaultGenerateOptions, LoremBabel } from '../src/mod.ts'
import { locales } from '../src/locales.ts'

function fmtRange({ min, max }: { min: number; max: number }) {
	return `${min}-${max}`
}

function parseRange(range: string) {
	const x = range.split('-').map(Number)
	if (x.length > 2 || x.length < 1) {
		throw new Error(`Invalid range format: ${range}`)
	}
	let [min, max] = x
	if (max == null) max = min

	if (isNaN(min) || isNaN(max) || min > max) {
		throw new Error(`Invalid range: ${range}`)
	}

	return { min, max }
}

Deno.serve(async (req) => {
	const url = new URL(req.url)
	if (req.method !== 'GET') {
		return new Response('Method Not Allowed', { status: 405 })
	}
	if (url.pathname !== '/') {
		return new Response('Not Found', { status: 404 })
	}

	const params = url.searchParams
	const locale = params.get('locale') ?? 'en'
	const words = params.get('words') ?? fmtRange(defaultGenerateOptions.wordsPerSentence)
	const sentences = params.get('sentences') ?? fmtRange(defaultGenerateOptions.sentencesPerParagraph)
	const paragraphs = params.get('paragraphs') ?? fmtRange(defaultGenerateOptions.paragraphsPerText)

	const localeConfig = Object.hasOwn(locales, locale)
		? (await locales[locale as keyof typeof locales]()).default
		: null
	if (!localeConfig) {
		return new Response(`Locale "${locale}" not found`, { status: 404 })
	}

	const generateConfig = {
		wordsPerSentence: parseRange(words),
		sentencesPerParagraph: parseRange(sentences),
		paragraphsPerText: parseRange(paragraphs),
	}

	const lorem = new LoremBabel(localeConfig)
	const text = lorem.text(generateConfig)

	// plaintext response
	return new Response(
		text.toString(),
		{
			headers: {
				'content-type': 'text/plain; charset=utf-8',
			},
		},
	)
})
