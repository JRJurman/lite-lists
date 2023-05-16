define`
	<local-storage-provider>
		<slot />
		<script>
			initLocalStorageProvider(this);
		</script>
	</local-storage-provider>
`;

function initLocalStorageProvider(localStorageProvider) {
	localStorageProvider.addEventListener('trigger-save', writeCurrentStateToLocalStorage);
	// delay loading by 100ms, just to give everything a moment to load
	setTimeout(() => {
		try {
			loadLocalstorageState();
			sessionStorage.setItem('hasReloaded', 'false');
		} catch (error) {
			// if we fail, do a page reload (but only do this once)
			if (sessionStorage.getItem('hasReloaded') !== 'true') {
				sessionStorage.setItem('hasReloaded', 'true');
				window.location.reload();
			} else {
				console.error(error);
			}
		}
	}, 100);
}

function triggerSave(sourceElement) {
	sourceElement.dispatchEvent(new CustomEvent('trigger-save', { bubbles: true, composed: true }));
}

function writeCurrentStateToLocalStorage() {
	// get all drag containers (these have the location)
	const dragContainers = queryAllDOM('drag-container');

	const taskLists = dragContainers.map((dragContainer) => {
		// get the x and y position
		const x = dragContainer.getAttribute('x');
		const y = dragContainer.getAttribute('y');

		// get the task-list for this container (this will have the title and color)
		const [taskList] = queryAllDOM('task-list', dragContainer);
		// get the title
		const title = taskList.getAttribute('title');
		const size = taskList.getAttribute('size');
		const color = taskList.getAttribute('color');

		// get each task-item in the task-list
		const taskItems = queryAllDOM('task-item', dragContainer);

		const tasks = taskItems.map((taskItem) => {
			const label = taskItem.getAttribute('task');

			const [checkbox] = queryAllDOM('double-checkbox', taskItem.shadowRoot);
			const state = checkbox.getAttribute('state');
			const size = taskItem.getAttribute('size');
			return { label, state, size };
		});

		return { x, y, color, title, size, tasks };
	});

	const currentState = JSON.stringify(taskLists);
	localStorage.setItem('lite-list-state', currentState);
}

function loadLocalstorageState() {
	const currentStateString = localStorage.getItem('lite-list-state');
	const currentState = JSON.parse(currentStateString);

	currentState.forEach(({ x, y, color, title, size, tasks }) => {
		// grab the div container for drag-containers
		const divContainer = window.document.querySelector('task-list-canvas').shadowRoot.querySelector('div');

		const newTaskList = html`
			<drag-container x="${x}" y="${y}">
				<task-list title="${title}" size="${size}"></task-list>
			</drag-container>
		`;

		divContainer.appendChild(newTaskList);

		// set the color
		const [taskList] = queryAllDOM('task-list', newTaskList);
		taskList.setAttribute('color', color);

		// remove the default tasks, and inject the saved ones
		const [taskItemList] = queryAllDOM('ul', taskList);
		[...taskItemList.children].forEach((oldTask) => oldTask.remove());
		tasks.forEach((newTask) => {
			const newTaskItem = html`<task-item
				task="${newTask.label}"
				color="${color}"
				size="${newTask.size || '20'}"
			></task-item>`;
			taskItemList.appendChild(newTaskItem);
			const [checkbox] = queryAllDOM('double-checkbox', newTaskItem);
			checkbox.setAttribute('state', newTask.state);
		});
	});

	if (currentState.length > 0) {
		// remove the helper text
		const [canvas] = queryAllDOM('task-list-canvas');
		removeHelperText(canvas);
	}
}
