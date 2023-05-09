define`
	<color-picker>
		<style>
			input[type=color] {
				width: 20px;
				height: 20px;
				border-radius: 50%;
				overflow: hidden;
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
			initColorPicker(this)
		</script>
	</color-picker>
`;

function initColorPicker(colorPicker) {
	const colors = [
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
	];

	// need to convert css variables to hex values to be usable in color input
	function getCssVarValue(varName, element = document.documentElement) {
		const computedStyle = getComputedStyle(element);
		return computedStyle.getPropertyValue(varName).trim();
	}

	const hexColors = colors.map((color) => getCssVarValue(`--${color}-5`));

	// build and add all the options to put as default values in the color input
	const colorPickerDataList = colorPicker.shadowRoot.querySelector('datalist');
	hexColors.forEach((hexcolor) => {
		colorPickerDataList.appendChild(html`<option value="${hexcolor}"></option>`);
	});

	// if we don't have a default color, pick one of these at random
	if (colorPicker.getAttribute('color') === '') {
		const randomColor = hexColors[Math.floor(Math.random() * hexColors.length)];
		dispatchColorChangedEvent(colorPicker, randomColor);
	}
}

function emitColorChangeEvent(input, event) {
	const colorPicker = input.getRootNode().host;
	console.log('emitting color changed event!');
	dispatchColorChangedEvent(colorPicker, event.target.value);
}

function dispatchColorChangedEvent(colorPicker, color) {
	colorPicker.dispatchEvent(new CustomEvent('color-changed', { bubbles: true, composed: true, detail: { color } }));
}
