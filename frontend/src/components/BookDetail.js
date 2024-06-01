import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetail = ({ match }) => {
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const bookId = match.params.id;
        axios.get(`http://localhost:3001/api/books/${bookId}`).then(response => {
            setBook(response.data);
        });
        axios.get(`http://localhost:3001/api/reviews?bookId=${bookId}`).then(response => {
            setReviews(response.data);
        });
    }, [match.params.id]);

    const submitReview = () => {
        const bookId = match.params.id;
        axios.post('http://localhost:3001/api/reviews', { bookId, rating, comment }).then(response => {
            setReviews([...reviews, { id: response.data.id, rating, comment }]);
            setRating(0);
            setComment('');
        });
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p>{book.description}</p>
            <div>
                <h3>Reviews</h3>
                {reviews.map(review => (
                    <div key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
                <div>
                    <h3>Submit a Review</h3>
                    <input
                        type="number"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                        min="1"
                        max="5"
                    />
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    ></textarea>
                    <button onClick={submitReview}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
