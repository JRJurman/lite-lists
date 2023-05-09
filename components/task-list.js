define`
	<task-list>
		<style>
			h2 {
				margin: 0;
				display: flex;
				justify-content: space-between;
				width: 320px;
				align-items: baseline;
			}

			input[type="text"] {
				width: 80%;
				font-family: inherit;
				color: ${'color'};
				border: none;
				outline: 0;
				background: none;
				font-size: 1em;
				margin-left: 0.25em;
			}

			ul {
				margin: 0;
				padding: 0;
			}
		</style>
		<div>
			<h2>
				<input type="text" placeholder="New List">
				<color-picker color=${'color'}>
			</h2>
			<ul>
				<task-item color=${'color'} placeholder="First Thing..."></task-item>
				<task-item color=${'color'} placeholder="and..."></task-item>
			</ul>
		</div>
		<script>
			initTaskList(this)
		</script>
	</task-list>
`;

function initTaskList(taskList) {
	taskList.addEventListener('color-changed', (event) => {
		const newColor = event.detail.color;
		taskList.setAttribute('color', newColor);
	});
}
