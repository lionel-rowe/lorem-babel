const LOCALE = 'en-US'

export const SITE_TITLE = 'Lorem Babel'
export const BASE_URL = 'https://lorem-babel.deno.dev/'
export const listFmt = new Intl.ListFormat(LOCALE, { type: 'disjunction' })

class LanguageNames extends Intl.DisplayNames {
	constructor(locale: Intl.LocalesArgument) {
		super(locale, { type: 'language' })
	}

	#overrides = new Map<string, string>(Object.entries({
		lorem: 'Lorem Ipsum',
		got: 'Gothic',
		osa: 'Osage',
	}))

	override of(locale: string): string {
		return this.#overrides.get(locale) ?? super.of(locale) ?? locale
	}
}

export const languageNames = new LanguageNames(LOCALE)
