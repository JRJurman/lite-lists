define`
	<task-list size="8">
		<style>
			h2 {
				margin: 0;

				/* push this closer to the ul */
				margin-bottom: -7px;
    		margin-top: 7px;

				min-width: calc(1.4em*6);
				font-weight: inherit;

				display: flex;
				justify-content: center;
				align-items: center;
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
				width: 100%;
				font-family: inherit;
				font-weight: inherit;
				color: ${'color'};
				border: none;
				outline: 0;
				background: none;
				font-size: 1em;
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
				<input type="text" placeholder="New List" value=${'title'} size=${'size'} onkeyup="updateTaskListTitle(this, event)">
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
	const newInputSize = Math.max(8, 8 + Math.ceil((newTitle.length - 8) / 6) * 6);
	taskList.setAttribute('size', newInputSize);

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
