var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gamePatternCheck = [];
var level = 1;
var executed = true;

function startGame() {
    document.addEventListener('keydown', () => {
        if (executed === true) {
        nextSequence();
        executed = false;
        }
    });
}

function nextSequence() {
    $("h1").text("Level "+level);
    var randomNumber = parseInt(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
};

$(".btn").click(function(event) {
    var buttonClicked = event.target;
    // console.log($(buttonClicked).attr('id'));
    $(buttonClicked).addClass("pressed");
    gamePatternCheck.push($(buttonClicked).attr('id'));
    // console.log(gamePatternCheck);
    playSound($(buttonClicked).attr('id'));
    setTimeout(function() {
        $(buttonClicked).removeClass("pressed");
    },100);

    for(var i=0; i<gamePatternCheck.length; i++) {
        if (gamePattern[i] === gamePatternCheck[i]) {
            continue;
        } else {
            playSound("wrong");
            $('body').addClass("game-over");
            setTimeout(function() {
                $('body').removeClass("game-over")
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }

    if(gamePattern.length === gamePatternCheck.length && i === gamePattern.length) {
        gamePatternCheck = [];
        setTimeout(nextSequence, 1000);
    }
});

function startOver() {
    gamePattern = [];
    gamePatternCheck = [];
    level = 1;
    executed = true;
};