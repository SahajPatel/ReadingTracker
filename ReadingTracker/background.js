// header holds the async 'Promise' object that is returned when asking for the header.
const header = browser.tabs.query({ currentWindow: true, active: true });
// if the 'Promise' object gets a good result, we will do stuff.
Promise.resolve(header).then(value => {
	console.log(value[0]['url']);
	// we are setting the const url equal to the current tab's url.
	const url = value[0]['url'];
	// we will loop through every key in the local storage.
	for (var i = 0; i < localStorage.length; i++) {
		// we are setting test equal to the name of the key at index i.
		const test = localStorage.key(i);
		// if the current page's url is equal to any of the keyy, we will do stuff. 
		if (url.indexOf(test) != -1) {
			// We are getting the key value array that was locked by the correct key.
			var value = JSON.parse(localStorage.getItem(test));
			// We are saving the keys nested inside the intial working key in an array.
			var keys = Object.keys(value);
			// We are seeing if any of the context keys will fit in the tab's url.
			for (var y = 0; y < keys.length; y++) {
				// console.log(keys[y]);
				if (url.indexOf(keys[y]) != -1) {
					// console.log(true);
					const name = (value[keys[y]]);
					// console.log(value[keys[y]]);
					var booky = browser.bookmarks.search(name);
					// console.log(booky);
					Promise.resolve(booky).then(bookmarkdata => {
						console.log(bookmarkdata);
						bmurl = bookmarkdata[0]['id'];
						console.log(bmurl);
						var updating = browser.bookmarks.update(bmurl, { url: url });
						// var updating = browser.bookmarks.update(bmurl, { url: "https://www.royalroad.com/fiction/39408/beware-of-chicken/chapter/643963/vol-2-chapter-1-full-steam-ahead" });
					});
				} else {
					console.log(false);
					console.log(keys[y]);
					console.log(url);
				}
			}
		} else {
			// console.log(false);
		}
	}
});
