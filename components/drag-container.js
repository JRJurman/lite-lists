define`
	<drag-container x="20" y="20" is-dragging="0">
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
		<div 	onmousedown="startDrag(this, event)"
					onmousemove="moveHandler(this, event)"
					onmouseup="endDrag(this, event)"
					onmouseleave="endDrag(this, event)"
					ontouchstart="startDrag(this, event)"
					ontouchmove="moveHandler(this, event)"
					ontouchend="endDrag(this, event)">
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

function startDrag(draggableDiv, event) {
	setXAndYOffset(draggableDiv, event);

	const dragContainer = draggableDiv.getRootNode().host;
	dragContainer.setAttribute('is-dragging', '1');
}

function setXAndYOffset(draggableDiv, event) {
	const dragContainer = draggableDiv.getRootNode().host;

	const eventX = event.clientX || event.targetTouches[0].clientX;
	const eventY = event.clientY || event.targetTouches[0].clientY;

	const offsetX = eventX - draggableDiv.getBoundingClientRect().left;
	const offsetY = eventY - draggableDiv.getBoundingClientRect().top;

	dragContainer.setAttribute('x-offset', offsetX);
	dragContainer.setAttribute('y-offset', offsetY);
}

function moveHandler(draggableDiv, event) {
	event.preventDefault();

	const dragContainer = draggableDiv.getRootNode().host;

	// check if we are dragging the container
	if (dragContainer.getAttribute('is-dragging') !== '1') {
		return;
	}

	const eventX = event.clientX || event.targetTouches[0].clientX;
	const eventY = event.clientY || event.targetTouches[0].clientY;

	let newX = eventX - parseFloat(dragContainer.getAttribute('x-offset'));
	let newY = eventY - parseFloat(dragContainer.getAttribute('y-offset'));

	if (snappingBehavior === SNAP_BEHAVIORS.SNAP_ON_DRAG) {
		[newX, newY] = roundXAndYToGrid(newX, newY);
	}

	dragContainer.setAttribute('x', newX);
	dragContainer.setAttribute('y', newY);
}

function endDrag(draggableDiv, event) {
	const dragContainer = draggableDiv.getRootNode().host;

	if (snappingBehavior === SNAP_BEHAVIORS.SNAP_ON_RELEASE) {
		const x = dragContainer.getAttribute('x');
		const y = dragContainer.getAttribute('y');
		const [roundedX, roundedY] = roundXAndYToGrid(x, y);

		dragContainer.setAttribute('x', roundedX);
		dragContainer.setAttribute('y', roundedY);
	}

	dragContainer.setAttribute('is-dragging', '0');

	triggerSave(dragContainer);
}
