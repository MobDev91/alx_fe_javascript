document.addEventListener("DOMContentLoaded", function() {


    let newDiv = document.createElement("div");
    let quoteCategory = document.createElement("h3");
    let quoteParagraph = document.createElement("p");
    const showBtn = document.getElementById("newQuote");

    newDiv.appendChild(quoteCategory);
    newDiv.appendChild(quoteParagraph);
    document.body.insertBefore(newDiv, showBtn);
    let Quotes = JSON.parse(localStorage.getItem('localQuotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" }
      ];

      function saveQuotes() {
        localStorage.setItem('localQuotes', JSON.stringify(Quotes));
      }
    function showRandomQuote() {
        const quoteDisplay = document.getElementById('quoteDisplay');
        const randomIndex = Math.floor(Math.random() * Quotes.length);
        const randomQuote = Quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - Category: ${randomQuote.category}</p>`;
        }

    function createAddQuoteForm(){
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;
    let newQuoteText = document.getElementById("newQuoteText").value;
    if( newQuoteCategory !="" && newQuoteText !=""){
    Quotes.push({text : newQuoteText, category : newQuoteCategory });
    saveQuotes();
    document.getElementById("newQuoteCategory").value = "";
    document.getElementById("newQuoteText").value = "";
    alert("Quote added successfuly");
    console.log(Quotes);
    }
    else {
        alert("Fields should not be empty");
    }
    }

function exportToJson() {
    const jsonStr = JSON.stringify(Quotes, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  


    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          const importedQuotes = JSON.parse(event.target.result);
          Quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
      }

    document.getElementById('showQuoteBtn').addEventListener("click", showRandomQuote);
    document.getElementById('addQuoteBtn').addEventListener('click', createAddQuoteForm);
    document.getElementById('importFile').addEventListener("change", importFromJsonFile);
    document.getElementById('exportJson').addEventListener('click', exportToJson);



});