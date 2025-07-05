import { parse } from '@std/jsonc'
import { basename, join } from '@std/path'

const inDir = './src/locales'
const outPath = './locales'
const denoDotJsoncPath = './deno.jsonc'
const localesTsPath = './src/locales.ts'

const exportLocales = (await Array.fromAsync(Deno.readDir(inDir)))
	.filter((x) => x.isFile)
	.map((x) => x.name)
	.sort((a, b) => a.localeCompare(b))

const exportsObj = Object.fromEntries(
	exportLocales.map((k) => ['./' + join(outPath, k.split('.')[0]!), './' + join(inDir, k)]),
)

const denoDotJsonc = parse(await Deno.readTextFile(denoDotJsoncPath)) as {
	exports: Record<string, string>
}

denoDotJsonc.exports = Object.fromEntries(
	Object.entries({
		...denoDotJsonc.exports,
		...exportsObj,
	}).sort(([a], [b]) => a.localeCompare(b, 'und')),
)

const exportMap = Object.entries(exportsObj)
	.map(([k, v]) =>
		`${JSON.stringify(basename(k))}: () => import(${
			JSON.stringify(v.replace('./src/', './'))
		}, { with: { type: 'json' } }),`
	)
	.join('\n')

await Deno.writeTextFile(denoDotJsoncPath, JSON.stringify(denoDotJsonc, null, '\t') + '\n')

const localesTs = `
import { LoremBabel } from './lorem.ts'

/** All available locales */
export type Locale = keyof typeof configs

const configs = {${exportMap}}

/** A map of locale codes to functions that lazily import a \`LoremBabel\` instance for that locale. */
export const locales = Object.fromEntries(
	Object.entries(configs).map(([k, v]) => {
		const getLorem = async () => new LoremBabel((await v()).default)
		return [k, getLorem]
	}),
) as Record<Locale, () => Promise<LoremBabel>>
`.trimStart()

await Deno.writeTextFile(localesTsPath, localesTs)

await new Deno.Command('deno', {
	args: ['fmt', localesTsPath],
}).spawn().output()
