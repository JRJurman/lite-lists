define`
	<dot-grid-pattern dot-color="#CECECE" dot-size="1px" dot-space="1.4em">
		<style>
			/* from https://codepen.io/edmundojr/pen/xOYJGw */
			body {
				background: radial-gradient(circle at center, ${'dot-color'} 0%, ${'dot-color'} ${'dot-size'}, transparent ${'dot-size'}, transparent 100%);
				background-size: ${'dot-space'} ${'dot-space'};
			}
		</style>
		<script>
			const styleTag = this.shadowRoot.querySelector('style');
			window.document.head.appendChild(styleTag);
		</script>
	</dot-grid-pattern>
`;
