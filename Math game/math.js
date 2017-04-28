var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;
// if we click  on the start button/reset
document.getElementById("startreset").onclick = function(){
    //if we are playing 
    if(playing == true){
        location.reload(); //reload page
        
     
        
    }else{//if we are not playing 
       
        playing = true;

        score = 0; //set score 0
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        
        show("timeremaining");
        timeRemaining = 30;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        //hde gamover
        hide("gameOver");
       // change button reset
       
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown
        startCountdown();
        
        
        // generate new Q/A
        generateQA();
        
    }
}
 //click box   
 for(var i = 1; i < 5 ; i++){
         document.getElementById("box"+i).onclick = function(){
      //check playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML = score;

                //hide wrong box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct")
                },1000);

                //generate new Q/A
                generateQA();

            }
            else{
                score--;
                document.getElementById("scorevalue").innerHTML = score;


                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong")
                },1000);
            }
        }
    } 
}  
        
// function

//start counter
function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        //Game over
        if(timeRemaining == 0){
            stopCountdown();
            var message;
            if(score > 15){
                message = "You are pro!";
            }else if(score > 9){
                message = "Well played bro!";
            }else{
                message = "Keep practicing!";
            }
            show("gameOver");
            
            document.getElementById("gameOver").innerHTML = "<p>game over</p><p>"+message+"</p><p>your score is "+ score +".</p>";
            
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
        
    },1000);
    
    
}

//stop counter

function stopCountdown(){
            clearInterval(action);
}
//  hide elements
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
//show elements
function show(Id){
    document.getElementById(Id).style.display = "block";
}
//generateQA

function generateQA() {
    var x =1 + Math.round(Math.random() * 9);
    var y =1 + Math.round(Math.random() * 9);
    correctAnswer = x * y;
    
    document.getElementById("question").innerHTML =x + " x " + y;
    
    var correctPosition = 1 + Math.round(Math.random() * 3);
    //fill correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; 
    // fill wrong answer
    
    var answers = [correctAnswer];
    
    for(var i = 1; i<5 ; i++){
        if(i !=  correctPosition){
            var wrongAnswer;
            
            do{wrongAnswer = (1 + Math.round(Math.random() * 9))*(1 + Math.round(Math.random() * 9));
            }
            while(answers.indexOf(wrongAnswer)>-1)
            
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);
        }
    }
}

















