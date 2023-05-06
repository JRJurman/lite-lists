define`
	<task-list color="blue">
		<style>
			h2 {
				margin: 0;
			}

			input {
				font-family: inherit;
				color: var(--${'color'}-5);
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
		<h2><input placeholder="New List"></h2>
		<ul>
			<task-item color=${'color'} placeholder="First Thing..."></task-item>
			<task-item color=${'color'} placeholder="and..."></task-item>
		</ul>
	</task-list>
`;
