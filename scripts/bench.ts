import { locales } from '../src/locales.ts'

for (const [locale, getLorem] of Object.entries(locales)) {
	console.time(`init ${locale}`)
	const lorem = await getLorem()
	console.timeEnd(`init ${locale}`)

	Deno.bench({
		group: 'generate',
		name: `generate ${locale}`,
		fn() {
			lorem.text({ sentences: 5, paragraphs: 5, headingDensity: 0.5 })
		},
	})
}
