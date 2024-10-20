document.addEventListener("DOMContentLoaded", function() {

async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Quotes)
          });
      const serverQuotes = await response.json();
            const fetchedQuotes = serverQuotes.map(post => ({
        text: post.title,
        category: 'Server'
      }));
      
      console.log("Fetched quotes from server: ", fetchedQuotes);
      return fetchedQuotes;
    } catch (error) {
      console.error("Error fetching quotes from server:", error);
    }
  }


function setupPeriodicSync() {
    setInterval(async () => {
      const serverQuotes = await fetchQuotesFromServer();
      
      if (serverQuotes) {
        syncWithServer(serverQuotes);
      }
    }, 60000);
  }
  

function syncQuotes(serverQuotes) {
    const mergedQuotes = [...Quotes, ...serverQuotes];
  
    const uniqueQuotes = Array.from(new Set(mergedQuotes.map(q => q.text)))
      .map(text => mergedQuotes.find(q => q.text === text));
    Quotes = uniqueQuotes;
    saveQuotes(); 
  
    alert("Quotes synced with the server!");
    populateCategories(); 
  }


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
      setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  }
  
  

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

    function createAddQuoteForm() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      Quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes(); 
        populateCategories();
        document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      alert("New quote added successfully!");
    } else {
      alert("Please enter both a quote and a category.");
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

    function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    const categories = [...new Set(Quotes.map(quote => quote.category))]; 
  
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      categoryFilter.value = savedCategory;
      filterQuotes();
    }
  }
  
    function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    const filteredQuotes = selectedCategory === 'all' 
      ? Quotes 
      : Quotes.filter(quote => quote.category === selectedCategory);
    
    quoteDisplay.innerHTML = filteredQuotes.map(quote => `<p>"${quote.text}" - Category: ${quote.category}</p>`).join('');
  
    localStorage.setItem('selectedCategory', selectedCategory);
    }
  
    document.getElementById('showQuoteBtn').addEventListener("click", showRandomQuote);
    document.getElementById('addQuoteBtn').addEventListener('click', createAddQuoteForm);
    document.getElementById('importFile').addEventListener("change", importFromJsonFile);
    document.getElementById('exportJson').addEventListener('click', exportToJson);

    window.onload = function() {
        setupPeriodicSync();
      };


});