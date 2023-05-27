var colors = ["red","green","blue","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$(document).keypress(function(){
    if(!start){
        $("#level-title").text("level "+ level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                 nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong")
        
        $("#level-title").text("Game over, Press any key to start over");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        
        
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = colors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(sound){
    var audio = new Audio("./sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(button){
    $("#" + button).addClass("pressed");

    setTimeout(function(){
        $("#" + button).removeClass("pressed")
    },100);
}

function startOver(){
    gamePattern = [];
    start = false;
    level = 0;
}