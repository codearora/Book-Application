import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
    return (
        <div>
            {books.map(book => (
                <div key={book.id}>
                    <Link to={`/books/${book.id}`}>
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.genre}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BookList;
