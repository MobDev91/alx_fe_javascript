document.addEventListener("DOMContentLoaded", function() {


    let newDiv = document.createElement("div");
    let quoteCategory = document.createElement("h3");
    let quoteParagraph = document.createElement("p");
    const showBtn = document.getElementById("newQuote");

    newDiv.appendChild(quoteCategory);
    newDiv.appendChild(quoteParagraph);
    document.body.insertBefore(newDiv, showBtn);
    let Quotes = [{text : "The measure of success is not how much time you spend doing what you love, it's how little time you spend doing what you hate.", category :"Success"},
                {text : "Having knowledge but lacking the power to express it clearly is no better than never having any ideas at all.", category : "Education"},
                {text : "The source of wisdom is whatever is going to happen to us today.", category : "Wisdom"}];

    function showRandomQuote() {
        const quoteDisplay = document.getElementById('quoteDisplay');
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - Category: ${randomQuote.category}</p>`;
        }

    function addQuote(){
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;
    let newQuoteText = document.getElementById("newQuoteText").value;
    if( newQuoteCategory !="" && newQuoteText !=""){
    Quotes.push({text : newQuoteText, category : newQuoteCategory });
    document.getElementById("newQuoteCategory").value = "";
    document.getElementById("newQuoteText").value = "";
    alert("Quote added successfuly");
    console.log(Quotes);
    }
    else {
        alert("Fields should not be empty");
    }
    }


    document.getElementById('showQuoteBtn').addEventListener("click", showRandomQuote);

     document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

});