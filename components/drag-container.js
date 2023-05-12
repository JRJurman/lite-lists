define`
	<drag-container x="20" y="20">
		<style>
			div {
				top: ${'y'}px;
				left: ${'x'}px;
				position: absolute;
				padding-top: 1em;
				padding-bottom: 0.5em;
				cursor: move;
			}
		</style>
		<div onmousedown="startDraggableContainer(this, event)">
			<slot>
		</div>
	</drag-container>
`;

function startDraggableContainer(draggableDiv, event) {
	// make sure the drag is happening on the div container,
	// and not some other element like the checkbox or inputs
	const clickTarget = event.composedPath()[0];
	if (clickTarget != draggableDiv) {
		return;
	}

	const offsetX = event.clientX - draggableDiv.getBoundingClientRect().left;
	const offsetY = event.clientY - draggableDiv.getBoundingClientRect().top;

	const dragContainer = draggableDiv.getRootNode().host;
	const mouseMoveHandler = (e) => {
		dragContainer.setAttribute('x', e.clientX - offsetX);
		dragContainer.setAttribute('y', e.clientY - offsetY);
	};

	const mouseUpHandler = () => {
		// snap to the nearest 1.4em -> 24px * 1.4em -> 33.6px
		const roundedX = Math.round(dragContainer.getAttribute('x') / 33.6) * 33.6 + 17;
		const roundedY = Math.round(dragContainer.getAttribute('y') / 33.6) * 33.6 + 13;

		dragContainer.setAttribute('x', roundedX);
		dragContainer.setAttribute('y', roundedY);

		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
}
