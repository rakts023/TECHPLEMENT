import React, { useEffect, useState } from 'react';
import './Home.css'
import axios from 'axios';

const Home = () => {

    const [quotes, setQuotes] = useState([])
    const [author, setAuthor] = useState([])
    const [filteredQuotes, setFilteredQuotes] = useState([])

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axios.get('/api/quotes')
                setQuotes(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchQuotes()
    }, [])

    const handleSearch = () => {
        if (author === '') {
            alert("Enter Author Name")
        } else {
            const result = quotes.filter(quote =>
                quote.author.toLowerCase() === author.toLowerCase()
            )            
            if (result.length === 0) {
                alert("No quotes found for this author")
            }
            setFilteredQuotes(result)
        }
    }
   

    return (
        <div className="search-bar">
            <h1>Quote of the Day</h1>
            <input type="text" placeholder="Search by author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            {
                filteredQuotes.map((quote, index) => (
                    <div key={index}>
                    <p><strong>{quote.author}:</strong> {quote.quote}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;