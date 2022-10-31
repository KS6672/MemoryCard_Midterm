
/*This piece of code will be run when the mouse is clicked. 
On the first click, the masked card will be flipped
On the second click, the masked card will be flipped too, and the first flipped card will be compared against the first card*/


// The following will hold the position of the two last flipped cards
let prevFLipCol1 ;
let prevFLipRow1 ;
let prevPosX1;
let prevPosY1;
let cardFlipped1;
let prevPos1;

let prevFLipCol2 ;
let prevFLipRow2 ;
let prevPosX2;
let prevPosY2;
let cardFlipped2;
let prevPos2;


// end of holding previous positions;//Do the following on every Mouse Click
function mouseClicked(){
  // console.log("Clicks before loop",clicks);
  //Increment number of clicks by 1
  clicks = clicks + 1;
  
  //Fetching the x and y coordinate of the mouse click
  let mouseClickPosX = mouseX;
  let mouseClickPosY = mouseY;
  // console.log(mouseClickPosX,mouseClickPosY)
  
  //Declaring the col and the row where the mouse has been clicked
  let col;
  let row;
   
  //Fetchng the grid of the mouse click
  //Column 1
  if(mouseClickPosX >= ((1-0.5)*(width/sect)) && (mouseClickPosX < (1+0.5)*(width/sect))){
    col = 0;
    if(mouseClickPosY < (1)*(height/sect)){
      row = 0;
    }
    else if(mouseClickPosY < (2)*(height/sect)){
      row = 1;
    }
    else if(mouseClickPosY < (3)*(height/sect)){
      row = 2;
    }
    else if(mouseClickPosY < (4)*(height/sect)){
      row = 3;
    }
  }
  //Column 2
  else if(mouseClickPosX >= ((2-0.5)*(width/sect)) && (mouseClickPosX < (2+0.5)*(width/sect))){
    col = 1;
    if(mouseClickPosY < (1)*(height/sect)){
      row = 0;
    }
    else if(mouseClickPosY < (2)*(height/sect)){
      row = 1;
    }
    else if(mouseClickPosY < (3)*(height/sect)){
      row = 2;
    }
    else if(mouseClickPosY < (4)*(height/sect)){
      row = 3;
    }
  }  
  //Column 3
  else if(mouseClickPosX >= ((3-0.5)*(width/sect)) && (mouseClickPosX < (3+0.5)*(width/sect))){
    col = 2;
    if(mouseClickPosY < (1)*(height/sect)){
      row = 0;
    }
    else if(mouseClickPosY < (2)*(height/sect)){
      row = 1;
    }
    else if(mouseClickPosY < (3)*(height/sect)){
      row = 2;
    }
    else if(mouseClickPosY < (4)*(height/sect)){
      row = 3;
    }
  }
  
  //If the mouse was clicked beyond the grids, print the following to the console
  else{
    console.log('Not here')
  }
  
  //Variables to store the current card flipped position 
  let flipPosX ;
  let flipPosY ;
  //Do the following for the first click of the mouse
  if(clicks === 1){
    flipPosX = (col+1)*(width/sect);        // Get the x position of the mouse click
    flipPosY = (row+0.5)*(height/sect) ;    // Get the y position of the mouse click
    prevFlipCol1 = col;                     // Store the current grid index in column
    prevFlipRow1 = row;                     // Store the current grid index in row
    prevPosX1 = flipPosX;                   // Store the current x coordinate in col
    prevPosY1 = flipPosY;                   // Store the current y coordinate in row
    print("Position1:")                     // Print the first clicked position
    print(prevFlipCol1, prevFlipRow1)       // Print the first clicked column and row
    for(let i = 0; i< chosenCards.length; i++){
      if(chosenCards[i].colindex === col && chosenCards[i].rowindex === row){
        chosenCards[i].displayCard();    //Display the card just clicked on
        cardFlipped1 = chosenCards[i].chosenCardName; // Store the name of the card that has just been flipped
        prevPos1 = i;
      }
    }
    print(cardFlipped1);                    // Print the name of the card that has just been flipped
  }
  //Do the following for the second click of the mouse
  else if(clicks === 2){
    flipPosX = (col+1)*(width/sect);
    flipPosY = (row+0.5)*(height/sect) ;
    // showCard(col, row,flipPosX, flipPosY);
    prevFlipCol2 = col;
    prevFlipRow2 = row;
    prevPosX2 = flipPosX;
    prevPosY2 = flipPosY;
    print("Position2:")
    print(prevFlipCol2, prevFlipRow2);
    for(let i = 0; i< chosenCards.length; i++){
      if(chosenCards[i].colindex === col && chosenCards[i].rowindex === row){
        chosenCards[i].displayCard();    //Display the card just clicked on
        cardFlipped2 = chosenCards[i].chosenCardName; // Store the name of the card that has just been flipped
        prevPos2 = i;
        print(cardFlipped2);
        if(chosenCards[i].cardMatched === 0){
          if(cardFlipped1 === cardFlipped2) {
            
            //Scenario one: if the card is being matched on to itself!
            if(((prevFlipCol1 === prevFlipCol2) && (prevFlipRow1 === prevFlipRow2))){
             // text("Can't match a card with itself! Try Again!!", width/2-30, height/2-30, 50);
             print("Can't match a card with itself! Try Again!!");
             // streak = 0;    //Resetting the streak parameter to 0
            }
            
            //Scenario two: if there is an actual match between two cosecutive cards
            else if((prevFlipCol1 !== prevFlipCol2) || (prevFlipRow1 !== prevFlipRow2)){
              chosenCards[prevPos1].cardMatched = 1  //mark the first card flipped as matched
              chosenCards[prevPos2].cardMatched = 1  //mark the second flipped card as 1
              print("There's a card match! Awesome!");
              totalMatches = totalMatches + 1;  // this is to ensure that all matches are completed
              // streak = streak + 1;              // increment the streak by 1
              //check if there is a longer streak than the previous streak
              // if(streak >= longestStreak){
              //   longestStreak = streak;         // set longestStreak to the higher value of 
              // }
              //The following runs after all the cards are matched
              if(totalMatches === numCards){
                noStroke();
                fill(0,0,0, 220);
                rect(width/2-50, height/2-50, width/4, height/4-18);
                fill('white');
                textSize(16);
                textAlign(CENTER);
                // text("That's a streak of "+ longestStreak + "! Awesome!", width/2-30, height/2-40, 70);
                text("You've matched all the cards in "+round(millis()/1000)+" seconds! Awesome!", width/2-45, height/2-50, 100);
                //This is the end of the game
              }//end of totalMatches === numCards
              break;
            }//end of actual card matched scenario
          }//end of card matched scenario
        }//end of chosenCards[i].cardMatched === 0
      }// end of chosenCards[i].colindex === col && chosenCards[i].rowindex === row
      
      //Scenario three: if the two flipped cards do not match
      else if(cardFlipped1 !== cardFlipped2){
        //Reset streak to 0, since there's is a mismatch
        // streak = 0;
        // print("Try Again!")
      }// end of card no match scenario
    }// end of card flipped and checked scenario
    // print("Streak, longestStreak:");
    // print(streak, longestStreak);
  }//end of actions after second click
  
  
  //For every third click, mask the unmatched cards and reset clicks to zero
  else if(clicks>2) {
    //mask the card only if they have not matched i.e. their cardMatched marker is 0
    if(chosenCards[prevPos1].cardMatched !== 1 ){
      chosenCards[prevPos1].maskCard();
    }//end of mask card1
    //mask the card only if they have not matched i.e. their cardMatched marker is 0
    if(chosenCards[prevPos2].cardMatched !== 1){
      chosenCards[prevPos2].maskCard();
    }//end of mask card2
    //reset clicks to 0, since more than two unmatched cards cannot be faced up at one point
    clicks = 0;
  }//end of clicks =3
}//end of function mouseClicked()
