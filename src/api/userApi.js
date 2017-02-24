import "whatwg-fetch";
import Promise from "promise-polyfill";
import getBaseUrl from "./baseUrl";

// for IE
if (!window.Promise) {
	window.Promise = Promise;
}

const baseUrl = getBaseUrl();

// public methods

export function getUsers() {
	return get("users");
}

export function deleteUser(id) {
	return del(`users/${id}`);
}

// private methods

function get(url) {
	return fetch(baseUrl + url).then(onSuccess, onError);
}

function del(url) {
	const request = new Request(baseUrl + url, {
		method: "DELETE"
	});

	return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
	return response.json();
}

function onError(error) {
	console.log(error); // eslint-disable-line no-console
}
