define`
	<task-list-canvas>
		<style>
			div {
				width: 100vw;
				height: 100vh;
				text-align: center;
			}
			span {
				display: block;
				padding-top: 2em;
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

	// mouse double click event
	taskListCanvas.addEventListener('dblclick', (event) => {
		// make sure the double click is happening on the canvas,
		// and not some other element like the checkbox or inputs
		const clickTarget = event.composedPath()[0];
		if (clickTarget !== divContainer) {
			return;
		}

		removeHelperText(taskListCanvas);
		createNewTaskList({ x: event.clientX, y: event.clientY });
	});

	// touch device double tap event
	taskListCanvas.addEventListener('touchstart', (event) => {
		const clickTarget = event.composedPath()[0];
		if (clickTarget !== divContainer) {
			return;
		}

		// if we already triggered a touchstart on this element, create a new list
		// otherwise, wait to see if a double tap happens
		if (taskListCanvas.getAttribute('touchstart') === '1') {
			event.preventDefault();
			removeHelperText(taskListCanvas);
			createNewTaskList({ x: event.targetTouches[0].clientX, y: event.targetTouches[0].clientY });
			taskListCanvas.setAttribute('touchstart', '0');
		} else {
			taskListCanvas.setAttribute('touchstart', '1');
			setTimeout(() => {
				taskListCanvas.setAttribute('touchstart', '0');
			}, 300);
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

	triggerSave(divContainer);
}

function removeHelperText(taskListCanvas) {
	const helperText = taskListCanvas.shadowRoot.querySelector('span');
	if (helperText) {
		helperText.remove();
	}
}
