# Playground

<form action="" method="get" data-defaults="{{formDefaults}}">
	<div class="generate-form">
		<label class="locales-list-label">
			<input name="locale" type="text" list="locales" value={{form.locale}} spellcheck="false">
			<datalist id="locales">
				{{#locales}}
					<option value={{value}}>{{name}}</option>
				{{/locales}}
			</datalist>
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
</form>

<div class="lorem-text {{className}}" dir={{dir}} translate="no">
{{{loremHtml}}}
</div>

<script type="module" src="/static/playground.mjs"></script>
