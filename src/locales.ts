import type { LoremBabelConfig } from './lorem.ts'
import type { Locale } from './types.ts'

export const locales: Record<Locale, () => Promise<{ default: LoremBabelConfig }>> = {
	'ar': () => import('./configs/ar.ts'),
	'cs': () => import('./configs/cs.ts'),
	'de': () => import('./configs/de.ts'),
	'el': () => import('./configs/el.ts'),
	'en': () => import('./configs/en.ts'),
	'es': () => import('./configs/es.ts'),
	'got': () => import('./configs/got.ts'),
	'ja': () => import('./configs/ja.ts'),
	'ko': () => import('./configs/ko.ts'),
	'lorem': () => import('./configs/lorem.ts'),
	'ru': () => import('./configs/ru.ts'),
	'th': () => import('./configs/th.ts'),
	'tr': () => import('./configs/tr.ts'),
	'vi': () => import('./configs/vi.ts'),
	'zh': () => import('./configs/zh.ts'),
} satisfies Record<string, () => Promise<{ default: LoremBabelConfig }>>
