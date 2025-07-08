// ==UserScript==
// @name         Google Translate runner
// @namespace    https://github.com/lionel-rowe/
// @version      0.1
// @description  Google Translate runner
// @author       https://github.com/lionel-rowe/
// @match        https://translate.google.com
// @match        https://translate.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

// @ts-check
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// deno-fmt-ignore
// const exclude = ['auto', 'am', 'ar', 'bg', 'bn', 'cs', 'da', 'de', 'el', 'en-GB', 'en', 'es-419', 'es', 'et', 'fi', 'fr', 'got', 'he', 'hi', 'hu', 'id', 'it', 'ja', 'jv', 'ko', 'lorem', 'lv', 'my', 'nb', 'nl', 'osa', 'pl', 'pt-PT', 'pt', 'ro', 'ru', 'sk', 'sl', 'sv', 'th', 'tr', 'uk', 'ur', 'vi', 'zh-TW', 'zh']
// localStorage.setItem('done', JSON.stringify(exclude))

/** @param {number} ms */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

await sleep(6000 + (3000 * Math.random()))

/** @param {string} key */
function getJsonStringArrayFromLocalStorage(key) {
	/** @type {string[]} */
	const out = []

	try {
		for (const item of JSON.parse(localStorage.getItem(key) ?? 'Not JSON')) {
			if (typeof item === 'string') out.push(item)
			else throw new Error('Not a string')
		}
	} catch {
		throw new Error(`localStorage.getItem(${JSON.stringify(key)}) must be a JSON-serialized \`string[]\``)
	}

	return out
}

const inputs = getJsonStringArrayFromLocalStorage('inputs')
const done = new Set(getJsonStringArrayFromLocalStorage('done'))

const url = new URL(location.href)
const targetLocale = url.searchParams.get('tl') ?? (() => {
	throw new Error('missing tl param')
})()

if (done.has(targetLocale)) {
	throw new Error(`Target locale ${targetLocale} has already been translated.`)
} else {
	console.log(`Translating ${targetLocale}...`)
}

function getOutputEls() {
	return [...document.querySelectorAll('[jsaction^="copy:"] [dir] [jsaction^="mouseup:"]')]
}

function getOutputText() {
	return getOutputEls().map(($el) => {
		let children = [...$el.querySelectorAll('*')]
		/** @type {boolean[]} */
		const toRemove = []
		for (const [i, $child] of children.entries()) {
			if ($child.matches('[aria-hidden], [data-alternative-index]')) {
				toRemove[i] = true
				continue
			}
			const style = getComputedStyle($child)
			if (style.display === 'none') {
				toRemove[i] = true
			}
		}

		// second pass with `cloneNode` to avoid modifying the original element
		$el = /** @type {typeof $el} */ ($el.cloneNode(true))
		children = [...$el.querySelectorAll('*')]
		for (const [i, $child] of children.entries()) {
			if (toRemove[i]) {
				$child.parentNode?.removeChild($child)
			}
		}

		return $el.textContent?.trim() ?? ''
	})
		.join('\n\n')
}

/** @type {string[]} */
const outputChunks = []

/** @param {string[]} inputs */
function chunk(inputs) {
	const out = ['']
	for (const input of inputs) {
		const buf = out.at(-1) ?? ''
		const toAppend = input.trim() + '\n\n'
		const len = buf.length + toAppend.length
		if (len <= 5000) out[out.length - 1] += toAppend
		else out.push(toAppend)
	}
	return out
}

const chunks = chunk(inputs)

for (const x of chunks) {
	const $input = /** @type {HTMLTextAreaElement} */ (document.querySelector('[aria-label="Source text"]'))
	$input.select()
	document.execCommand('delete', false)
	document.execCommand('insertText', false, x)

	await sleep(6000 + (3000 * Math.random()))
	outputChunks.push(getOutputText())
}

const outputs = outputChunks.flatMap((x) => x.trim().split(/\n+/))

const data = {
	locale: targetLocale,
	contextSize: 2,
	input: outputs,
}

/** @param {File} file */
function downloadFile(file) {
	// using dl = new Downloader(file)
	const dl = new Downloader(file)
	dl.download()
	dl[Symbol.dispose]()
}

class Downloader {
	/** @type {string} */
	#href
	/** @type {HTMLAnchorElement} */
	#$el

	/** @param {File} file */
	constructor(file) {
		this.#href = URL.createObjectURL(file)

		this.#$el = document.createElement('a')
		this.#$el.style.display = 'none'
		this.#$el.href = this.#href
		this.#$el.download = file.name
	}

	download() {
		document.body.appendChild(this.#$el)
		this.#$el.click()
		this.#$el.remove()
	}

	[Symbol.dispose]() {
		URL.revokeObjectURL(this.#href)
		this.#$el.remove()
	}
}

downloadFile(new File([JSON.stringify(data, null, '\t') + '\n'], `${targetLocale}.json`, { type: 'application/json' }))
await sleep(1000)

done.add(targetLocale)
localStorage.setItem('done', JSON.stringify([...done]))

const selector = /** @type {'div'} */ ('[data-language-code]')
const remaining = [...new Set([...document.querySelectorAll(selector)].map((x) => `${x.dataset.languageCode}`))]
	.sort((a, b) => a.localeCompare(b, 'und'))
	.filter((x) => !done.has(x))

console.log(`Done translating ${targetLocale}. Remaining languages: ${remaining.length}`)
await sleep(3000)

if (remaining.length === 0) {
	console.log('All languages translated. Exiting script.')
} else {
	const [next] = remaining
	url.searchParams.set('tl', next)
	console.log(`Next language: ${next}. Reloading page...`)
	await sleep(3000)
	location.href = url.href
}
