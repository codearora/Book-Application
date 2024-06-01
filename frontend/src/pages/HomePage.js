// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination'; // Import Pagination component
import './HomePage.css';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(6); // Set the number of books per page

    useEffect(() => {
        axios.get('http://localhost:3001/api/books', { params: { search } }).then(response => {
            setBooks(response.data);
        });
    }, [search]);

    // Get current books
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="home-page-container">
            <h1 className="app-title">Welcome to Book Hub</h1>
            <div className="search-bar-container">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search by title, author, or genre"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <BookList books={currentBooks} />
            <Pagination
                booksPerPage={booksPerPage}
                totalBooks={books.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default HomePage;
