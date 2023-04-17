const Data = require('./Data');

let myDatabase = function() {
    this.data = [];
}

let dataIndex = 0;

myDatabase.prototype.displayData = function() {
    for (let i=0;i<this.data.length;i++) {
        console.log(this.data[i]);
    }
}

myDatabase.prototype.postData = function(_data) { //create
  for (let i=0;i<this.data.length;i++) {
    if (this.data[i] && this.data[i].ident == _data.ident) {
      return false;
    }
  }
  
  this.data[dataIndex++] = 
  new Data(_data.ident,_data.name,_data.strength,_data.dexterity, _data.intelligence, 
    _data.wisdom,_data.charisma, _data.playerRace, _data.playerClass);
  return true;
}

myDatabase.prototype.getData = function(ident) {
  for (let i=0;i<this.data.length;i++) {
    if (this.data[i] && ident == this.data[i].ident)
    {
      return(new Data(this.data[i].ident,this.data[i].name,
        this.data[i].strength,this.data[i].dexterity,this.data[i].intelligence,
        this.data[i].wisdom,this.data[i].charisma,this.data[i].playerRace,this.data[i].playerClass));
    }
  }
  return null;
}

myDatabase.prototype.putData = function(_data) {
  for (let i=0;i<this.data.length;i++) {
    if (this.data[i] && this.data[i].ident == _data.ident) {
      this.data[i] = 
      new Data(_data.ident,_data.name,
        this.data[i].strength,this.data[i].dexterity,this.data[i].intelligence,
        this.data[i].wisdom,this.data[i].charisma,this.data[i].playerRace,this.data[i].playerClass);
      return true;
    }
  }
  return false;
}

myDatabase.prototype.deleteData = function(ident) {
  for (let i=0;i<this.data.length;i++) {
    if (this.data[i] && ident == this.data[i].ident) {
        let tempPtr = this.data[i];
        this.data[i] = undefined;
        return tempPtr;
    }
  }
  return null;
}

module.exports = myDatabase;