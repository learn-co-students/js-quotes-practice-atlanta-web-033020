const QUOTES_WITH_LIKES_URL = 'http://localhost:3000/quotes?_embed=likes'

document.addEventListener("DOMContentLoaded", () => {
    getQuotesAndLikes();
    submitBtnEvent();
})

function getQuotesAndLikes() {
    fetch(QUOTES_WITH_LIKES_URL)
        .then(res => res.json())
        .then(data => renderQuotes(data))
}

function renderQuotes(data) {
    let parentUl = document.getElementById("quote-list")
    data.map((quote) => {
        buildQuoteElement(quote, parentUl)
    })
}

function buildQuoteElement(quote, parentUl) {
    //li create
    //buildLi(parentUl, quote)
    let quoteCard = document.createElement("li")
    quoteCard.id = "quote-card"
    parentUl.appendChild(quoteCard)

    //block create
    let blockQuote = document.createElement("blockquote")
    blockQuote.className = "blockquote"
    quoteCard.appendChild(blockQuote)

    //p tag 
    let pTag = document.createElement("p")
    pTag.className = "mb-0"
    pTag.innerText = quote.quote
    blockQuote.appendChild(pTag)

    //footer 
    let footer = document.createElement("footer")
    footer.className = "blockquote-footer"
    footer.innerText = quote.author
    blockQuote.appendChild(footer)

    //br 
    let br = document.createElement("br")
    blockQuote.appendChild(br)

    //like button 
    let likeButton = document.createElement("button")
    likeButton.className = "btn-success"

    let btnSpan = document.createElement("span")
    if (quote.likes) { btnSpan.innerText = quote.likes.length } else { btnSpan.innerText = 0 }

    likeButton.innerHTML = `Likes: `
    likeButton.appendChild(btnSpan)
    blockQuote.appendChild(likeButton)
    likeButton.addEventListener("click", (e) => {
        fetch("http://localhost:3000/likes", {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    quoteId: quote.id
                })
            })
            .then(res => res.json())
        btnSpan.innerText = parseInt(e.target.children[0].innerText) + 1
    })



    //danger button
    let deleteBtn = document.createElement("button")
    deleteBtn.className = "btn-danger"
    deleteBtn.innerText = "Delete"
    blockQuote.appendChild(deleteBtn)
    deleteBtn.addEventListener("click", (e) => {
        fetch(`http:localhost:3000/quotes/${quote.id}`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(quote)
            })
            .then(res => res.json())
            .then(res => console.log(res))
        quoteCard.remove()
    })
}



function submitBtnEvent() {
    let submitBtn = document.getElementById("submit")
    submitBtn.addEventListener("click", (e) => {
        let newQuote = document.getElementById("new-quote")
        let newAuthor = document.getElementById("new-author")
        let parentUl = document.getElementById("quote-list")
        e.preventDefault()
        fetch("http://localhost:3000/quotes", {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    quote: newQuote.value,
                    author: newAuthor.value
                })
            })
            .then(res => res.json())
            .then(res => buildQuoteElement(res, parentUl))

    })
}
//build quote li
// function buildLi(parentNode, quote) {
//     let quoteCard = document.createElement("li")
//     quoteCard.id = "quote-card"
//     quoteCard.innerText = quote.quote
//     parentNode.appendChild(quoteCard)
// }