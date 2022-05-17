function addSite() {
	const name = document.getElementById("name").value;
	const context = document.getElementById("context").value;
	const baseurl = document.getElementById("baseurl").value;
	if (base == null) {
		console.log("inside if-statement");
		var myFields = { [context]: name };
		storage.StorageArea.set(baseurl, JSON.stringify(myFields));
		console.log(storage.StorageArea(baseurl));
	}
}

function getMore() {
	console.log("Hello World");
	var temp = storage.StorageArea.get();
	console.log(temp);

}

getStorage
const button = document.getElementById("test");
const testbtn = document.getElementById("getStorage");
button.addEventListener("click", addSite);
testbtn.addEventListener("click", getMore());