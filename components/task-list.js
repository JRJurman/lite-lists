define`
	<task-list>
		<style>
		/*
			div {
				background: white;
			} */

			h2 {
				margin: 0;
				justify-content: space-between;
				width: calc(1.4em*6);
				align-items: baseline;
				font-weight: inherit;
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
			}
		</style>

		<div>
			<h2>
				<input type="text" placeholder="New List">
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
