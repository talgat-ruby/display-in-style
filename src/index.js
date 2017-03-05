const INPUT_ID = "input";
const TABLE_ID = 'table-body';
const TYPES = {
	OBJECT: 'object',
	ARRAY: 'array',
	STRING: 'string',
	NUMBER: 'number'
};
const PRIMITIVE_LENGTH = 10;
const ALERT_TEXT = 'Something went wrong. Please check url you\'ve typed' ;

function getPreview(item, typeOf) {
	switch(typeOf) {
		case TYPES.OBJECT:
			return Object.keys(item).length;
		case TYPES.ARRAY:
			return item.length;
		case TYPES.STRING:
			return item.slice(0, PRIMITIVE_LENGTH);
		case TYPES.NUMBER:
			return item.toString().slice(0, PRIMITIVE_LENGTH);
		default:
			return null;
	}
}

function getTypeOf(item) {
	const type = typeof item;
	if(Array.isArray(item)) {
		return TYPES.ARRAY;
	} else {
		return type;
	}
}

function renderEl([key, item]) {
	const typeOf = getTypeOf(item);
	const preview = getPreview(item, typeOf);
	return `<tr>
		<td>${key}</td>
		<td>${preview}</td>
		<td>${typeOf}</td>
	</tr>`;
}

function renderTable(json) {
	document
		.getElementById(TABLE_ID)
		.innerHTML = 
	Object
		.entries(json)
		.sort((a, b) => (a[0] > b[0] ? 1 : -1))
		.map(renderEl)
		.join(''); 
}

function getJSON(url) {
	const myHeaders = new Headers();
	const myInit = {
		method: 'GET',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default'
	};
	const myRequest = new Request(url, myInit);

	fetch(myRequest)
		.then(res => res.json())
		.then(json => {
			renderTable(json);
		})
		.catch(err => {
			alert(ALERT_TEXT);
		})
}

function onClick() {
	const url = document.getElementById(INPUT_ID).value;
	getJSON(url);
}