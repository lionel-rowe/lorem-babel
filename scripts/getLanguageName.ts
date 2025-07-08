async function getLanguageName(locale: string) {
	const { language } = new Intl.Locale(locale)
	const res = await fetch(`https://en.wikipedia.org/wiki/ISO_639:${language}`)

	if (!res.ok) throw new Error(`Status ${res.status}`)

	let buf = ''
	const decoder = new TextDecoder()
	for await (const chunk of res.body ?? []) {
		buf += decoder.decode(chunk, { stream: true })
		const m = buf.match(/<link[^>]+rel=['"]canonical['"][^>]*>/i)
		if (m) {
			const x = document.createElement('head')
			x.innerHTML = m[0]
			const { href } = x.querySelector('link')!
			return href.split('/').at(-1)!.replaceAll('_', ' ').replace(/ language$/i, '')
		}
	}

	return null
}

const results = await Promise.allSettled([
	'dv',
	'aa',
].map((isoCode) => getLanguageName(isoCode)))

results
