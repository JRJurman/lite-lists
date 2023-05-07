define`
	<drag-container>
		<style>
			svg {
				position: absolute;
				cursor: move;
				top: 20px;
				left: 20px;
			}

			div {
				padding-top: 1em;
			}
		</style>
		<div onmousedown="startDraggableContainer(this, event)">
			<slot>
		</div>
	</drag-container>
`;

function startDraggableContainer(draggableDiv, event) {
	console.log('starting');
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
