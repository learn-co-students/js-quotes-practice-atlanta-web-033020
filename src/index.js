const BASE_URL = 'http://localhost:3000/quotes?_embed=likes'
document.addEventListener('DOMContentLoaded', init)

function init(){
    fetchQuotes()
}

function fetchQuotes(){
    fetch(BASE_URL)
    .then(res => res.json())
    .then(function(quotes){
        renderQuotes(quotes)
    })
}

function renderQuotes(quotes){
    const parent = document.getElementById('quote-list')
    while ( parent.lastChild ) {
        parent.lastChild.remove()
    }
    quotes.forEach(function(quote) {
        buildQuote(quote, parent)        
    })
}

function buildQuote(quote, parent){
    const quoteLi = document.createElement('li')
    quoteLi.className = 'quote-card' 
    const blockQuote = document.createElement('blockquote')
    blockQuote.className = 'blockquote'
    const quotePtag = document.createElement('p')
    quotePtag.className = 'mb-0'
    quotePtag.innerText = quote.quote
    const quoteFooter = document.createElement('footer')
    quoteFooter.className = 'blockquote-footer'
    quoteFooter.innerText = quote.author 
    const brake = document.createElement('br')
    const likeBtn = document.createElement('button')
    likeBtn.className = 'btn-success'
    likeBtn.innerText = 'Likes | '
    likeBtn.addEventListener('click', () => {
        likeQuote(quote, blockQuote)
    })
    const likeCount = document.createElement('span')
    likeCount.innerText = quote.likes.length
    console.log(quote.likes.length)
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-danger'
    deleteBtn.innerText = 'Delete'
    deleteBtn.addEventListener('click', () => {
        deleteQuote(quote, blockQuote)
    })
    likeBtn.appendChild(likeCount)
    blockQuote.append(quotePtag, quoteFooter, brake, likeBtn, deleteBtn)
    quoteLi.appendChild(blockQuote)
    parent.appendChild(quoteLi)
}

function deleteQuote(quote, parent){
    quoteObj = {
        method: 'DELETE'
    }
    fetch (`http://localhost:3000/quotes/${quote.id}`, quoteObj)
    .then(res => res.json())
    .then(function(response){
        fetchQuotes()
    })
}

function likeQuote(quote, parent){
    quoteObj = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quoteId: quote.id
        })
    }
    fetch (`http://localhost:3000/likes`, quoteObj)
    .then(res => res.json())
    .then(function(response){
        console.log('response', response)
        fetchQuotes()
    })
}