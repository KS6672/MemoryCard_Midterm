/*
This is a memory game. The aim of this game is to unmask all the cards by sequentially clicking on a pair of cards that match each other. Every sequential match will unmask the cards.
*/

// let longestStreak = 0;      // counting the streak to display at the end of the game
// let streak = 0 ;            // counting the ongoing streak

var s;                      // Scribble to make the grid
let sect = 4;               // Number of Sections to divide the canvas
let ncol = 3;               // number of columns to display cards
let nrow = 4;               // Number of rows to display cards

let numCards = 6;           // Total number of pairs of cards to be matched
let c1, c2, c3, c4, c5, c6; // name of the images to be loaded
var cards = [];             // Array to store all images in image format
var cardName = [];          // Array to store name of each card in 'cards' array
let chosenCards = [];       // Array to store images in random order
// let orderOfCards =[];       // Array to store images in random order
// let nameOfCards  =[];       // Array to store name of the each image in the 'orderOfImages' array
var cardMatched = [];       // Array to mark the card as matched when the match is found
let totalMatches = 0;       // Stop the game when total matches reach the total number of pairs

let clicks = 0;             //when a card is flipped this  will increment, maximum value is 2


//Preload the mask of each image (cover) and all images
function preload(){
  cover = loadImage('./card_cover.webp')
 
  //Loading the images to the cards array and storing their names in the cardName array
  for (let i = 0; i<numCards; i++){
    cards[i] = loadImage("c"+int(i+1)+".jpg")
    cardName[i]="c"+int(i+1);
    cards[i+numCards] = loadImage("c"+int(i+1)+".jpg")
    cardName[i+numCards]="c"+int(i+1);
  }
  // print(cardName);
}


function setup() {
  createCanvas(400, 500);
  s = new Scribble();
  
  // Button to reset the board
  // buttonRestart = createButton('Restart');
  // buttonRestart.position(width/2-30, height+10);
  // buttonRestart.mousePressed(resetBoard);
}

// function resetBoard(){
//   clicks = 0;
//   chosenCards = [];
//   cardMatched = [];
//   totalMatches = 0;  
// }


function draw() {
  background(255);
    
  // for each column and row, select a random card
  for(i=0; i<ncol; i++){
    for (j=0; j<nrow; j++){
      //Get the x and y coordinates to place the cards
      var xcoord = (i+1)*(width/sect) ;
      var ycoord = (j+0.5)*(height/sect) ;
      //Select a random card from the cards array
      let pos = int(random(cards.length))
      //create new objects of the randomly chosen card
      chosenCards.push(new Card(i, j, cards[pos], cardName[pos], xcoord, ycoord))
      
      //Drop the randomly chosen card from the cards array and cardNames array to ensure it does not get picked up again
      cards.splice(pos,1)
      cardName.splice(pos,1)
      
      //Place the above chosen card in it's position on the board
      // displayCard();
      //Display the above chosen random card
      // image(cards[pos], xcoord-(0.25*width/sect), ycoord-(0.25*height/sect), width/8,height/8)
    }
  }
  print(chosenCards);
    
  //Calling method to display the cards on the grid
  for(let i=0; i<chosenCards.length; i++){
    chosenCards[i].displayCard();
  } 
  
  //Calling method to mask the cards on the grid
  for(let i=0; i<chosenCards.length; i++){
    chosenCards[i].maskCard();
  }
  
  //The following were to check if the calculations for displaying the images were correct or not prior to using 'i' and 'j' in the loop prior to this
   // image(cj, (2.5+0.25)*width/sect,0.25*height/sect, width/8,height/8)
   // image(cj, (0.5+0.25)*width/sect,(2+0.25)*height/sect, width/8,height/8)
   // image(cover, (1+0.5+0.25)*width/sect,(0+0.25)*height/sect, width/8,height/8);
  
  noLoop();
}

//Defining the 'Card' class
class Card{
  constructor(colindex, rowindex, chosenCard, chosenCardName, xcoord, ycoord){
    this.colindex = colindex;            //column index
    this.rowindex = rowindex;            //row index
    this.chosenCard = chosenCard;        //randomly chosen image
    this.chosenCardName = chosenCardName;//name of randomly chosen image
    this.xcoord = xcoord;                //x coordinate to display card
    this.ycoord = ycoord;                //y coordinate to display card
    this.cardMatched = 0;                //mark the card as 0, until it is matched(change it to 1 then)
  }
  
  //method to display the card
  displayCard(){
    //create a scribble to diplay the grid
    s.scribbleRect(this.xcoord,this.ycoord,width/sect,height/sect); 
    //display the image
    image(this.chosenCard, this.xcoord-(0.25*width/sect), this.ycoord-(0.25*height/sect), width/8,height/8);
  }//end of displayCard method
  
  //method to mask the card
  maskCard(){
    //display the mask
    image(cover, this.xcoord-(0.25*width/sect), this.ycoord-(0.25*height/sect), width/8,height/8);
  }//end of maskCard method
  
}//end of Card class