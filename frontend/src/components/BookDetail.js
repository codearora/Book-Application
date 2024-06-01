import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetail = ({ match }) => {
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const bookId = match.params.id;
        axios.get(`http://localhost:3001/api/books/${bookId}`).then(response => {
            setBook(response.data);
        });
        axios.get(`http://localhost:3001/api/reviews?bookId=${bookId}`).then(response => {
            setReviews(response.data);
        });
    }, [match.params.id]);

    const validateForm = () => {
        const errors = {};
        if (rating === 0) {
            errors.rating = 'Please select a rating.';
        }
        if (!comment.trim()) {
            errors.comment = 'Please enter a comment.';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submitReview = () => {
        if (!validateForm()) {
            return; // Don't submit if form is invalid
        }
        const bookId = match.params.id;
        axios.post('http://localhost:3001/api/reviews', { bookId, rating, comment }).then(response => {
            setReviews([...reviews, { id: response.data.id, rating, comment }]);
            setRating(0);
            setComment('');
            setFormErrors({});
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
                    <div>
                        <label>Rating:</label>
                        <input
                            type="number"
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            min="1"
                            max="5"
                        />
                        {formErrors.rating && <div className="error">{formErrors.rating}</div>}
                    </div>
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        ></textarea>
                        {formErrors.comment && <div className="error">{formErrors.comment}</div>}
                    </div>
                    <button onClick={submitReview}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
