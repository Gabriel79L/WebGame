const json = require('./jsonManager');

console.log("JAVASCRIPT IS AWFUL");

let storystate = "";
doStoryState("GameDataFormatExample", function (data) {
	storystate = data;
	console.log(storystate.exit[0].trigger);
	link = "";
	doStoryOptions(storystate, "forward", function(data){
		link = data;
		if (link != "error") {
			let storystate2 = "";

			doStoryState(link, function(data){   //// THIS IS THE *ONLY WAY* TO GET THIS TERRIBLE TERRIBLE LANGUAGE TO RUN THE CODE IN THE  CORRECT ORDER. *I HATE JAVASCRIPT SO MUCH*
				storystate2 = data;
			});
		}
		else {
			console.log("Error: Input does not match any trigger text.")
		}
		
	});
	
});

//let link = doStoryOptions(storystate, "forward");



//console.log(link)

//let storystate2 = doStoryState(link);

function doStoryState (name,_callback) {
	json.readJSON("GameData/", name, function (data) {
		_callback(data);
	});
	
}

function doStoryOptions (data, trigger, _callback) {
	console.log("hi");

	for (let i = 0; i<data.exit.length; i++) {
		console.log(data.exit[i].trigger);
		if (data.exit[i].trigger == trigger) {
			console.log(data.exit[i]);
			_callback(data.exit[i].out);
			return;
		}
	}
	_callback("error");
}


