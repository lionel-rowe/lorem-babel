// @ts-check

const $form = /** @type {HTMLFormElement } */ (document.querySelector('.generate-form')?.closest('form'))
const $reset = /** @type {HTMLButtonElement } */ ($form.querySelector('button[type=reset]'))

const formDefaults = JSON.parse($form.dataset.defaults ?? '')
const inputSel = /** @type {'input'} */ ('input, select, textarea')

$form.addEventListener('submit', () => {
	for (const input of $form.querySelectorAll(inputSel)) {
		const defaultValue = formDefaults[input.name.replaceAll(/-(\w)/g, (_, c) => c.toUpperCase())]
		if (input.value === defaultValue || (input.name === 'format' && input.value === '')) {
			input.removeAttribute('name')
		}
	}
})

$reset.addEventListener('click', (e) => {
	e.preventDefault()
	location.href = Object.assign(new URL(location.href), { search: '' }).href
})

const $localeInput = /** @type {HTMLInputElement } */ ($form.querySelector('input[name=locale]'))

/** @param {string} value */
function getSelectedLocaleOption(value) {
	return /** @type {HTMLOptionElement } */ (document.querySelector(`#locales option[value="${value}"]`))
}

/** @param {HTMLOptionElement} option */
function getSelectedLocaleData(option) {
	return {
		code: option ? option.value : '',
		name: option ? option.textContent : '',
	}
}

function getUpdatedLabel() {
	return `${selectedLocale.name} (${selectedLocale.code})`
}

function updateLocaleLabel() {
	const $label = /** @type {HTMLLabelElement } */ ($localeInput.closest('label'))
	const label = getUpdatedLabel()
	$label.dataset.selectedName = label
	$localeInput.setAttribute('aria-label', label)
}

let selectedLocale = getSelectedLocaleData(getSelectedLocaleOption($localeInput.value))
updateLocaleLabel()

$localeInput.addEventListener('input', function () {
	this.classList.add('focused')
})
$localeInput.addEventListener('change', function () {
	const { value } = this
	const option = getSelectedLocaleOption(value)
	if (option) {
		selectedLocale = getSelectedLocaleData(option)
		updateLocaleLabel()
		this.value = selectedLocale.code
	}
	this.classList.remove('focused')
})
$localeInput.addEventListener('focus', function () {
	this.value = ''
})
$localeInput.addEventListener('blur', function () {
	updateLocaleLabel()
	this.value = selectedLocale.code
	this.classList.remove('focused')
})
