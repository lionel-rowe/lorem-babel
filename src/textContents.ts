type Paragraph = {
	kind: 'paragraph'
	sentences: string[]
}
type Heading = {
	kind: 'heading'
	text: string
}
type Section = Paragraph | Heading

/**
 * Text contents, an array of {@linkcode Section}s ({@linkcode Paragraph}s and/or {@linkcode Heading}s).
 */
export class TextContents extends Array<Section> {
	override toString(): string {
		return this.map((section) => {
			switch (section.kind) {
				case 'paragraph':
					return section.sentences.join('')
				case 'heading':
					return section.text
			}
		}).join('\n\n')
	}
}
