import { expect } from "chai";
import jsdom from "jsdom";
import fs from "fs";

describe("Our first test", () => {
	it("should pass", () => {
		expect(true).to.equal(true);
	});
});

describe("index.html", () => {
	// need to pass done in, as we are using an async process
	it("should say hello", (done) => {
		const html = fs.readFileSync("./src/index.html", "utf-8");
		jsdom.env(html, function(err, window) {
			const h1 = window.document.getElementsByTagName("h1")[0]; // first h1
			expect(h1.innerHTML).to.equal("Users list");
			done();
			window.close();
		});
	});
});
