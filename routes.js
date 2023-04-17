let path = require("path");
let express = require("express");
let game = require("./gameLoader");
let campaignM = require("./campaignManager");
let charCreator = require("./characterCreator");

let currentIdent=0;

//Look at below web page for info on express.Router()
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
let router = express.Router();

const myDatabase = require('./myDatabase');
let db = new myDatabase();

const Data = require('./Data');

//request is info sending to server from client.
//response is info sending to client from server.

router.get("/",function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/views/game.html"));  //changed
});

router.get("/tutorial",function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/views/tutorial.html"));  //changed
});

router.get("/game",function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/views/console.html"));  //changed
});

router.get('/console', function(req, res){

    game.doStoryState(req.query.name, function(data){
    	res.json(data);
    });

});

router.get('/storyStateUpload', function(req, res){

    console.log(req.query.filename);
    campaignM.createStoryState(req.query.campaign, req.query.filename, req.query.storystate);

    res.json({error: false});
});

router.get('/createCampaign', function(req, res){
    console.log(req.query);
    campaignM.createCampaign(req.query);

    res.json({error: false});
});

router.get("/editor",function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/views/campaignMaker.html"));  //changed
});

router.post('/create', function(req, res){

	currentIdent++;
	console.log(currentIdent);
	charCreator.createCharacter({class:req.body.playerClass, race:req.body.playerRace, name:req.body.name, id:currentIdent}, function(data) {
		    let val = db.postData(data);
		    if (val)
		        res.json({error:false,name:val.name,strength:data.strength,dexterity:data.dexterity,
		            intelligence: data.intelligence,wisdom: data.wisdom,charisma: data.charisma, playerRace: val.playerRace, playerClass: val.playerClass, id:currentIdent});
		    else
		        res.json({error:true});
	});



//change code       
//    return(db.postData(obj,res));



});

router.put('/update', function(req, res){

    let trimIdentifier = req.body.identifier.trim();
    if (trimIdentifier == "") {
        res.json({error:true});
        return;
    }

    let identifier = Number(trimIdentifier);
    if (Number.isNaN(identifier)) {
        res.json({error:true});
        return;
    }

    let name = req.body.name.trim();
    if (name == "") {
        res.json({error:true});
        return;
    }

    let obj = new Data(identifier,name);
//changed code.
//    return(db.putData(obj,res));
    
    let val = db.putData(obj);
    if (val)
        res.json({error:false});
    else
        res.json({error:true});
 

});

router.get('/read', function(req, res){
	console.log("read");
    let trimIdentifier = req.query.identifier.trim();
    if (trimIdentifier == "") {
        res.json({error:true});
        return;
    }

    let identifier = Number(trimIdentifier);
    if (Number.isNaN(identifier)) {
        res.json({error:true});
        return;
    }

//changed code.
//    return(db.getData(identifier,res));

    let val = db.getData(identifier);
    if (val == null)
        res.json({error:true});
    else
        console.log(val.playerRace)
        res.json({error:false,name: val.name,strength: val.strength,dexterity: val.dexterity,
            intelligence: val.intelligence,wisdom: val.wisdom,charisma: val.charisma, playerRace: val.playerRace, playerClass: val.playerClass});


});

router.delete('/delete/:identifier', function(req, res){
    let trimIdentifier = req.params.identifier.trim();
    if (trimIdentifier == "") {
        res.json({error:true});
        return;
    }

    let identifier = Number(trimIdentifier);
    if (Number.isNaN(identifier)) {
        res.json({error:true});
        return;
    }
//changed code.
//    return( db.deleteData(identifier,res));

    let val = db.deleteData(identifier);
    if (val == null)
        res.json({error:true});
    else
        res.json({error:false});

});


module.exports = router;