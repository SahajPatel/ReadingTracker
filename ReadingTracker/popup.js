// ADDING SITES
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

function addSite() {
	const name = document.getElementById("name").value;
	const context = document.getElementById("context").value;
	const baseurl = document.getElementById("baseurl").value;
	let newSite = {
		[baseurl]: { context, name }
	}
	var temp = browser.storage.local.set(newSite).then(successAddSite, failureAddSite);
}
// END OF ADDING SITES

// GETTING SITES
function successCallback(result) {
	console.log("Retrieved all storage: " + result);
	var keys = [];
	for (var k in result) keys.push(k);
	console.log(keys);
	console.log(JSON.stringify(result));
}

function failureCallback(error) {
	console.error("Failed at getting all storage: " + error);
}

function getStorage() {
	var temp = browser.storage.local.get().then(successCallback, failureCallback);
}
// END OF GETTING SITES

// CLEAR SITES
function clearStorage() {
	browser.storage.local.clear();
}

// UPDATE SITES
function successGetKeys(result) {
	console.log("Retrieved storage!");
	var keys = [];
	for (var k in result) keys.push(k);
	// var temp = JSON.parse(result);

	const header = browser.tabs.query({ currentWindow: true, active: true });
	// if the 'Promise' object gets a good result, we will do stuff.
	Promise.resolve(header).then(value => {
		URLname = value[0]['url'];
		console.log(URLname);

		for (var key in keys) {
			// console.log(result[keys[key]]);
			if (URLname.indexOf(keys[key]) !== -1) {
				console.log("Found a URL with this key:" + keys[key]);
				console.log(result[keys[key]]);
				console.log("This is the index: " + URLname.indexOf(keys[key]));
			} else {
				console.log("This Ain't It...");
			}
		}
	});

}

var URLname;
function updateURL() {
	browser.storage.local.get().then(successGetKeys, failureCallback)
}

const setStoragebutton = document.getElementById("test");
const getStorageButton = document.getElementById("getStorage");
const clearStorageButton = document.getElementById("clearStorage");
const updateOnURL = document.getElementById("update");
setStoragebutton.addEventListener("click", addSite);
getStorageButton.addEventListener("click", getStorage);
clearStorageButton.addEventListener("click", clearStorage);
updateOnURL.addEventListener("click", updateURL);