import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import moment from "moment";

import {getUsers, deleteUser} from "./api/userApi";

getUsers().then(result => {
	let usersBody = "";

	result.forEach(user => {
		usersBody += `<tr>
			<td>${user.id}</td>
			<td>${user.firstName}</td>
			<td>${user.lastName}</td>
			<td>${user.email}</td>
			<td><a href="#" data-id="${user.id}" class="fa fa-trash"><span class="sr-only">Delete</span></a></td>
			</tr>`;
	});

	document.getElementById("users").innerHTML = usersBody;

	const deleteLinks = document.getElementsByClassName("fa-trash");

	// use Array.from to turn getElementsByClassName pseudo-array into a real array
	Array.prototype.map.call(deleteLinks, link => {
		link.onclick = function(event) {
			const element = event.target;
			event.preventDefault();
			deleteUser(element.attributes["data-id"].value);
			const row = element.parentNode.parentNode;
			row.parentNode.removeChild(row);
		};
	});
});

// moment
moment.locale("en-gb");
let m = moment().format("LLLL");
document.getElementById("today").innerHTML = m;
