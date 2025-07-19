import { isRedirectStatus, STATUS_CODE } from '@std/http/status'
import { accepts } from '@std/http/negotiation'
import { populateLayout, populateTemplate } from '../render.ts'
import { marked } from '../marked.ts'
import { contentType } from '@std/media-types/content-type'
import { err } from './err.ts'
import { type Locale, locales } from '~/locales.ts'
import { escape } from '@std/html/entities'
import { defaultGenerateOptions, type GenerateOptions } from '~/lorem.ts'
import { isVerticalLr, languageNames, listFmt } from '../config.ts'
import type { TextContents } from '~/textContents.ts'
import '../polyfills.ts'

const defaultFormOptions: GenerateOptions = {
	...defaultGenerateOptions,
	paragraphs: { min: 7, max: 10 },
	headingDensity: 0.5,
}

export const playground = jsonOrHtml(async (req: Request): Promise<Response> => {
	const url = new URL(req.url)
	const { searchParams } = url

	const locale = searchParams.get('locale') ?? formDefaults.locale

	const params: Partial<GenerateOptions> = {
		sentencesPerParagraph: parseRange(searchParams.get('sentences')) ?? defaultFormOptions.sentencesPerParagraph,
		paragraphs: parseRange(searchParams.get('paragraphs')) ?? defaultFormOptions.paragraphs,
		headingDensity: parseFloat(searchParams.get('headings') ?? String(defaultFormOptions.headingDensity)),
		targetWordsPerSentence: parseRange(searchParams.get('per-sentence')) ??
			defaultFormOptions.targetWordsPerSentence,
		targetWordsPerHeading: parseRange(searchParams.get('per-heading')) ?? defaultFormOptions.targetWordsPerHeading,
	}

	if (!Object.hasOwn(locales, locale)) {
		return err(STATUS_CODE.BadRequest, `\`locale\` must be one of ${listFmt.format(Object.keys(locales))}`)
	}

	const lorem = await locales[locale as Locale]()

	const results = lorem.text(params)

	return Response.json({ text: results })
})

const formDefaults = {
	locale: 'am',
	sentences: fmtRange(defaultFormOptions.sentencesPerParagraph),
	paragraphs: fmtRange(defaultFormOptions.paragraphs),
	headings: String(defaultFormOptions.headingDensity),
	perSentence: fmtRange(defaultFormOptions.targetWordsPerSentence),
	perHeading: fmtRange(defaultFormOptions.targetWordsPerHeading),
}

function jsonOrHtml(fn: (req: Request) => Response | Promise<Response>) {
	return async (req: Request): Promise<Response> => {
		const { searchParams } = new URL(req.url)
		const override = searchParams.get('format')
		const accept = accepts(req, 'application/json', 'text/html')
		const res = await fn(req)
		const ct = accepts(res, 'application/json', 'text/html')

		const rerenderAsHtml = isRedirectStatus(res.status) || override === 'json'
			? false
			: override === 'html'
			? true
			: (accept === 'text/html' && ct === 'application/json')

		if (rerenderAsHtml) {
			try {
				const form = {
					locale: searchParams.get('locale') ?? formDefaults.locale,
					sentences: searchParams.get('sentences') ?? formDefaults.sentences,
					paragraphs: searchParams.get('paragraphs') ?? formDefaults.paragraphs,
					headings: searchParams.get('headings') ?? formDefaults.headings,
					perSentence: searchParams.get('per-sentence') ?? formDefaults.perSentence,
					perHeading: searchParams.get('per-heading') ?? formDefaults.perHeading,
				}

				const results = await res.clone().json()

				const loremHtml = loremToHtml(results.text)

				const l = Object.keys(locales).map((x) => {
					return {
						value: x,
						name: languageNames.of(x),
						selected: form.locale === x,
					}
				})

				const content = populateTemplate(await Deno.readTextFile('./demo/routes/playground.md'), {
					results: JSON.stringify(results, null, '\t'),
					locales: l,
					form,
					loremHtml,
					formDefaults: JSON.stringify(formDefaults),
					dir: new Intl.Locale(form.locale).getTextInfo().direction,
					className: isVerticalLr(form.locale) ? 'vertical-lr' : '',
				})

				const main = await marked.parse(content)
				const html = await populateLayout(req, { title: 'Playground', main })

				return new Response(html, {
					headers: {
						'content-type': contentType('html'),
					},
				})
			} catch (e) {
				console.error(e)
			}
		}

		return res
	}
}

function fmtRange(range: number | { min: number; max: number } | null) {
	if (!range) return '-'

	return typeof range === 'number'
		? String(range)
		: range.min === range.max
		? String(range.min)
		: `${range.min}-${range.max}`
}

function parseRange(range: string | null) {
	if (!range) return null

	if (!/\D/.test(range)) return Number(range)

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

function loremToHtml(text: TextContents) {
	return text.map((x) => {
		switch (x.kind) {
			case 'heading':
				return `<h2>${escape(x.text)}</h2>`
			case 'paragraph':
				return `<p>${escape(x.sentences.join(''))}</p>`
		}
	}).join('\n')
}
