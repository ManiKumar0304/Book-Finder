import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const BookFinder = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      setBooks(response.data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Book Finder</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book title..."
      />
      <button onClick={searchBooks}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.key} style={{ marginBottom: '20px' }}>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt="Book Cover"
                style={{ width: '100px', height: '150px', objectFit: 'cover' }}
              />
              <h3>{book.title}</h3>
              <p>{book.author_name?.join(', ')}</p>
              <p>Published: {book.first_publish_year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookFinder;
