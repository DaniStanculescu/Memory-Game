/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let symbols = ["diamond","diamond","paper-plane-o","paper-plane-o","anchor","anchor","bolt","bolt",
"cube","cube","leaf","leaf","bicycle","bicycle","bomb","bomb"];

//Making the function for game restart
let card=[];
let click=0; ///verify how many cards was clicked;
let wasClicked=[];
let elements=[];
let match=0;///how many matches was made;
function makeCards()
{

  let cardSymbol=[];
 const scorePan=document.querySelector('section');
 scorePan.insertAdjacentHTML('afterend','<ul class="deck"></ul>');
 const cardDeck=document.querySelector('.deck');


  for(let i=0;i<16; i++)
  {

    card[i]=document.createElement('li');
    card[i].setAttribute('class','card');
    cardSymbol[i]=document.createElement('i');
    cardSymbol[i].setAttribute('class',`fa fa-${symbols[i]}`);
    card[i].appendChild(cardSymbol[i]);
    cardDeck.appendChild(card[i]);
    card[i].addEventListener('click',isClicked);
  }

}

function isClicked(){

  let elem=this;
  let elemntClass;

  if(wasClicked.length==0)
  {
    elem.classList.add('open');
    elem.classList.add('show');
    elemntClass=elem.firstChild.className;
    wasClicked.push(elemntClass);
    elements.push(elem);
    click++;
  }
else  if(wasClicked.length==1)
  {
    elem.classList.add('open');
    elem.classList.add('show');
    elemntClass=elem.firstChild.className;
    elements.push(elem);
    wasClicked.push(elemntClass);
    click++;
    if(wasClicked[0]===wasClicked[1])
    {
      elem.classList.remove('open');
      elem.classList.remove('show');
      elem.classList.add('match');
      elements[0].classList.remove('open');
      elements[0].classList.remove('show');
      elements[0].classList.add('match');
      elements[0].removeEventListener('click',isClicked);
      elem.removeEventListener('click',isClicked);
      click++;
      match++;
      elements=[];
      wasClicked=[];
      }
  else{
      elements[1].style.backgroundColor='red';
      elements[1].classList.add('shake');
      elements[1].classList.add('animation');
      elements[0].style.backgroundColor='red';
     elements[0].classList.add('shake');
     elements[0].classList.add('animation');
    setTimeout(function()  {elem.classList.remove('shake');
      elements[1].classList.remove('animation');
      elements[1].classList.remove('open');
      elements[1].classList.remove('show');
      elements[1].style.backgroundColor='';
      elements[0].classList.remove('shake');
      elements[0].classList.remove('animation');
      elements[0].classList.remove('open');
      elements[0].classList.remove('show');
      elements[0].style.backgroundColor='';
       elements=[];
       wasClicked=[];
     },2000);
    }

  }

matches();

}

function matches(){

let moves=document.querySelector('.moves');
moves.textContent=`${click}`;
const ListOfSTars=document.querySelectorAll('.fa-star');

 if(click===25)
 {
  ListOfSTars[2].classList.remove('fa-star');
  ListOfSTars[2].classList.add('fa-thumbs-down');
 }
 if(click===30)
 {
   ListOfSTars[1].classList.remove('fa-star');
   ListOfSTars[1].classList.add('fa-thumbs-down');
 }
 if(click===50)
 {
   ListOfSTars[0].classList.remove('fa-star');
   ListOfSTars[0].classList.add('fa-thumbs-down');

 }
}

function startGame()
{
   const container=document.querySelector('.container');
   container.style.filter='';
  const startPannel=document.querySelector('.initGame');
  startPannel.remove();
  shuffle(symbols);
  makeCards();
}

 function initGame(){

  const container=document.querySelector('.container');
  const startPannel='<div class="initGame"><p class="game-title">Memory Game</p><p class="play-button">Play</p></div>';
  document.body.insertAdjacentHTML('afterbegin',startPannel);
  container.style.filter='blur(5px)';
  const playButton=document.querySelector('.play-button');
  playButton.addEventListener('click',startGame);

}

initGame();///This function MUST BE THE FIRST FUNCTION;









/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
