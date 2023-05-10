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

	const dragContainer = draggableDiv.getRootNode().host;
	const mouseMoveHandler = (e) => {
		dragContainer.setAttribute('x', e.clientX - offsetX);
		dragContainer.setAttribute('y', e.clientY - offsetY);
	};

	const mouseUpHandler = () => {
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
}
