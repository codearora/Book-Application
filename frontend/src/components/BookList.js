import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = ({ books }) => {
    return (
        <div className="book-list">
            {books.map(book => (
                <div key={book.id} className="book-item">
                    <Link to={`/books/${book.id}`}>
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">{book.author}</p>
                        <p className="book-genre">{book.genre}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BookList;