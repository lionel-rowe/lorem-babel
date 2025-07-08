export const LOCALE = 'en-US'

export const SITE_TITLE = 'Lorem Babel'
export const BASE_URL = 'https://lorem-babel.deno.dev/'
export const listFmt = new Intl.ListFormat(LOCALE, { type: 'disjunction' })

class LanguageNames extends Intl.DisplayNames {
	constructor(locale: Intl.LocalesArgument) {
		super(locale, { type: 'language' })
	}

	#overrides = new Map<string, string>(Object.entries({
		lorem: 'Lorem Ipsum',
		aa: 'Afar',
		ab: 'Abkhaz',
		ace: 'Acehnese',
		ach: 'Acholi dialect',
		alz: 'Alur',
		av: 'Avar',
		awa: 'Awadhi',
		ba: 'Bashkir',
		bal: 'Balochi',
		ban: 'Balinese',
		bbc: 'Toba Batak',
		bci: 'Baoulé',
		bem: 'Bemba',
		ber: 'Berber',
		bew: 'Betawi',
		bik: 'Bikol',
		bo: 'Lhasa Tibetan',
		bts: 'Batak Simalungun',
		btx: 'Batak Karo',
		bua: 'Buryat',
		ce: 'Chechen',
		cgg: 'Kiga',
		ch: 'Chamorro',
		chk: 'Chuukese',
		chm: 'Mari',
		cnh: 'Hakha Chin',
		crh: 'Crimean Tatar',
		crs: 'Seychellois Creole',
		cv: 'Chuvash',
		din: 'Dinka',
		dov: 'Tonga (Zambia and Zimbabwe)',
		dyu: 'Dyula',
		dz: 'Dzongkha',
		ff: 'Fula',
		fj: 'Fijian',
		fon: 'Fon',
		fur: 'Friulian',
		gaa: 'Ga',
		gom: 'Konkani',
		got: 'Gothic',
		gv: 'Manx',
		hil: 'Hiligaynon',
		hrx: 'Hunsrik',
		iba: 'Iban',
		iu: 'Inuktitut',
		jam: 'Jamaican Patois',
		kac: 'Jingpo',
		kek: 'Qʼeqchiʼ',
		kg: 'Kongo',
		kha: 'Khasi',
		kl: 'Greenlandic',
		kr: 'Kanuri',
		ktu: 'Kituba',
		kv: 'Komi',
		li: 'Limburgish',
		lij: 'Ligurian',
		lmo: 'Lombard',
		ltg: 'Latgalian',
		lua: 'Luba-Kasai',
		luo: 'Dholuo',
		mad: 'Madurese',
		mak: 'Makassarese',
		mam: 'Mam',
		mfe: 'Mauritian Creole',
		mh: 'Marshallese',
		min: 'Minangkabau',
		mwr: 'Marwari',
		new: 'Newar',
		nhe: 'Huasteca Nahuatl',
		nr: 'Southern Ndebele',
		nus: 'Nuer',
		os: 'Ossetian',
		osa: 'Osage',
		pag: 'Pangasinan',
		pam: 'Kapampangan',
		pap: 'Papiamento',
		rn: 'Kirundi',
		rom: 'Romani',
		sah: 'Yakut',
		sat: 'Santali',
		scn: 'Sicilian',
		se: 'Northern Sámi',
		sg: 'Sango',
		shn: 'Shan',
		ss: 'Swazi',
		sus: 'Susu',
		szl: 'Silesian',
		tcy: 'Tulu',
		tet: 'Tetum',
		tiv: 'Tiv',
		tpi: 'Tok Pisin',
		trp: 'Kokborok',
		tum: 'Tumbuka',
		ty: 'Tahitian',
		tyv: 'Tuvan',
		udm: 'Udmurt',
		ve: 'Venda',
		vec: 'Venetian',
		war: 'Waray',
		yua: 'Yucatec Maya',
		zap: 'Zapotec',
	}))

	override of(locale: string): string {
		return this.#overrides.get(locale) ?? super.of(locale) ?? locale
	}
}

export const languageNames = new LanguageNames(LOCALE)

const VERTICAL_LR_SCRIPTS = ['Mong'] as const
export function isVerticalLr(locale: string) {
	try {
		return (VERTICAL_LR_SCRIPTS as readonly string[]).includes(new Intl.Locale(locale).maximize().script ?? '')
	} catch {
		return false
	}
}
