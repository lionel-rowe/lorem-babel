import { HttpSaver } from '@li/http-saver/http-saver'

using _ = new HttpSaver().stubFetch()

const source_lang = 'zh'

const languageNames = new Intl.DisplayNames('en', { type: 'language' })

const t = (prompt('Enter target locales:'))?.trim().split(',').map((x) => x.trim())
	.map((x) => {
		const l = new Intl.Locale(x)
		return l.minimize().toString()
	}) ?? []

console.info(t)
console.info(t.map((x) => languageNames.of(x) ?? x))

if (!confirm('Continue?')) Deno.exit(0)

void (await Promise.allSettled(t.map(async (target_lang) => {
	const res = await fetch('https://api-free.deepl.com/v2/translate', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			authorization: `DeepL-Auth-Key ${Deno.env.get('DEEPL_API_KEY')}`,
		},
		body: JSON.stringify({
			text: (await Deno.readTextFile(`./texts/${source_lang}.txt`)).split(/\n+/).filter((x) => x.trim()),
			source_lang,
			target_lang,
		}),
	})

	const outPath = `./locales/${target_lang}.json`

	if (!res.ok) {
		throw new Error(`Failed to translate ${source_lang} to ${target_lang}: ${res.status} ${res.statusText}`)
	}

	const text = (await res.json()).translations.map((x: { text: string }) => x.text).join('\n\n').trim()

	const config = {
		locale: target_lang,
		input: text.replaceAll('\r', '').split(/\n+/).filter(Boolean),
		contextSize: 2,
	}

	await Deno.writeTextFile(
		outPath,
		JSON.stringify(config, null, '\t') + '\n',
	)

	console.info(`Translated ${source_lang} to ${target_lang} and saved to ${outPath}`)
})))
	.map((x) => {
		if (x.status === 'rejected') {
			console.error('Error:', x.reason)
		}
	})
