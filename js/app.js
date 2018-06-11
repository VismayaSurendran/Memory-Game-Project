/*
 * Create a list that holds all of your cards
 */
let cards=document.querySelectorAll(".card");
let cardArray=[...cards];

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
let openArray=[];
let counts=0;
let moves=document.querySelector(".moves");
let sec=0;
let min=0;
let second=document.querySelector(".sec");
let minute=document.querySelector(".min");
let time;
let starRating=document.querySelectorAll(".fa-star");





for (let i=0;i<cardArray.length;i++){
	//event listener when clicked
  cardArray[i].addEventListener("click",function(){

     //check if it is already clicked
     if(this.classList.contains("show") || this.classList.contains("open")){
      return;
      }
     else {
     //show and open card on click
    this.classList.add("open","show");
     openArray.push(this);
     //start the counter
     if(openArray.length==2){
      counts++;
      if(counts==1){
     time= setInterval(function(){
      second.innerHTML=sec;
      minute.innerHTML=min;
      sec++;
      if(sec==60){
        min++;
        sec=0;
      }
    },1000);
      }
      moves.innerHTML=counts;

      //star rating according to no.of moves
      if (counts>15 && counts<20){
        for(s=0;s<3;s++){
          if(s>1){
            starRating[s].style.visibility="collapse";
          }
        }
      }
      if (counts>21){
        for(s=0;s<3;s++){
          if(s>0){
            starRating[s].style.visibility="collapse";
          }
        }
      }

      //check the opened cards for match or unmatch
      if(openArray[0].type===openArray[1].type) {
        match();
      }
        else{
          unmatch();
        }

      }

      }
    });  
}

//card shuffling on loading
let deck=document.querySelector(".deck");
window.onload=function(){
  let shuffled=shuffle(cardArray);
  for(let i=0;i<shuffled.length;i++){
    shuffled.forEach(function(a){
      deck.appendChild(a);
    });
  }
}

 let matchArray=[];
 let modal=document.querySelector(".modal") 
//check for a match
function match(){
  openArray[0].classList.add("match");
  openArray[1].classList.add("match");
  matchArray.push(openArray[0]);
  matchArray.push(openArray[1]);
  openArray.pop();
  openArray.pop();
  //game won
  if (matchArray.length==16){
    clearInterval(time);
    modal.classList.add("show");
    document.querySelector(".totalTime").innerHTML=document.querySelector(".timer").innerHTML;
    document.querySelector(".totalMoves").innerHTML = counts;
    document.querySelector(".rating").innerHTML=document.querySelector(".stars").innerHTML;

}
}

//unmtach function

function unmatch(){
  setTimeout(function(){
       openArray[0].classList.remove("show","open");
       openArray[1].classList.remove("show","open");
       openArray.pop();
       openArray.pop();

  },500)
}


