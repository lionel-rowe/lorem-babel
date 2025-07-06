import { SITE_TITLE } from './config.ts'
// @ts-types="@types/mustache"
import Mustache from 'mustache'
import { toSentenceCase } from '@std/text/unstable-to-sentence-case'

export const templateUrl = new URL(import.meta.resolve('../README.md'))

function lookupPartial(name: string) {
	return Deno.readTextFileSync(new URL(`${name}.md`, import.meta.resolve('../demo/partials/')))
}

export function populateTemplate(template: string, values: object): string {
	const proxy = new Proxy(values, {
		get(target, prop, receiver) {
			if (!Reflect.has(target, prop)) throw new Error(`Missing value for key: ${String(prop)}`)
			return Reflect.get(target, prop, receiver)
		},
	})

	return Mustache.render(template, proxy, lookupPartial)
}

function makeBreadcrumbs(url: URL) {
	const segments = ['Home', ...url.pathname.split('/').filter(Boolean)]
	return segments.map((part, idx) => {
		part = toSentenceCase(part)
		if (idx === segments.length - 1) return { href: null, part }

		const href = '/' + segments.slice(1, idx + 1).join('/')
		return { href, part }
	})
}

export async function populateLayout(
	req: Request,
	{ title, main }: { title: string | null; main: string },
): Promise<string> {
	const url = new URL(req.url)
	const breadcrumbs = makeBreadcrumbs(url)

	return populateTemplate(
		await Deno.readTextFile('./demo/routes/_layout.html'),
		{ title: title == null ? SITE_TITLE : `${title} · ${SITE_TITLE}`, main, breadcrumbs },
	)
}

export async function populateReadme(props: { baseUrl: string }) {
	return populateTemplate(await Deno.readTextFile(templateUrl), {}).replaceAll(
		/\bhttps:\/\/lorem-babel\.deno\.dev\b(\/)?/g,
		`${props.baseUrl}$1`,
	)
}
