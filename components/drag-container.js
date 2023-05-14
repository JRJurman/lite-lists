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

const SNAP_BEHAVIORS = {
	SNAP_ON_DRAG: 'SNAP_ON_DRAG',
	SNAP_ON_RELEASE: 'SNAP_ON_RELEASE',
	NO_SNAPPING: 'NO_SNAPPING',
};

const snappingBehavior = SNAP_BEHAVIORS.SNAP_ON_DRAG;

function roundXAndYToGrid(x, y) {
	// snap to the nearest 1.4em -> 24px * 1.4em -> 33.6px
	const roundedX = Math.round(x / 33.6) * 33.6 + 17;
	const roundedY = Math.round(y / 33.6) * 33.6 + 13;
	return [roundedX, roundedY];
}

function startDraggableContainer(draggableDiv, event, forceEvent) {
	// make sure the drag is happening on the div container,
	// and not some other element like the checkbox or inputs
	// (unless we forced the event)
	const clickTarget = event.composedPath()[0];
	if (clickTarget != draggableDiv && forceEvent === undefined) {
		return;
	}

	const eventX = event.clientX || event.targetTouches[0].clientX;
	const eventY = event.clientY || event.targetTouches[0].clientY;

	const offsetX = eventX - draggableDiv.getBoundingClientRect().left;
	const offsetY = eventY - draggableDiv.getBoundingClientRect().top;

	const dragContainer = draggableDiv.getRootNode().host;
	const mouseMoveHandler = (e) => {
		const eventX = e.clientX || e.targetTouches[0].clientX;
		const eventY = e.clientY || e.targetTouches[0].clientY;

		let newX = eventX - offsetX;
		let newY = eventY - offsetY;

		if (snappingBehavior === SNAP_BEHAVIORS.SNAP_ON_DRAG) {
			[newX, newY] = roundXAndYToGrid(newX, newY);
		}

		dragContainer.setAttribute('x', newX);
		dragContainer.setAttribute('y', newY);
	};

	const mouseUpHandler = () => {
		if (snappingBehavior === SNAP_BEHAVIORS.SNAP_ON_RELEASE) {
			const x = dragContainer.getAttribute('x');
			const y = dragContainer.getAttribute('y');
			const [roundedX, roundedY] = roundXAndYToGrid(x, y);

			dragContainer.setAttribute('x', roundedX);
			dragContainer.setAttribute('y', roundedY);
		}

		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
		document.removeEventListener('touchmove', mouseMoveHandler);
		document.removeEventListener('touchend', mouseUpHandler);
		triggerSave(dragContainer);
	};

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
	document.addEventListener('touchmove', mouseMoveHandler);
	document.addEventListener('touchend', mouseUpHandler);
}
