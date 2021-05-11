 var userClickedPattern= [];  // defining array for storage of user clicked pattern
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level= 0;
var started = false;
var clicks=0;
var randomChosenColour;



$(document).on("keydown", function (event) {
console.log(event.key);
if(event.key==='a' && started === false)
    {
        
// *** initial pattern creation***
nextSequence(); 
      
$(".btn").click(function (e) {  
    var buttonChosen = $(this).attr("id");
playSound(buttonChosen); 
userClickedPattern.push(buttonChosen); 
animatePress(buttonChosen);
clicks++
answer();
});
        }
});

$(document).on("click", function (event) {
    console.log(event.key);
    if(started === false)
        {
            
    // *** initial pattern creation***
    nextSequence(); 
          
    $(".btn").click(function (e) {  
        var buttonChosen = $(this).attr("id");
    playSound(buttonChosen); 
    userClickedPattern.push(buttonChosen); 
    animatePress(buttonChosen);
    clicks++
    answer();
    });
            }
    });
    


// checking Answer

function answer(){
    answerClicks= clicks-1;
    if(userClickedPattern[answerClicks]===gamePattern[answerClicks]){
        if(answerClicks===level){
            userClickedPattern.length = 0;
            clicks= 0;
            level++;
             nextSequence();
        }
    }else{
        console.log("game over");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
         
        },200);
        
        $("h1").text("Game Over!!!");
        setTimeout(function(){
            location.reload();
        },1000);
            
        
    }
}




//generate a random sequence
function nextSequence(){
    var randomNumbers = Math.floor(Math.random()*4);
    $("#level-title").text("Level "+level);
    randomChosenColour = buttonColours[randomNumbers];
 gamePattern.push(randomChosenColour);
 setTimeout(function(){
    animateFlash(gamePattern[level]);
    playSound(gamePattern[level]);
 },500);
 console.log(gamePattern+" is supposed to be clicked");
 console.log('user click pattern left '+userClickedPattern);
 started = true;
}


// Animation Press function 
function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){ $("#"+currentColor).removeClass("pressed"); }, 50);

}


// flash Animation
function animateFlash(buttonName){
$("#"+buttonName).fadeOut(200).fadeIn(200);
}

// play sound as per button
function playSound(buttonName){
    console.log(buttonName+" is supposed to play!!");
 var audio = new Audio('sounds/'+buttonName+'.mp3'); 
 audio.play();

}