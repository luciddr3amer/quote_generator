const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

// Show Loading
function loading(){
  loader.hidden=false;
  quoteContainer.hidden=true;
}
// Hide Loading
function complete(){
  quoteContainer.hidden=false;
  loader.hidden=true;
}

//show new quotes
function newQuote(){
  loading();
    //pick a random quote
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace it with 'unknown'
    if(!quote.author){
        authorText.textContent='Unknown';
    }else{
        authorText.textContent=quote.author;
    }
    quoteText.textContent=quote.text;
    //check quote length to determine styling
    if(quote.text.length>120){

        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    complete();


}


//Get Quotes from api
async function getQuotes() {
  loading();
  const url = "https://type.fit/api/quotes";
  try {
    const response = await fetch(url);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
}

//tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');


}

//onload
getQuotes()  
