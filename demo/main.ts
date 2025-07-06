import { defaultGenerateOptions } from '../src/mod.ts'
import { locales } from '../src/locales.ts'

function fmtRange(range: number | { min: number; max: number } | null) {
	if (range == null) return null

	const { min, max } = typeof range === 'number' ? { min: range, max: range } : range
	return `${min}-${max}`
}

function parseRange(range: string | null) {
	if (range == null) return null

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

	// const words = params.get('words') ?? fmtRange(defaultGenerateOptions.wordsPerSentence)
	const sentences = params.get('sentences') ?? fmtRange(defaultGenerateOptions.sentences)
	const paragraphs = params.get('paragraphs') ?? fmtRange(defaultGenerateOptions.paragraphs)
	const headingDensity = Number(params.get('headings') ?? defaultGenerateOptions.headingDensity)
	const targetWordsPerSentence = params.get('per-sentence') ?? fmtRange(defaultGenerateOptions.targetWordsPerSentence)
	const targetWordsPerHeading = params.get('per-heading') ?? fmtRange(defaultGenerateOptions.targetWordsPerHeading)

	const lorem = Object.hasOwn(locales, locale) ? (await locales[locale as keyof typeof locales]()) : null
	if (!lorem) {
		return new Response(
			`Locale "${locale}" not found. Available locales: ${Object.keys(locales).map((x) => `"${x}"`).join(', ')}`,
			{ status: 404 },
		)
	}

	const generateConfig = {
		sentences: parseRange(sentences)!,
		paragraphs: parseRange(paragraphs)!,
		headingDensity,
		targetWordsPerSentence: parseRange(targetWordsPerSentence),
		targetWordsPerHeading: parseRange(targetWordsPerHeading),
	}

	// const lorem = new LoremBabel(lorem)
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
