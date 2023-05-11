define`
	<create-task-list-button>
		<style>
			button {
				left: 0;
				top: 0;
				position: absolute;
				transform: translateY(-100%);
			}
			button:focus {
				transform: translateY(0%);
			}
		</style>

		<button onclick="createNewTaskList({x: 20, y: 20})">Create New Task List</button>

	</create-task-list-button>
`;
