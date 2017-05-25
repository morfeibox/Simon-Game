var baseUrl = "https://s3.amazonaws.com/freecodecamp/";
var audio = ["simonSound1.mp3", "simonSound2.mp3", "simonSound3.mp3", "simonSound4.mp3"];
var counter = 1;

var game = {
    turns:[],
    player:[],
    currentTurnArray:[],
    click:0,
    iterration:1,
    num:1,
    speed:750,
    timesRun:0

};


$( function() {
    $( document ).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
            }
        }
    });
} );



//toggle button function

(function() {
    $(document).ready(function() {

        $('.switch-input').on('change', function() {
            var isChecked = $(this).is(':checked');
            var selectedData;
            var $switchLabel = $('.switch-label');
            if(isChecked) {
                selectedData = $switchLabel.attr('data-on');
            } else {
                selectedData = $switchLabel.attr('data-off');
            }
            switchon(isChecked);

        });

     // toggle On condition
    function switchon(isChecked) {
        if (isChecked === true ) {
            $(".count").css('color', '#DC0D29').text('--');
            new Audio('https://trumpsoundboard.com/sounds/i run i win.mp3').play();

            // generating initial array
            function generateArray() {
                game.turns = Array.apply(null, Array(20)).map(function () {
                    return Math.floor(Math.random() * (5 - 1)) + 1;
                });
            }

            //starting the game
            $(".start").click(function startGame() {
                // prevent more calls from start button
                if (!window.doesThisOnce) {
                    generateArray();
                    currentIteration(game.turns);

                }
                window.doesThisOnce = true;

            });


            //setup of the computer play pattern and longevity of the turn
            function currentIteration() {

                game.timesRun = 0;
                counter=1;
                game.currentTurnArray = game.turns.slice(0, game.iterration);
                currentLevel(game.currentTurnArray.length);
console.log(game.iterration);
                var interval = setInterval(function () {
                   if(game.currentTurnArray.length>0) {
                       game.num = game.currentTurnArray.shift();
                       showCurrentInterration(game.num);
                   }
                    game.player=[];
                    game.timesRun++;
                        if (game.timesRun === game.iterration) {
                            clearInterval(interval);
                        }

                }, game.speed);

              game.iterration++;
            }


            //setup the text into the count display and the speed of computer turns

            function currentLevel(length) {

                   if (length <= 5) {
                   $(".count").text("0" + length);

                  }else if(length >5 && length<=9){
                       $(".count").text("0" + length);
                       game.speed = 650;

                   }else if(length >9 && length<=15){
                       game.speed = 500;
                       $(".count").text(length);

                   }else if(length >15 && length<=20) {
                       game.speed = 400;
                       $(".count").text(length);

                   }else {
                        $(".count").text(length);
                   }
            }



            //computer pattern (buttons blink and audio play)
            function showCurrentInterration(num) {
                new Audio(baseUrl + audio[num - 1]).play();
                $("#" + num).addClass("current-pattern");
                setTimeout(function blink() {
                        $("#" + num).removeClass("current-pattern");
                    },
                    350);

            }


          // player turn function

            $('.play-buttons').on('click', function () {

                if( game.turns.length > 0) {

                        game.click = $(this).attr('id');
                        game.player.push(parseInt(game.click));
                        counter++;
                        compareArrays(game.player);
                        nextstepEvaluation();

                        if (counter === game.iterration) {
                            currentIteration();
                        }
                }
            });



            //comparing the computer and player arrays
           function compareArrays() {

               for (var i = 0; i < game.player.length; i++) {
                   if (game.player[i] !== game.turns[i]) {
                      var result = false;
                   } else if (game.player[i] === game.turns[i]) {
                       result = true;
                   }
               }
             return result;
           }



           function nextstepEvaluation () {
               var playerTurn = compareArrays();

               // win condition
               if (game.iterration === 20) {
                   new Audio('https://trumpsoundboard.com/sounds /fantastic.mp3');

               }
               // checking for player errors
               if (playerTurn === false) {
                   game.iterration--;
                   currentIteration();
                   new Audio(' https://trumpsoundboard.com/sounds/nope_2.wav').play();


                   // if strict mode is on and player has error
                   if ($('.strict-led').hasClass("clicked")) {

                       gameloose();



                   }

               }

           }

           function gameloose(){

               new Audio(' https://trumpsoundboard.com/sounds/your grapefruits are no match for my trump towers.mp3').play();
               resetGame();
               $("#game-condition").show("blind",500);
               $("#condition").text('You Lost The Game, Try Again!' );
               $("#game-condition").click(function(){
                   $("#game-condition").hide("blind",300);

               });

           }

            //strict button led

            $('.strict').on('click', function(){
                $('.strict-led').css('background', '#DC0D29').addClass("clicked");

            });




            // sound settings

            $('.play-buttons').click(function () {
                if( game.turns.length > 0) {
                    var i = $(this).attr('id');
                    new Audio(baseUrl + audio[i - 1]).play();
                }
            });



        // toggle OFF condition
        }else if (isChecked === false ) {

            resetGame();

        }

        function resetGame() {
            $('.strict-led').css('background', '#32050C').removeClass("clicked");
            $('.count').css('color', '#51070D').text('88');
            $('.strict').off('click');
            $(".start").off('click');
            $('.play-buttons').off('click');
            $('.switch-input').prop('checked', false);

            counter = 0;
            window.doesThisOnce = false;
            game = {
                turns:[],
                player:[],
                currentTurnArray:[],
                click:0,
                iterration:1,
                num:1,
                speed:750,
                timesRun:0

            };


        }

    }


});

})();

