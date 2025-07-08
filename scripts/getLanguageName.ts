import { LOCALE } from '../demo/config.ts'
import { load } from 'npm:cheerio'

const entries = await Array.fromAsync(Deno.readDir('./src/locales'))
const locales = new Set(entries.map((x) => x.name.replace(/\.json$/, '')))

const dn = new Intl.DisplayNames(LOCALE, { type: 'language' })

const unknownNames = [...locales]
	.filter((x) => {
		if (x === 'lorem') return false
		const name = dn.of(x)
		return !name || name === x
	})

async function getLanguageName(locale: string) {
	const { language } = new Intl.Locale(locale)
	const res = await fetch(`https://en.wikipedia.org/wiki/ISO_639:${language}`)

	if (!res.ok) throw new Error(`${locale}: Status ${res.status}`)

	let buf = ''
	const decoder = new TextDecoder()
	for await (const chunk of res.body ?? []) {
		buf += decoder.decode(chunk, { stream: true })
		const m = buf.match(/<link[^>]+rel=['"]canonical['"][^>]*>/i)
		if (m) {
			const $ = load(m[0])
			const href = $('link').attr('href')!
			return {
				locale,
				name: decodeURIComponent(
					href.split('/').at(-1)!
						.replaceAll('_', ' ')
						.replaceAll(/\blanguages?\b$/gi, '')
						.replaceAll(/\s+/g, ' ')
						.trim(),
				),
			}
		}
	}

	return null
}

const results = await Promise.allSettled(unknownNames.map((isoCode) => getLanguageName(isoCode)))
const ok = results.filter((x) => x.status === 'fulfilled').map((x) => x.value)
const errs = results.filter((x) => x.status === 'rejected').map((x) => x.reason)

for (const err of errs) {
	console.error(err)
}

console.info(JSON.stringify(ok, null, '\t'))
