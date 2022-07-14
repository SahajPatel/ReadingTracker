function addSite() {
	const name = document.getElementById("name").value;
	const context = document.getElementById("context").value;
	const baseurl = document.getElementById("baseurl").value;
	var myFields = { [context]: name };
	var strFields = JSON.stringify(myFields);
	browser.storage.sync.set({ baseurl, strFields });
	console.log(browser.storage.sync.get(baseurl));

}

function getMore() {
	console.log("Hello World");
	// var temp = storage.StorageArea.get();
	var temp = browser.storage.sync.get("test");
	console.log(temp);

}

getStorage
const button = document.getElementById("test");
const testbtn = document.getElementById("getStorage");
button.addEventListener("click", addSite);
testbtn.addEventListener("click", getMore);