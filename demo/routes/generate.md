# Playground

<form action="" method="get">
	<div class="generate-form">
		<label>
			Locale
			<select name="locale">
				{{#locales}}
					<option value={{value}} {{#selected}}selected{{/selected}}>{{name}}</option>
				{{/locales}}
			</select>
		</label>
		<label>
			Paragraphs
			<input name="paragraphs" type="text" pattern="\d+-\d+|\d+" value="{{form.paragraphs}}">
		</label>
		<label>
			Sentences
			<input name="sentences" type="text" pattern="\d+-\d+|\d+" value="{{form.sentences}}">
		</label>
		<label>
			Heading density
			<input name="headings" type="number" min="0" max="1" step="0.1" value="{{form.headings}}">
		</label>
		<label>
			Target words per sentence
			<input name="per-sentence" type="text" pattern="\d+-\d+|\d+|-?" value="{{form.perSentence}}">
		</label>
		<label>
			Target words per heading
			<input name="per-heading" type="text" pattern="\d+-\d+|\d+|-?" value="{{form.perHeading}}">
		</label>
		<label>
			Format
			<select name="format">
				<option value="">html</option>
				<option>json</option>
			</select>
		</label>
	</div>
	<div>
		<button type="submit">Generate</button>
		<button type="reset">Reset</button>
	</div>
	<script data-form-defaults="{{formDefaults}}">
		if (window.location.href.endsWith('?')) {
			history.replaceState({}, '', window.location.href.slice(0, -1))
		}
		const $currentScript = document.currentScript
		const $form = $currentScript.closest('form')
		const formDefaults = JSON.parse($currentScript.dataset.formDefaults)
		$form.addEventListener('submit', () => {
			for (const $input of $form.querySelectorAll('input, select')) {
				const defaultValue = formDefaults[$input.name.replaceAll(/-(\w)/g, (_, c) => c.toUpperCase())]
				if ($input.value === defaultValue || ($input.name === 'format' && $input.value === '')) {
					$input.removeAttribute('name')
				}
			}
		})
		$form.querySelector('button[type=reset]').addEventListener('click', (e) => {
			e.preventDefault()
			window.location.search = ''
		})
	</script>
</form>

<div class="lorem-text" dir={{dir}} translate="no">
{{{loremHtml}}}
</div>
