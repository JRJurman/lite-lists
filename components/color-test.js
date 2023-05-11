define`
	<color-test value=5>
		<input type="range" onchange="updateColorTestValue(this, event)" min="0" max="12" value=${'value'}>
		<input type="text" onchange="updateColorTestValue(this, event)" value=${'value'}>
		<ul>
			<li style="color: var(--gray-${'value'})">gray - testing this font color</li>
			<li style="color: var(--stone-${'value'})">stone - testing this font color</li>
			<li style="color: var(--red-${'value'})">red - testing this font color</li>
			<li style="color: var(--pink-${'value'})">pink - testing this font color</li>
			<li style="color: var(--purple-${'value'})">purple - testing this font color</li>
			<li style="color: var(--violet-${'value'})">violet - testing this font color</li>
			<li style="color: var(--indigo-${'value'})">indigo - testing this font color</li>
			<li style="color: var(--blue-${'value'})">blue - testing this font color</li>
			<li style="color: var(--cyan-${'value'})">cyan - testing this font color</li>
			<li style="color: var(--teal-${'value'})">teal - testing this font color</li>
			<li style="color: var(--green-${'value'})">green - testing this font color</li>
			<li style="color: var(--lime-${'value'})">lime - testing this font color</li>
			<li style="color: var(--yellow-${'value'})">yellow - testing this font color</li>
			<li style="color: var(--orange-${'value'})">orange - testing this font color</li>
			<li style="color: var(--choco-${'value'})">choco - testing this font color</li>
			<li style="color: var(--brown-${'value'})">brown - testing this font color</li>
			<li style="color: var(--sand-${'value'})">sand - testing this font color</li>
			<li style="color: var(--camo-${'value'})">camo - testing this font color</li>
			<li style="color: var(--jungle-${'value'})">jungle - testing this font color</li>
		</ul>
	</color-test>
`;

function updateColorTestValue(input, event) {
	const colorTest = input.getRootNode().host;
	colorTest.setAttribute('value', event.target.value);
}
