/** An abstract section, representing an array of sentences */
abstract class Section extends Array<string> {}

/**
 * A paragraph, containing an array of sentences.
 */
export class Paragraph extends Section {
	static override from(items: ArrayLike<string> | Iterable<string>): Paragraph
	static override from<T>(items: ArrayLike<T> | Iterable<T>, mapfn: (v: T, k: number) => string): Paragraph
	// deno-lint-ignore no-explicit-any
	static override from(...args: [any, any?]) {
		return super.from(...args)
	}
}

/**
 * A heading, containing an array of sentences.
 * For headings, the sentence array is always length 1.
 */
export class Heading extends Section {
	static override from(items: ArrayLike<string> | Iterable<string>): Heading
	static override from<T>(items: ArrayLike<T> | Iterable<T>, mapfn: (v: T, k: number) => string): Heading
	// deno-lint-ignore no-explicit-any
	static override from(...args: [any, any?]) {
		return super.from(...args)
	}
}

/**
 * Text contents, containing an array of {@linkcode Section}s ({@linkcode Paragraph}s and/or {@linkcode Heading}s).
 */
export class TextContents extends Array<Section> {
	static override from(items: ArrayLike<Section> | Iterable<Section>): TextContents
	static override from<T>(items: ArrayLike<T> | Iterable<T>, mapfn: (v: T, k: number) => Section): TextContents
	// deno-lint-ignore no-explicit-any
	static override from(...args: [any, any?]) {
		return super.from(...args)
	}

	/** Get an iterator of all sections as strings. */
	*sections(): Generator<string, undefined, undefined> {
		for (const x of this) yield x.join('')
	}

	/** Get an iterator of all paragraphs as strings. */
	*paragraphs(): Generator<string, undefined, undefined> {
		for (const x of this) {
			if (x instanceof Paragraph) yield x.join('')
		}
	}

	/** Get an iterator of all headings as strings. */
	*headings(): Generator<string, undefined, undefined> {
		for (const x of this) {
			if (x instanceof Heading) yield x.join('')
		}
	}

	/** Get an iterator of all sentences as strings. */
	*sentences(): Generator<string, undefined, undefined> {
		for (const x of this) {
			yield* x
		}
	}

	override toString(): string {
		return [...this.sections()].join('\n\n')
	}
}
