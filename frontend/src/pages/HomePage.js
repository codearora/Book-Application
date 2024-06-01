import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/books', { params: { search } }).then(response => {
            setBooks(response.data);
        });
    }, [search]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title, author, or genre"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <BookList books={books} />
        </div>
    );
};

export default HomePage;
