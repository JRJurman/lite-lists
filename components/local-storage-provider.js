define`
	<local-storage-provider>
		<slot />
		<script>
			initLocalStorageProvider(this);
		</script>
	</local-storage-provider>
`;

function initLocalStorageProvider(localStorageProvider) {
	localStorageProvider.addEventListener('trigger-save', parseCurrentState);
}

function triggerSave(sourceElement) {
	sourceElement.dispatchEvent(new CustomEvent('trigger-save', { bubbles: true, composed: true }));
}

function parseCurrentState() {
	// get all drag containers (these have the location)
	const dragContainers = queryAllDOM('drag-container');

	dragContainers.forEach((dragContainer) => {
		// get the x and y position
		const x = dragContainer.getAttribute('x');
		const y = dragContainer.getAttribute('y');

		// get the task-list for this container (this will have the title and color)
		const [taskList] = queryAllDOM('task-list');
		// get the title
		const title = taskList.getAttribute('title');
		console.log({ x, y, title });
	});

	// get each task-item in the task-list
}
