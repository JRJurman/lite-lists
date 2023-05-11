define`
	<task-list-canvas>
		<style>
			div {
				width: 100vw;
				height: 100vh;
			}
		</style>
		<div>
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
			createNewTaskList({ x: event.clientX, y: event.clientY });
		}
	});
}

function createNewTaskList(position) {
	// get the div container from the window (so this function can be called anywhere)
	const divContainer = window.document.querySelector('task-list-canvas').shadowRoot.querySelector('div');

	const newTaskList = html`
		<drag-container x="${position.x}" y="${position.y}">
			<task-list></task-list>
		</drag-container>
	`;
	divContainer.appendChild(newTaskList);
}
