import { parse } from '@std/jsonc'
import { basename, join } from '@std/path'

const inDir = './src/configs'
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

denoDotJsonc.exports = {
	...denoDotJsonc.exports,
	...exportsObj,
}

const exportMap = Object.entries(exportsObj)
	.map(([k, v]) => `${JSON.stringify(basename(k))}: () => import(${JSON.stringify(v.replace('./src/', './'))}),`)
	.join('\n')

await Deno.writeTextFile(denoDotJsoncPath, JSON.stringify(denoDotJsonc, null, '\t') + '\n')

const localesTs = `import type { LoremBabelConfig } from './lorem.ts'
import type { Locale } from './types.ts'

export const locales: Record<Locale, () => Promise<{ default: LoremBabelConfig }>> = {${exportMap}} satisfies Record<string, () => Promise<{ default: LoremBabelConfig }>>\n`

await Deno.writeTextFile(localesTsPath, localesTs)

await new Deno.Command('deno', {
	args: ['fmt', localesTsPath],
}).spawn().output()
