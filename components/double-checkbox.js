define`
	<double-checkbox state="0">
		<style>
			button {
				border: none;
				background: none;
				padding: 0;
				width: 100%;
			}
			svg {
				cursor: pointer;
				display: block;
				stroke: ${'color'};
			}
			/* the first child is the inner fill of the box */
			svg[state="1"] [triangle-container] g:first-child path {
				stroke: ${'color'};
			}
			svg[state="2"] [triangle-container] g path {
				stroke: ${'color'};
			}
		</style>
		<button onclick="selectCheckbox(event)">
			<svg width="100%" viewbox="0 0 100 100" state=${'state'}>
				<g triangle-container></g>
			</svg>
		</button>
		<script>
			initDoubleCheckbox(this);
		</script>
	</double-checkbox>
`;

function initDoubleCheckbox(doubleCheckbox) {
	const svg = doubleCheckbox.shadowRoot.querySelector('svg');
	// make the svg rough
	const roughSvg = rough.svg(svg);

	// build a border rectangle
	// and a line through the rectangle
	const padding = 5;
	const borderConfig = {
		strokeWidth: 3,
		stroke: 'var(--text-5)',
	};
	svg.appendChild(roughSvg.rectangle(padding, padding, 100 - padding * 2, 100 - padding * 2, borderConfig));
	svg.appendChild(roughSvg.line(padding, 100 - padding, 100 - padding, padding, borderConfig));

	// build the two triangles
	const triangleContainer = svg.querySelector('[triangle-container]');
	const triangleConfig = {
		stroke: 'none',
		strokeWidth: 3,
		// this fill color is to just create the lines
		fill: 'rgba(0, 0, 0, 0)',
		fillStyle: 'zigzag',
	};

	triangleContainer.appendChild(
		roughSvg.polygon(
			[
				[padding, padding],
				[100 - padding, padding],
				[padding, 100 - padding],
			],
			triangleConfig
		)
	);
	triangleContainer.appendChild(
		roughSvg.polygon(
			[
				[100 - padding, padding],
				[100 - padding, 100 - padding],
				[padding, 100 - padding],
			],
			triangleConfig
		)
	);
}

function selectCheckbox(event) {
	const doubleCheckbox = event.target.getRootNode().host;
	const currentState = parseInt(doubleCheckbox.getAttribute('state'));
	// not-stated: 0, started: 1, completed: 2
	const newState = (currentState + 1) % 3;
	doubleCheckbox.setAttribute('state', newState);
	triggerSave(doubleCheckbox);
}
