const json = require('./jsonManager');
const fs = require('fs');

const createStoryState = function  (campaign, name, obj) {
	fs.access("GameData/"+campaign, function(error) {
		if (error) {
			
		} else {
			json.readJSON("GameData/" + campaign + "/", "campaign", function(data) {
				if(data.protected == true) {
					return;
				}
				else {
					json.createJSON("GameData/" + campaign + "/", name, obj);
				}
			});
		}
		
	});

	
	
}

const checkFile = function (name, _callback) {
	fs.existsSync('GameData/'+name, function (err) {
		_callback(err);
	});

}

const createCampaign = function (data) {
	data.protected = false;
	
	let prot = false;
	let cb = function () {
		fs.access("GameData/"+data.name, function(error) {
		if (error) {
			console.log("Directory does not exist.");
			//fs.mkdir("GameData/" + data.name, cb());
			
			

		} else {
		console.log("Directory already exists.")
			/*json.readJSON("GameData/" + data.name + "/", "campaign", function(dat) {
				if (dat.protected == true) {
					prot = true;
					cb();
				}
				
				console.log(prot);

			});*/	
		}
		
		});


		if (data.name != "") {
			if (prot == false) {

				console.log(data);
				json.createJSON("GameData/" + data.name + "/", "campaign", data);
				
			}
		}
	}
	fs.access("GameData/"+data.name, function(error) {
		if (error) {
			console.log("Directory does not exist.");
			fs.mkdir("GameData/" + data.name, function(err) {
				if (err) {
					console.log("Error creating Directory");
				}
				else {
					cb();
				}
			});
			

		} else {
		console.log("Directory already exists.")
			json.readJSON("GameData/" + data.name + "/", "campaign", function(dat) {
				if (dat.protected == true) {
					prot = true;
					cb();
				}
				
				console.log(prot);

			});
		}
		
	});

	

	



	


	/*checkFile("GameData/" + data.name, function(err) {
		if (err) {
	    	fs.mkdir("GameData/" + data.name);
		}
	});*/
	//fs.mkdir("GameData/" + data.name);

	/*checkFile("GameData/" + data.name + "/campaign.js", function(err) {
		if (err) {
	    	json.readJSON("GameData/" + campaign + "/", "campaign", function(dat) {
				prot = dat.protected;
			});
		}
	});*/

	
	

}

module.exports = {createStoryState, createCampaign};