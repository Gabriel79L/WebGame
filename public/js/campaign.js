var campaignName = "";
var sseditordefault = $("#ssEditor").html();

const option = '<div class="opt"><br><label for="trigger">Option Text:</label><input type="text" class="trigger" /> <br><label for="skill">Skill Check:</label><input type="text" class="skill" value="none"  /> : <input type="number" class="value" value="0" /> <br><label for="success">Success Link:</label><input type="text" class="success" /> <br><label for="fail">Fail Link:</label><input type="text" class="fail" /> <br><input type="button" class="Close" value="X"></div>';
var storyState;

var numOptions = 1;

$(document).ready(function(){ 
  addOption();
  $("#addOption").click(addOption);
  $("#ssRetriever").click(submitStoryState);
  $("#ssGetter").click(getStoryState);
  $("#clear").click(clearData);
  $("#campaignRetriever").click(newCampaign);
});

function getStoryState () {
  console.log("getstorystate");
  $.ajax({
    url: "/console",
    type: "GET",
    data: {
            name:$("#campaignName").val() + "/" + $("#filename").val()
          },
    success: function(data){
        readStoryState(data);
      } ,     
    dataType: "json"
  });  
}

function submitStoryState () {
  storyState = intoObject();
  console.log(storyState);
  uploadJSONtoServer();
}

function clearData () {
  //$("#ssEditor").html(sseditordefault);
  //addOption();
  $("#options").empty();
  $("#prompt").val("");
  $("#filename").val("");
  $(".modval").val("none");
  $(".mod").val("0");
}

function readStoryState (data) {
  
  let name = $("#filename").val();
  clearData();
  console.log(data);
  if (data.skillmod != null) {
    $(".modval").val(data.skillmod.value);
    $(".mod").val(data.skillmod.skill);
  }
  $("#prompt").val(data.text);
  $("#filename").val(name);

  for (let i = 0; i<data.exit.length; i++) {
    addOption();
  }
  $(".opt").each(function (index) {
    $(this).find('.trigger').val(data.exit[$(this).index()].trigger);
    $(this).find('.skill').val(data.exit[$(this).index()].check.skill);
    $(this).find('.value').val(data.exit[$(this).index()].check.value);
    $(this).find('.success').val(data.exit[$(this).index()].out);
    $(this).find('.fail').val(data.exit[$(this).index()].fail);
  });



}

function newCampaign () {
  $.ajax({
    url: "/createCampaign",
    type: "GET",
    data: {
            name:$("#campaignName").val(),
            start:$("#defSS").val()
          },
    success: function(data){
        if (data = "false") {
          alert("success");
        }
      } ,     
    dataType: "json"
  });
}

function intoObject () {
  let out = {text:$("#prompt").val(), skillmod:{skill:$(".mod").val(),value:$(".modval").val()}, exit:[]};
  $(".opt").each(function (index) {
    let opt = {trigger: $(this).find('.trigger').val(), check:{skill:$(this).find('.skill').val(), value:$(this).find('.value').val()}, out:$(this).find('.success').val(), fail:$(this).find('.fail').val()};
    out.exit.push(opt);
  })
  return(out);
}

function uploadJSONtoServer () {
  console.log($("#filename").val());
  $.ajax({
    url: "/storyStateUpload",
    type: "GET",
    data: {
            campaign:$("#campaignName").val(),
            filename:$("#filename").val(),
            storystate:storyState
          },
    success: function(data){
        if (data = "false") {
          alert("success");
        }
      } ,     
    dataType: "json"
  });   
}

function addOption () {
  numOptions++;
  $("#options").append(option);
  console.log($("#1").html());

  $(".Close").click(function() {
    console.log($(this).parent().html());
    $(this).parent().remove();
  });
}