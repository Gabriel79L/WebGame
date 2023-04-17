const json = require('./jsonManager');


//let link = doStoryOptions(storystate, "forward");

let gl;

//console.log(link)

//let storystate2 = doStoryState(link);

const doStoryState = function (name,_callback) {
	json.readJSON("GameData/", name, function (data) {
		_callback(data);
	});
	
}

const doStoryOptions = function (data, trigger, _callback) {
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


module.exports = {doStoryState, doStoryOptions};