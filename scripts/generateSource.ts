import { HttpSaver } from '@li/http-saver'

using _ = new HttpSaver().stubFetch()

const length = 50
const keys = Array.from({ length }, (_, i) => String(i))
const properties = Object.fromEntries(keys.map((k) => [k, { type: 'string' }]))

const response_format = {
	type: 'json_schema',
	json_schema: {
		name: 'paragraphs',
		strict: true,
		schema: {
			type: 'object',
			properties,
			required: keys,
			additionalProperties: false,
			$schema: 'http://json-schema.org/draft-07/schema#',
		},
	},
}

const dn = new Intl.DisplayNames('en', { type: 'language' })
const locale = 'en'
const languageName = (dn.of(locale) ?? locale) as 'English'

const requestBody = {
	model: 'gpt-4.1-mini',

	messages: [{
		role: 'user',
		content:
			`Give me ${length} paragraphs of meaningless placeholder text in the ${languageName} language. It must be ${languageName}, NOT latin-esque lorem ipsum or similar. Each paragraph should be quite long, containing at least four to seven sentences.`,
	}],
	response_format,
}

const res = await fetch('https://api.openai.com/v1/chat/completions', {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
	},
	body: JSON.stringify(requestBody),
})

const data = await res.json()

console.info(Array.from({ ...JSON.parse(data.choices[0].message.content), length }).join('\n\n').trim())
