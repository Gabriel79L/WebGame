var StoryState;
var _Character;
var Campaign;

function getJSON(name){
  $.ajax({
    url: "/console",
    type: "GET",
    data: {
            name:Campaign + "/" + name
          },
    success: function(data){
        if (data.error)
          console.log("bad");
        else
          console.log("good");
        StoryState = data;
        if (_Character != null) {
          let text = String(StoryState.text);
          StoryState.text = text.replace("[CHARACTER NAME]", _Character.name);
        }

        console.log(data);
        let out = generateOptionsList(data);
        $("#console").append(data.text + "<br>");
        
        $("#console").append(out + "<br>");

        if (StoryState.skillmod.skill != "none") {
          doSkillMod(StoryState.skillmod);
        }

        if (_Character.hp <= 0) {
          console.log(_Character);
          getJSON("death");
          _Character.hp = 20;
        }

        document.getElementById("console").scrollTop += 10000;
        
      } ,     
    dataType: "json"
  });   
  $("#command").val("");

  return false;
}



function setCampaign () {
  console.log("hi");
  Campaign = $("#campaignName").val();
  $.ajax({
    url: "/console",
    type: "GET",
    data: {
            name:Campaign+"/campaign"
          },
    success: function(data){
        console.log(data);
        getJSON(data.start);
        $(".campaignTitle").html($("#campaignName").val() + " Campaign");
      } ,     
    dataType: "json"
  });   
}

function getCharacter () {
  console.log("hi");
  Campaign = $("#campaignName").val();
  $.ajax({
    url: "/read",
    type: "GET",
    data: {
            identifier:$("#characterID").val()
          },
    success: function(data){
        _Character = {name: data.name, strength:data.strength, dexterity:data.dexterity, intelligence:data.intelligence, wisdom:data.wisdom, charisma:data.charisma, race:data.playerRace, Cclass:data.playerClass};
        console.log(_Character);
        if (_Character.name != null) {
          $("#console").append("Successfully used character " + _Character.name + "<br>");
          _Character.hp = 20;
           // add the character image based on the class and race
           if(_Character.race== "Human"){
             if(_Character.Cclass== "Wizard"){
              console.log("here")
                $("#imgC").attr("src","images/WizardHuman.png");
             }
             else if(_Character.Cclass== "Druid"){
              console.log("here")
                $("#imgC").attr("src","images/DruidHuman.png");
             }
             else if(_Character.Cclass== "Bard"){
              console.log("here")
                $("#imgC").attr("src","images/BardHuman.png");
             }
             else if(_Character.Cclass== "Rouge"){
              console.log("here")
                $("#imgC").attr("src","images/RougeHuman.png");
             }
             else if(_Character.Cclass== "Fighter"){
              console.log("here")
                $("#imgC").attr("src","images/FighterHuman.png");
             }
           }
           else if(_Character.race== "Elf"){
             if(_Character.Cclass== "Wizard"){
              console.log("here")
                $("#imgC").attr("src","images/WizardElf.png");
             }
             else if(_Character.Cclass== "Druid"){
              console.log("here")
                $("#imgC").attr("src","images/DruidElf.png");
             }
             else if(_Character.Cclass== "Bard"){
              console.log("here")
                $("#imgC").attr("src","images/BardElf.png");
             }
             else if(_Character.Cclass== "Rouge"){
              console.log("here")
                $("#imgC").attr("src","images/RougeElf.png");
             }
             else if(_Character.Cclass== "Fighter"){
              console.log("here")
                $("#imgC").attr("src","images/FighterElf.png");
             }
           }
           else if(_Character.race== "Tiefling"){
             if(_Character.Cclass== "Wizard"){
              console.log("here")
                $("#imgC").attr("src","images/WizardTiefling.png");
             }
             else if(_Character.Cclass== "Druid"){
              console.log("here")
                $("#imgC").attr("src","images/DruidTiefling.png");
             }
             else if(_Character.Cclass== "Bard"){
              console.log("here")
                $("#imgC").attr("src","images/BardTiefling.png");
             }
             else if(_Character.Cclass== "Rouge"){
              console.log("here")
                $("#imgC").attr("src","images/RougeTiefling.png");
             }
             else if(_Character.Cclass== "Fighter"){
              console.log("here")
                $("#imgC").attr("src","images/FighterTiefling.png");
             }
           }
          
          $("#cStrength").val(_Character.strength);
          $("#cDexterity").val(_Character.dexterity);
          $("#cIntelligence").val(_Character.intelligence);
          $("#cWisdom").val(_Character.wisdom);
          $("#cCharisma").val(_Character.charisma);
          $("#cHealth").val(_Character.hp);
        }
        else {
          $("#console").append("Character does not exist.");
        }
      } ,     
    dataType: "json"
  });   
}

function generateOptionsList (data) {
  let str = "Choose one of the following actions: "
  for (let i = 0; i<data.exit.length; i++) {
    str = str + " <b>" + data.exit[i].trigger + "</b>,";
  }
  return (str);
}

function doCommand() {
  let a = false;
  for (let i = 0; i<StoryState.exit.length; i++) {
    if (StoryState.exit[i].trigger == $("#command").val()) {
      $("#console").append("You " + $("#command").val() + ". <br>")
      /////////////////////////////////////// ADD SKILL CHECKS!!
      if (StoryState.exit[i].check.skill != "none") {
        if (_Character != null) {
          $("#console").append("Skill Check: " + StoryState.exit[i].check.skill + " (" + _Character[StoryState.exit[i].check.skill] + "/" + StoryState.exit[i].check.value + ") ");

          if (_Character[StoryState.exit[i].check.skill] > StoryState.exit[i].check.value) {
            getJSON(StoryState.exit[i].out);
            $("#console").append("SUCCESS<br>");

          }
          else {
            getJSON(StoryState.exit[i].fail);
            $("#console").append("FAIL<br>");
          }
        }
        else {
          getJSON(StoryState.exit[i].fail);
          $("#console").append("You are not using a character! The game won't work properly if you don't create one. <a href='/characterCreator.html' target='_blank'>Click here to create a character.</a><br>");
        }
      }
      else {
        getJSON(StoryState.exit[i].out);
      }
      
      console.log(StoryState.exit[i].out);
      a = true;
    }
  }
  if (!a) {
    $("#command").val("");
    $("#console").append("Invalid entry." + "<br>");
  }
  document.getElementById("console").scrollTop += 10000;
}


function doSkillMod (skillmod) {
  if (_Character == null) {
    $("#console").append("You are not using a character! The game won't work properly if you don't create one. <a href='/characterCreator.html' target='_blank'>Click here to create a character.</a><br>");
  }
  _Character[skillmod.skill] += Number(skillmod.value);
  $("#console").append("(+"+skillmod.value + " " + skillmod.skill + ")<br>  ");
  console.log(_Character);
}

$(document).ready(function(){ 
  
  //getJSON("start"); // Initial Story State 
  $("#console").append("Hello! Welcome to the Web Text Adventure. To play, you need to <a href='characterCreator.html' target='_blank'>create a Character</a>. You can also play a custom campaign. If you don't know of any custom campaigns, you can simply play the default campaign." + "<br><br>");

  setCampaign();

  $("#sendCommand").click(doCommand);
  $("#doCampaign").click(setCampaign);
  $("#getCharacter").click(getCharacter);

});

$("#command").on('keyup', function (e) { 
  if (e.key === 'Enter' || e.keyCode === 13) { 
    doCommand(); 

  } 
});