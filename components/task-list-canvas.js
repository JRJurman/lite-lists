define`
	<task-list-canvas>
		<style>
			div {
				width: 100vw;
				height: 100vh;
			}
		</style>
		<div>
			<span>double click anywhere to create a new list</span>
		</div>
		<script>
			initTaskListCanvas(this)
		</script>
	</task-list-canvas>
`;

function initTaskListCanvas(taskListCanvas) {
	const divContainer = taskListCanvas.shadowRoot.querySelector('div');
	taskListCanvas.addEventListener('dblclick', (event) => {
		// make sure the double click is happening on the canvas,
		// and not some other element like the checkbox or inputs
		const clickTarget = event.composedPath()[0];
		if (clickTarget === divContainer) {
			removeHelperText(taskListCanvas);
			createNewTaskList({ x: event.clientX, y: event.clientY });
		}
	});
}

function createNewTaskList(position) {
	// get the div container from the window (so this function can be called anywhere)
	const divContainer = window.document.querySelector('task-list-canvas').shadowRoot.querySelector('div');

	// round x and y, but offset a little, to account for the rounding drift
	const [x, y] = roundXAndYToGrid(position.x - 50, position.y - 50);

	const newTaskList = html`
		<drag-container x="${x}" y="${y}">
			<task-list></task-list>
		</drag-container>
	`;
	divContainer.appendChild(newTaskList);
}

function removeHelperText(taskListCanvas) {
	const helperText = taskListCanvas.shadowRoot.querySelector('span');
	if (helperText) {
		helperText.remove();
	}
}
