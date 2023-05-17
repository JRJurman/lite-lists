define`
	<material-icon fill="0" weight="400" grade="0" optical-size="48">
		<style>
			span {
				font-family: 'Material Symbols Outlined';
				font-variation-settings:
					'FILL' ${'fill'},
					'wght' ${'weight'},
					'GRAD' ${'grade'},
					'opsz' ${'optical-size'};

				display: flex;
				justify-content: center;
				align-items: center;

				height: 100%;
				width: 100%;
			}

			span:hover, span:focus {
				font-variation-settings:
					'FILL' ${'fill'},
					'wght' calc(${'weight'} + 200),
					'GRAD' ${'grade'},
					'opsz' ${'optical-size'}
			}
		</style>
		<span>${'icon'}</span>
	</material-icon>
`;
