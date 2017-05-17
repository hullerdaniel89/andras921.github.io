var playing = false;
var score;
var lifeleft;
var speed;
var action;
var fruits =['apple','banana','grapes','kiwi','orange','pear','pineapple','watermelone'];
$(function(){
    //click on start reset button
   $('#startreset').click(function(){
       //we are playing
       if(playing == true){
          //reload page
           location.reload();
       }else{
           //if we are not playing
           playing = true;
           
           score = 0;
           $('#scorevalue').html(score);
           
           //life box
           $('#liferemaining').show();
           lifeleft = 3;
           addLife();
           $('#gameOver').hide();
           
           //change button
           $('#startreset').html('Reset Game');
           
           startAction();
           
           
       }
    }); 

    //slice fruit
    $('#fruit1').mouseover(function(){
        score++;
        
        $('#scorevalue').html(score);
        //play sound
        document.getElementById("slicesound").play();
        // stop fruit 
        clearInterval(action);
        $('#fruit1').hide('explode',500);
        setTimeout(startAction,500);
    });

    function addLife(){
    $('#liferemaining').empty();
    for(var i = 0;i < lifeleft ; i++ ){

               $('#liferemaining').append('<img class= "life" src="img/heart.png"> ');
    }
    }
    // sending fruits
    function startAction(){


    $('#fruit1').show();
    chooseFruit(); //random gyümölcs
    //random pos
    $('#fruit1').css({'left':Math.round(550*Math.random()), 'top': 0});
    // random speed
    
   
    if(score <= 10){
        speed = 1+Math.round(5*Math.random());
               
    }else{
        speed *= 1.2;
    }
        console.log(speed);
    action = setInterval(function(){
        $('#fruit1').css('top' ,$('#fruit1').position().top + speed);    
     //checking pos

        if($('#fruit1').position().top > $('#playground').height()){
            if(lifeleft > 1){
                $('#fruit1').show();
                chooseFruit(); //random gyümölcs
                //random pos
                $('#fruit1').css({'left':Math.round(550*Math.random()), 'top': 0});
                // random speed
                speed = 1+Math.round(5*Math.random());
                lifeleft--;

                addLife();

            }else{//game over
                playing = false;

                $('#startreset').html("Start Game");
                $('#gameOver').show();
                $('#gameOver').html('<p>Game Over!</p><p>your score is '+score+'</p>');
                $('#liferemaining').hide();
                stopAction();
            }    
        }

    }, 10);



    }

    //generate fruit
    function chooseFruit(){
    $('#fruit1').attr('src', 'img/'+ fruits[Math.round(7*Math.random())] +'.png');
    }

    function stopAction(){
    clearInterval(action);
    $('#fruit1').hide();
    }
});
