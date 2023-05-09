define`
	<task-item placeholder="and...">
		<style>
			div {
				display: flex;
				align-items: center;
			}

			input {
				font-family: inherit;
				color: ${'color'};
				border: none;
				border-bottom: solid 2px;
				border-bottom-color: ${'color'};
				outline: 0;
				background: none;
				font-size: 1em;
				margin-left: 0.25em;
			}

			double-checkbox {
				font-size: 1.4em;
				width: 1em;
				height: 1em;
			}
		</style>
		<div>
			<double-checkbox color=${'color'}></double-checkbox>
			<input name="task-item" autocomplete="off" onkeyup="taskItemHandleKeyUp(this, event)" placeholder=${'placeholder'}>
		</div>
	</task-item>
`;

function taskItemHandleKeyUp(input, event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		addNewTaskItem(input);
	}
	if (event.key === 'ArrowUp') {
		event.preventDefault();
		moveFocusPreviousToSibling(input);
	}
	if (event.key === 'ArrowDown') {
		event.preventDefault();
		moveFocusNextToSibling(input);
	}
	if (event.key === 'Backspace') {
		if (input.selectionStart === 0) {
			removeTaskItem(input);
		}
	}
}

function addNewTaskItem(input) {
	const taskItem = input.getRootNode().host;
	const nextItem = html`<task-item color="${taskItem.getAttribute('color')}"></task-item>`;
	taskItem.insertAdjacentElement('afterend', nextItem);
	moveFocusNextToSibling(input);
}

function moveFocusPreviousToSibling(input) {
	const prevElement = input.getRootNode().host.previousElementSibling;
	if (prevElement) {
		prevElement.shadowRoot.querySelector('input').focus();
	}
}

function moveFocusNextToSibling(input) {
	const nextElement = input.getRootNode().host.nextElementSibling;
	if (nextElement) {
		nextElement.shadowRoot.querySelector('input').focus();
	}
}

function removeTaskItem(input) {
	const prevElement = input.getRootNode().host.previousElementSibling;
	// don't delete if we don't have a previous element
	if (prevElement) {
		moveFocusPreviousToSibling(input);
		input.getRootNode().host.remove();
	}
}
