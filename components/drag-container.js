define`
	<drag-container>
		<style>
			svg {
				top: 20px;
				left: 20px;
			}

			div {
				position: absolute;
				padding-top: 1em;
				padding-bottom: 0.5em;
				cursor: move;
				border: 1px solid;
			}
		</style>
		<div onmousedown="startDraggableContainer(this, event)">
			<slot>
		</div>
	</drag-container>
`;

function startDraggableContainer(draggableDiv, event) {
	const offsetX = event.clientX - draggableDiv.getBoundingClientRect().left;
	const offsetY = event.clientY - draggableDiv.getBoundingClientRect().top;

	const mouseMoveHandler = (e) => {
		draggableDiv.style.left = `${e.clientX - offsetX}px`;
		draggableDiv.style.top = `${e.clientY - offsetY}px`;
	};

	const mouseUpHandler = () => {
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
}
