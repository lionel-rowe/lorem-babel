type TextInfo = { direction: 'ltr' | 'rtl' }

declare global {
	namespace Intl {
		interface Locale {
			getTextInfo(): TextInfo
		}
	}
}

Intl.Locale.prototype.getTextInfo ??= function getTextInfo(this: Intl.Locale): TextInfo {
	// non-standard accessor property but has wider support
	// @ts-ignore type not included in TS
	if (this.textInfo != null) return this.textInfo

	const { script } = this.maximize()
	return { direction: script === 'Arab' || script === 'Hebr' ? 'rtl' : 'ltr' }
}
