// ADDING SITES
function successAddSite(result) {
	console.log("Succuess in adding the site.");
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
	console.log("Retrieved storage!");
	let keys = [];
	for (var k in result) keys.push(k);
	for (var key in keys) {
		let name = JSON.stringify(result[keys[key]].name);
		let oldContext = JSON.stringify(result[keys[key]].context);
		console.log("baseURL: ", keys[key], " name: ", name, " context: ", oldContext, "\n");
	}
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

/* 
Variables:
	fullURL: the full URL of the page the user has just loaded.
	name: the stored name of the current URL/Context pair.
	context: The stored context for the site currently loaded.
	
*/
function successGetKeys(result) {
	console.log("Retrieved storage!");
	var keys = [];
	for (var k in result) keys.push(k);
	// var temp = JSON.parse(result);

	const header = browser.tabs.query({ currentWindow: true, active: true });
	// if the 'Promise' object gets a good result, we will do stuff.
	Promise.resolve(header).then(value => {
		fullURL = value[0]['url'];
		// console.log(fullURL);

		for (var key in keys) {
			// console.log(result[keys[key]]);
			if (fullURL.indexOf(keys[key]) !== -1) {
				// console.log(keys[key]);
				// console.log(JSON.stringify(result[keys[key]]));
				if (keys[key] !== JSON.stringify(result[keys[key]])) {
					// console.log("Found a URL with this key: " + keys[key]);
					// console.log(result[keys[key]]);
					// console.log("This is the index: " + URLname.indexOf(keys[key]));
					let name = JSON.stringify(result[keys[key]].name);
					// let oldContext = JSON.stringify(result[keys[key]].context);
					let context = fullURL.replace(keys[key], "");
					let newSite = {
						[keys[key]]: { context, name }
					}
					var temp = browser.storage.local.set(newSite).then(successAddSite, failureAddSite);
				} else {
					console.log("This baseurl + context is already stored!");
				}
			}
		}
	});

}

var fullURL;
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