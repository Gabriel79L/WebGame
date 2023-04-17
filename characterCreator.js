let Data = require("./Data");

let charCreator = {};

charCreator.rollDice = function (){

    return(Math.floor(Math.random() * 6) + 1 +
            Math.floor(Math.random() * 6) + 1+
            Math.floor(Math.random() * 6) + 1);
}

charCreator.createCharacter = function (dat, _cb){

    let CharacterClass = dat.class;

    let strength;
    let dexterity;
    let intelligence;
    let wisdom;
    let charisma;

   
    let trimIdentifier = dat.id;
   

    let identifier = Number(trimIdentifier);
    if (Number.isNaN(identifier)) {
        res.json({error:true});
        return;
    }

    let name = dat.name;
    if (name == "") {
        res.json({error:true});
        return;
    }

//console.log(req.body.playerRace)
//console.log(req.body.playerClass);




//this randomizes the stats
    let rand = [charCreator.rollDice(), charCreator.rollDice(), charCreator.rollDice(), charCreator.rollDice(), charCreator.rollDice(), charCreator.rollDice()];
    console.log(rand);
    /*let rand1 = rollDice()
    console.log( rand1 );
    let rand2 = rollDice()
    console.log( rand2 );
    let rand3= rollDice()
    console.log( rand3 );
    let rand4= rollDice()
    console.log( rand4 );
    let rand5= rollDice()
    console.log( rand5 );
    let rand6= rollDice()
    console.log( rand6 );*/
    let temp;
    let tempNum;
console.log("=========Put all in order========");
    const possibleStats = rand;
    const statsInOrder = []
    for(let i=0; i<6; i++){
        temp=possibleStats[0]
        tempNum=0;
        for(let j=possibleStats.length; j>0; j--){
            if(possibleStats[j]>=temp){
                temp= possibleStats[j];
                tempNum=j;
            }
        }
        statsInOrder[i]=temp
        possibleStats[tempNum]=0;
    }

    for(let i=0; i<statsInOrder.length; i++){
        let temp = statsInOrder[i];
        temp -=10;
        if (temp % 2 != 0){
            temp--;
        }
        temp = temp/2;
        temp = temp + Math.floor(Math.random() * 20) + 1
        statsInOrder[i] = temp;
        console.log(statsInOrder[i]);
    }
   

  if(CharacterClass=="Wizard"){
        wisdom = statsInOrder[1];
        dexterity = statsInOrder[2];
        intelligence = statsInOrder[0];
        charisma = statsInOrder[3];
        strength = statsInOrder[4];
   }
   else if(CharacterClass=="Druid"){
        wisdom = statsInOrder[0];
        dexterity = statsInOrder[1];
        intelligence = statsInOrder[2];
        charisma = statsInOrder[4];
        strength = statsInOrder[3];
   }
   else if(CharacterClass=="Fighter"){
        wisdom = statsInOrder[2];
        dexterity = statsInOrder[4];
        intelligence = statsInOrder[1];
        charisma = statsInOrder[3];
        strength = statsInOrder[0];
   }
   else if(CharacterClass=="Rouge"){
        wisdom = statsInOrder[2];
        dexterity = statsInOrder[0];
        intelligence = statsInOrder[1];
        charisma = statsInOrder[3];
        strength = statsInOrder[4];
   }
   else if(CharacterClass=="Bard"){
        wisdom = statsInOrder[3];
        dexterity = statsInOrder[1];
        intelligence = statsInOrder[2];
        charisma = statsInOrder[0];
        strength = statsInOrder[4];
   }


    let obj =
        new Data(identifier,name,strength,dexterity,intelligence,wisdom,charisma,dat.race,dat.class);


    _cb(obj);
}

module.exports = charCreator;