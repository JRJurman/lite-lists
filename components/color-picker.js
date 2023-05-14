define`
	<color-picker color="#ffffff">
		<style>
			input[type=color] {
				width: 21px;
				height: 20px;
				border: none;
				border-radius: 50%;
				overflow: hidden;
				margin-left: -100%;
				position: absolute;
				right: 0;
				top: 3em;
			}

			input[type=color]::-webkit-color-swatch {
				border: none;
				border-radius: 50%;
				padding: 0;
			}

			input[type=color]::-webkit-color-swatch-wrapper {
				border: none;
				border-radius: 50%;
				padding: 0;
			}
		</style>
		<input
			type="color" list="listColors" id="colors"
			onchange="emitColorChangeEvent(this, event)" value=${'color'} />
		<datalist id="listColors">
		</datalist>
		<script>
			initColorPicker(this);
		</script>
	</color-picker>
`;

function initColorPicker(colorPicker) {
	// build and add all the options to put as default values in the color input
	const hexColors = getAllHexColors();

	const colorPickerDataList = colorPicker.shadowRoot.querySelector('datalist');
	hexColors.forEach((hexcolor) => {
		colorPickerDataList.appendChild(html`<option value="${hexcolor}"></option>`);
	});
}

function emitColorChangeEvent(input, event) {
	dispatchColorChangedEvent(input, event.target.value);
	triggerSave(input);
}

function dispatchColorChangedEvent(dispatchTarget, color) {
	dispatchTarget.dispatchEvent(new CustomEvent('color-changed', { bubbles: true, composed: true, detail: { color } }));
}

function getAllHexColors() {
	// set of open-props colors
	const colors = [
		'gray',
		'stone',
		'red',
		'pink',
		'purple',
		'violet',
		'indigo',
		'blue',
		'cyan',
		'teal',
		'green',
		'lime',
		'yellow',
		'orange',
		'choco',
		'brown',
		'sand',
		'camo',
		'jungle',
	];

	// need to convert css variables to hex values to be usable in color input
	function getCssVarValue(varName, element = document.documentElement) {
		const computedStyle = getComputedStyle(element);
		return computedStyle.getPropertyValue(varName).trim();
	}

	const hexColors = colors.map((color) => getCssVarValue(`--${color}-7`));
	return hexColors;
}
