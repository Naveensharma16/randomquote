// function to fetch the api result

const fetchQuote = async () =>{
        try {
            const response = await fetch(`https://programming-quotes-api.herokuapp.com/quotes/random`);
            const data = await response.json();
            return data;
        } catch (error) {
            return error.message;
        }
}


const fetchByAuthor = async (name) =>{
    try {
        const response = await fetch(`https://programming-quotes-api.herokuapp.com/quotes/author/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}


const showQuote = async () =>{
    const quote = await fetchQuote();
    const insert = ` <blockquote>
    "${quote.en}"
</blockquote>
<div class="author">
    <h6>${quote.author}</h6>
    <img src="./assets/arrow.png" alt="arrow">
</div>`
document.querySelector(".quote").style.display="block";
document.querySelector(".auth-all-quote").style.display="none";
document.querySelector(".quote").innerHTML = insert;
}

showQuote();



const showAllQuote = async (value) =>{
    const quotes = await fetchByAuthor(value);

    console.log(quotes);

  const quoteList=  quotes.map((quote) =>{
        return(
            ` 
            <blockquote>
            "${quote.en}"
        </blockquote>`
        )
    })

document.querySelector(".quote").style.display="none";
document.querySelector(".auth-all-quote").style.display="block";
document.querySelector(".auth-all-quote").innerHTML = `
        <h3>${value}</h3>
        ${quoteList}`      
}


// creating a event listner on random


document.querySelector(".refresh-quote button").addEventListener('click',() =>{
    showQuote(); 
})



// creating a event listner on author name

document.addEventListener('click',(e) =>{
    if(e.target && e.target.className == 'author'){
            let value = document.querySelector(".author h6").innerHTML;
            console.log(value);
            showAllQuote(value);
   }
    
})
