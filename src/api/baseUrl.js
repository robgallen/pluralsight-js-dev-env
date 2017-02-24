export default function getBaseUrl() {
	const mockApi = getQueryStringParameterByName("useMockApi");

	// must match port number in package.json > scripts > start-mockapi
	return mockApi ? "http://localhost:3001/" : "/";
}

function getQueryStringParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}

	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);

	if (!results) {
		return null;
	}
	if (!results[2]) {
		return "";
	}

	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
