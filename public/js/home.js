function createClicked(){
          $.ajax({
            url: "/create",
            type: "POST",
            data: {identifier:$("#identifier").val(),
                    name:$("#name").val(), 
                    playerRace:$("#race option:selected").text(),
                    playerClass:$("#class option:selected").text()
                  },
            success: function(data){
                if (data.error)
                  alert("bad");
                else
                  alert("good");
                console.log("str"+data.strength)
                console.log(data.id);
                  $("#identifier").val(data.id);
                  $("#strength").text("Strength: " + data.strength);
                  $("#dexterity").text("Dexterity: " + data.dexterity);
                  $("#intelligence").text("Intelligence: " + data.intelligence);
                  $("#wisdom").text("Wisdom: " + data.wisdom);
                  $("#charisma").text("Charisma: " + data.charisma);
              } ,     
            dataType: "json"
          });   
  return false;
}
function readClicked(){
          $.ajax({
            url: "/read",
            type: "GET",
            data: {identifier:$("#identifier").val()},
            success: function(data){
                if (data.error)
                  alert("bad");
                else {
                  $("#name").val(data.name);
                  //strength,dexterity,intelligence,wisdom,charisma
                  console.log("str"+data.strength)
                  $("#strength").text("Strength: " + data.strength);
                  $("#dexterity").text("Dexterity: " + data.dexterity);
                  $("#intelligence").text("Intelligence: " + data.intelligence);
                  $("#wisdom").text("Wisdom: " + data.wisdom);
                  $("#charisma").text("Charisma: " + data.charisma);
                  console.log(data.playerClass + "     ||     "+ data.playerRace)
                  $("#class").val(data.playerClass);
                  $("#race").val(data.playerRace);

                }
              } ,     
            dataType: "json"
          });   
  return false;
}
function updateClicked(){
          $.ajax({
            url: "/update",
            type: "PUT",
            data: {identifier:$("#identifier").val(),
            name:$("#name").val()           
            },
            success: function(data){
                if (data.error)
                  alert("bad");
                else
                  alert("good");
              } ,     
            dataType: "json"
          });   
  return false;
}
function deleteClicked(){

    let trimIdentifier = $("#identifier").val().trim();
    if (trimIdentifier == "") {
      alert("bad");
      return false; 
    }

    $.ajax({
      url: "/delete/" + $("#identifier").val(),
      type: "DELETE",
      success: function(data) { 
        if (data.error)
          alert("bad");
        else
          alert("good");
      } ,   
      dataType: "json"
    });  
    return false;             
}      
        
$(document).ready(function(){ 

  $("#createButton").click(createClicked);
  $("#readButton").click(readClicked);
  $("#updateButton").click(updateClicked);
  $("#deleteButton").click(deleteClicked);

});
