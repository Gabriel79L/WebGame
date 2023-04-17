//g = require('account.js');

//var acc = g.Account("Joe", 5, 4);

//let id = 0;


//var json = JSON.stringify(acc);


//fs.writeFile('Account/acc'+id+'.json', json, 'utf8');

/*fs.readFile('GameData/GameDataFormatExample.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    acc = JSON.parse(data); //now it an object
    console.log(acc.text);
    console.log(acc.exit[1].trigger);

    json = JSON.stringify(acc); //convert it back to json
    fs.writeFile('myjsonfile.json', json, 'utf8'); // write it back 
}});*/

var fs = require('fs');

const readJSON = function (path, name, _callback) {
	let obj = "";
	fs.readFile(path + name + '.json', 'utf8', function readFileCallback(err, data){
	    console.log("read at " + path + name + '.json');
	    if (err){
	        console.log(err);
	    } else {
	    obj = JSON.parse(data); //now it an object
	    console.log(obj);
	    _callback(obj);
	}});
	
}

const createJSON = function (path, name, obj) {
	let json = JSON.stringify(obj);
	console.log(json);
	fs.writeFile(path+name+".json", json, 'utf8', function(err, result) {
    	if(err) 
    		console.log('error', err);
    });
}

module.exports = {readJSON, createJSON};