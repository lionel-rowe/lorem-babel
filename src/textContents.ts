export class TextContents extends Array {
	#sentenceSeparator!: string

	static fromParts(textParts: string[][], sentenceSeparator: string): TextContents {
		const p = new this(...textParts)
		p.#sentenceSeparator = sentenceSeparator
		return p
	}

	private constructor(...textParts: string[][]) {
		// @ts-ignore Argument of type 'string[]' is not assignable to parameter of type 'number'.
		super(...textParts)
	}

	*paragraphs(): Generator<string, undefined, undefined> {
		for (const x of this) {
			yield x.join(this.#sentenceSeparator)
		}
	}

	*sentences(): Generator<string, undefined, undefined> {
		for (const x of this) {
			yield* x
		}
	}

	override toString(): string {
		return [...this.paragraphs()].join('\n\n')
	}
}
