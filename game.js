var gameList = [];
var playerList = [];
var buttonRegularColours = ["red","blue","green","yellow"];
var buttonMeduimColours = ["red","blue","green","yellow","grey","teal"];
var buttonHardColours = ["red","blue","green","yellow","grey","teal","black","white"];
var level = 0;
var started = false;
var isRegular = false;
var isMeduim = false;
var isHard = false;
$(document).keypress(function (){
  if(!started){
    playGame();
  }
  });
function playGame(){
  started = true;
  if(isRegular){
    regular();
  }else if (isMeduim){
    meduim();
  }else if (isHard){
    hard();
  }else{
    regular();
  }
}
$(".a-btn").click(function(){
  var aButtonClicked = $(this);
  var aButtonClickedId = aButtonClicked.attr("id");
  aButtonClicked.addClass("a-pressed");
  if(aButtonClickedId === "regular"){
    isRegular = true;
    playGame();
  }else if (aButtonClickedId === "meduim"){
    isMeduim = true;
    playGame();
  }else if (aButtonClickedId === "hard"){
    isHard = true;
    playGame();
  }else{
    isRegular = true;
    playGame();
  }
})
$(".btn").click(function(){
  var buttonClickedColour = $(this).attr("id");
  var buttonClicked = $("#"+ buttonClickedColour);
  playSound(buttonClickedColour);
  buttonClicked.addClass("pressed");
  setTimeout(function(){
    buttonClicked.removeClass("pressed");
  },100);
  playerList.push(buttonClickedColour);
  if(!started){
    playGame();
  }else{
    checkAnswer(playerList.length-1);
  }
});
function checkAnswer(currentLevel){
  if (gameList[currentLevel]===playerList[currentLevel]){
    if(playerList.length===gameList.length){
      setTimeout(function (){
        playGame();
      },100);
    }
  }
  else{
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },100);
    $("#level-title").text("GameOver , Press Any Key To Restart!!!");
    playSound("wrong");
    startOver();
  }
}
function playSound(soundName){
  var audio = new Audio("sounds/"+soundName+".mp3");
  audio.play();
}
function startOver(){
  level = 0 ;
  gameList = [];
  started = false;
}
function regular(){
  $("#grey,#teal,#black,#white").hide();
  $(".container").css("width","50%");
  $("#meduim,#hard").slideUp();
  level++;
  $("#level-title").text("level "+level);
  playerList = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomButtonColour = buttonRegularColours[randomNumber];
  var gameButton = $("#"+randomButtonColour);
  gameList.push(randomButtonColour);
  gameButton.fadeOut(100).fadeIn(100);
  playSound(randomButtonColour);
}
function meduim(){
  isMeduim = true;
  $("#white,#black").hide();
  $(".container").css("width","70%");
  $("#regular,#hard").slideUp();
  level++;
  $("#level-title").text("level "+level);
  playerList = [];
  var randomNumber = Math.floor(Math.random()*6);
  var randomButtonColour = buttonMeduimColours[randomNumber];
  var gameButton = $("#"+randomButtonColour);
  gameList.push(randomButtonColour);
  gameButton.fadeOut(100).fadeIn(100);
  playSound(randomButtonColour);
}
function hard(){
  isHard = true;
  $("#meduim,#regular").slideUp();
  level++;
  $("#level-title").text("level "+level);
  playerList = [];
  var randomNumber = Math.floor(Math.random()*8);
  var randomButtonColour = buttonHardColours[randomNumber];
  var gameButton = $("#"+randomButtonColour);
  gameList.push(randomButtonColour);
  gameButton.fadeOut(100).fadeIn(100);
  playSound(randomButtonColour);
}
