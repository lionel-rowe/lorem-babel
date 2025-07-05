import { regExpEscape } from '@li/regexp-escape-polyfill'

// https://www.omniglot.com/writing/osage.htm
const latn =
	`Iciko tąka wį aðe apa—kaxa kši aðe apa, opxa. wec’a wį iðape. wac’a akxa “Kotaha maðį,” akxa. Iciko tąka apa, “ðie ðie kotaha maðį winąsta tə̨ mįkše,” Iciko tąka aoa ekie apa. wec’a apa, “Ąðanąsta aha wibraɣtake tə̨ mikše.” Iciko tąka apa, “Ąðaɣtake etą apa tą nąstape.” wanąstape aha ðe, wec’a apa ðaɣtakape siðece. ðaɣtakape aha, Iciko tąka apa aðape tą, žą į eci ce eci siðįkape. Lį akɣa tą, si ce broka ipa akɣa. Iciko tąka akɣa, “Oo ąšį wali mįkše!” akɣa. Lį šǫ akɣa c’e hįkše apa tą c’ape iciko tąka apa. Broka žuika broka ipape tą c’ape.`
		.replaceAll(/[“”]/g, '')

// https://en.wikipedia.org/wiki/Osage_script
const mapping: Record<string, string[]> = {
	'𐒰': ['A'],
	'𐒱': ['Ai'],
	'𐒳': ['Ə'],
	'𐒷': ['E'],
	'𐒻': ['I'],
	'𐓂': ['O'],
	'𐓎': ['U'],
	'𐒰͘': ['Ą'],
	'𐒲': ['Aį'],
	'𐒳͘': ['Ə̨'],
	'𐒸': ['Eį'],
	'𐒻͘': ['Į'],
	'𐓂͘': ['Ǫ'],
	'𐓃': ['Oį'],
	'𐒴': ['Br'],
	'𐒵': ['Č'],
	'𐒹': ['H'],
	'𐒺': ['Hy'],
	'𐒼': ['K'],
	'𐒾': ['Ky'],
	'𐒿': ['L'],
	'𐓀': ['M'],
	'𐓁': ['N'],
	'𐓄': ['P'],
	'𐓆': ['S'],
	'𐓇': ['Š'],
	'𐓈': ['T'],
	'𐓊': ['C', 'Ts'],
	'𐓍': ['Ð'],
	'𐓏': ['W'],
	'𐓐': ['X'],
	'𐓑': ['Ɣ', 'gh'],
	'𐓒': ['Z'],
	'𐓓': ['Ž'],
	'𐒼ʼ': ['Kʼ'],
	'𐓄ʼ': ['Pʼ'],
	'𐓊ʼ': ['Cʼ'],
	'𐒼𐓐': ['Kx'],
	'𐒼𐓇': ['Kš'],
	'𐓄𐓐': ['Px'],
	'𐓄𐓇': ['Pš'],
	'𐓈𐓐': ['Tx'],
	'𐓌': ['Ch'],
	'𐒶': ['Hč'],
	'𐒽': ['Hk'],
	'𐓅': ['Hp'],
	'𐓉': ['Ht'],
	'𐓋': ['Hc'],
}

const reverseMapping: Record<string, string> = Object.fromEntries(
	Object.entries(mapping).flatMap(([k, v]) => v.map((x) => [x.toLowerCase(), k.toLowerCase()])),
)

const regex = new RegExp(
	`(${Object.keys(reverseMapping).sort((a, b) => b.length - a.length).map((x) => `(${regExpEscape(x)})`).join('|')})`,
	'gi',
)

const out = latn.replaceAll(regex, (match, ...args) => {
	const index = args.findIndex((x) => x != null)

	if (index === -1) return match // No match found, return original

	const isUpper = match[0] === match[0].toUpperCase() // Check if the match is uppercase

	const char = reverseMapping[args[index].toLowerCase()] ?? match

	return isUpper ? char.toUpperCase() : char.toLowerCase()
})

const unconverted = out.match(/\p{scx=Latn}/gu)

if (unconverted) {
	throw new Error(`Unconverted characters found: ${unconverted.join(', ')}`)
}

console.info(out)
