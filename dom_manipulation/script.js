document.addEventListener("DOMContentLoaded", function() {

    let newDiv = document.createElement("div");
    let quoteCategory = document.createElement("h3");
    let quoteParagraph = document.createElement("p");
    const showBtn = document.getElementById("newQuote");

    newDiv.appendChild(quoteCategory);
    newDiv.appendChild(quoteParagraph);
    document.body.insertBefore(newDiv, showBtn);


    let quote1 = {text : "The measure of success is not how much time you spend doing what you love, it's how little time you spend doing what you hate.", category :"Success"};
    let quote2 = {text : "Having knowledge but lacking the power to express it clearly is no better than never having any ideas at all.", category : "Education"};
    let quote3 = {text : "The source of wisdom is whatever is going to happen to us today.", category : "Wisdom"};
    let Quotes = [quote1, quote2, quote3];

    function displayRandomQuote(Q){
            Math.floor(Math.random() * (Q.length));
            let i = Math.floor(Math.random() * (Q.length));
            quoteCategory.textContent = Q[i].category;
            quoteParagraph.textContent = Q[i].text;
            console.log (Q[i].text);

    }


    showBtn.addEventListener("click", function () {
        displayRandomQuote(Quotes);
     });


});