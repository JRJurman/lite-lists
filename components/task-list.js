define`
	<task-list width="212px">
		<style>
			h2 {
				margin: 0;

				/* push this closer to the ul */
				margin-bottom: -7px;
    		margin-top: 7px;

				font-weight: inherit;

				display: grid;
				align-items: center;
				grid-template-columns: 1fr 0.75em 0.75em;
			}

			button {
				background: none;
				border: none;
				color: ${'color'};
				font-size: 1em;
				padding: 0;

				width: 0.75em;
				height: 0.75em;
			}

			material-icon {
				display: block;
				height: 100%;
				width: 100%;
			}

			color-picker {
				width: 0.75em;
				height: 0.75em;

				display: flex;
				justify-content: center;
				align-items: center;
			}

			input[type="text"] {
				font-family: inherit;
				font-weight: inherit;
				color: ${'color'};
				border: none;
				outline: 0;
				background: none;
				font-size: 1em;
				min-width: 212px;
				width: ${'width'};
			}

			input[type="text"]::placeholder {
				color: inherit;
				opacity: 0.5;
			}

			ul {
				margin: 0;
				padding: 0;
				border-right: solid 2px ${'color'};
				border-top: solid 2px ${'color'};
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}

			task-item {
				width: 100%;
			}
		</style>

		<div>
			<h2>
				<input type="text" placeholder="New List" value=${'title'} onkeyup="updateTaskListTitle(this, event)" size="10">
				<button aria-label="remove task list" onclick="removeTaskList(this)">
					<material-icon icon="close" weight="100"></material-icon>
				</button>
				<color-picker color=${'color'}></color-picker>
			</h2>
			<ul>
				<task-item color=${'color'} placeholder="First Thing..."></task-item>
				<task-item color=${'color'} placeholder="and..."></task-item>
			</ul>
		</div>

		<script>
			initTaskList(this)
		</script>
	</task-list>
`;

function initTaskList(taskList) {
	taskList.addEventListener('color-changed', (event) => {
		const newColor = event.detail.color;
		taskList.setAttribute('color', newColor);

		// update all child elements with the new color
		[...taskList.shadowRoot.querySelectorAll('task-item')].forEach((taskItem) => {
			taskItem.setAttribute('color', newColor);
		});
	});

	// build and add all the options to put as default values in the color input
	const hexColors = getAllHexColors();

	// always start by picking one of these colors at random
	const randomColor = hexColors[Math.floor(Math.random() * hexColors.length)];
	taskList.setAttribute('color', randomColor);
}

function updateTaskListTitle(input, event) {
	const taskList = input.getRootNode().host;
	const newTitle = event.target.value;
	taskList.setAttribute('title', newTitle);

	// resize input based on value
	const newInputSize = calcInputWidth(input);
	taskList.setAttribute('width', `${newInputSize}px`);

	triggerSave(input);
}

function removeTaskList(button) {
	const taskList = button.getRootNode().host;
	const dragContainer = taskList.parentElement;
	const canvas = dragContainer.parentElement;

	// we have to remove the drag-container above us
	dragContainer.remove();

	// trigger the update from the canvas element
	triggerSave(canvas);
}

function getTextWidth(input) {
	// get the font details from the input element
	const fontStyle = window.getComputedStyle(input, null).getPropertyValue('font');
	const text = input.value;

	// create a canvas element (we'll use this to measure the text)
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	// copy the font from the input
	context.font = fontStyle;

	const metrics = context.measureText(text);
	return metrics.width;
}

function calcInputWidth(input) {
	// determine how wide the input should be, lined up with the grid
	const backgroundGridSize = 33.6;

	// look at our font, and get the text size
	const fontSize = window.getComputedStyle(input, null).getPropertyValue('font-size');
	const fontSizeInt = parseInt(fontSize);

	const textWidth = getTextWidth(input);
	const textWidthWithPadding = textWidth + fontSizeInt * 1;

	const inputBaseSize = window.getComputedStyle(input, null).getPropertyValue('min-width');
	const inputBaseSizeInt = parseInt(inputBaseSize.split('px')[0]);

	const textWidthWithPaddingInGrid =
		Math.ceil((textWidthWithPadding - inputBaseSizeInt) / backgroundGridSize) * backgroundGridSize + inputBaseSizeInt;

	return textWidthWithPaddingInGrid;
}
