var useElems = document.querySelectorAll('.icon');

for (var i = 0; i < useElems.length; i++) {
	var url = useElems[i].children[0].getAttribute('xlink:href');
	url = url.replace('/assets', '../public/assets');

	useElems[i].children[0].setAttribute('xlink:href', url);
}
