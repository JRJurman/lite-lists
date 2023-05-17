define`
	<task-item placeholder="and..." width="191px">
		<style>
			div {
				display: flex;
				flex-direction: row-reverse;
				align-items: center;
			}

			input[type="text"] {
				flex-grow: 1;
				font-family: inherit;
				font-weight: inherit;
				color: ${'color'};
				border: none;
				outline: 0;
				background: none;
				font-size: 1em;
				margin-left: 0.25em;
				min-width: 191px;
				width: ${'width'}
			}

			input[type="text"]::placeholder {
				color: inherit;
				opacity: 0.5;
			}

			double-checkbox {
				font-size: 1.4em;
				width: 1em;
				height: 1em;
			}
		</style>
		<div>
			<input type="text" name="task-item" autocomplete="off"
							onkeyup="taskItemHandleKeyUp(this, event)"
							placeholder=${'placeholder'} value="${'task'}">
			<double-checkbox color=${'color'}></double-checkbox>
		</div>
	</task-item>
`;

function taskItemHandleKeyUp(input, event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		addNewTaskItem(input);
	} else if (event.key === 'ArrowUp') {
		event.preventDefault();
		moveFocusPreviousToSibling(input);
	} else if (event.key === 'ArrowDown') {
		event.preventDefault();
		moveFocusNextToSibling(input);
	} else {
		// update task text
		if (event.key === 'Backspace') {
			if (input.selectionStart === 0 && event.target.value === '') {
				removeTaskItem(input);
			}
		}

		const taskItem = input.getRootNode().host;
		taskItem.setAttribute('task', event.target.value);

		// resize input based on value
		const newInputSize = calcInputWidth(input);
		taskItem.setAttribute('width', `${newInputSize}px`);

		triggerSave(taskItem);
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
	const nextElement = input.getRootNode().host.nextElementSibling;
	// don't delete if we don't have a previous or next element
	if (prevElement) {
		moveFocusPreviousToSibling(input);
		input.getRootNode().host.remove();
	} else if (nextElement) {
		moveFocusNextToSibling(input);
		input.getRootNode().host.remove();
	}
}
