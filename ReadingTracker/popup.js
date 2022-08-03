function successAddSite(result) {
	var keys = [];
	for (var k in result) keys.push(k);
	console.log(keys);
	for (var key in keys) {
		console.log("Success at adding the site: " + JSON.stringify(result, key))
	}
}

function failureAddSite(error) {
	console.error("Error adding the site: " + error);
}

function successCallback(result) {
	console.log("Retrieved all storage: " + result);
	var keys = [];
	for (var k in result) keys.push(k);
	console.log(keys);
	for (var key in keys) {
		console.log(JSON.stringify(result, key))
	}
}

function failureCallback(error) {
	console.error("Failed at getting all storage: " + error);
}

function addSite() {
	const name = document.getElementById("name").value;
	const context = document.getElementById("context").value;
	const baseurl = document.getElementById("baseurl").value;
	let newSite = {
		[name]: { context, baseurl }
	}
	var temp = browser.storage.local.set(newSite).then(successAddSite, failureAddSite);
}

function getStorage() {
	var temp = browser.storage.local.get().then(successCallback, failureCallback);
}

function clearStorage() {
	browser.storage.local.clear();
}

const setStoragebutton = document.getElementById("test");
const getStorageButton = document.getElementById("getStorage");
const clearStorageButton = document.getElementById("clearStorage");
setStoragebutton.addEventListener("click", addSite);
getStorageButton.addEventListener("click", getStorage);
clearStorageButton.addEventListener("click", clearStorage);
