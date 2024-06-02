import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookDetail.css';

const BookDetail = ({ match }) => {
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(1); // Set initial rating to 1
    const [comment, setComment] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const bookId = match.params.id;
        axios.get(`http://localhost:3001/api/books/${bookId}`).then(response => {
            setBook(response.data);
        });
        axios.get(`http://localhost:3001/api/reviews?bookId=${bookId}`).then(response => {
            const reviewsData = response.data;
            setReviews(reviewsData);
            calculateAverageRating(reviewsData);
        });
    }, [match.params.id]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            setAverageRating(0);
            return;
        }
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        const average = sum / reviews.length;
        setAverageRating(average.toFixed(1));
    };

    const validateForm = () => {
        const errors = {};
        if (rating < 1 || rating > 5) {
            errors.rating = 'Rating must be between 1 and 5.';
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
            const newReview = { id: response.data.id, rating, comment };
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);
            calculateAverageRating(updatedReviews);
            setRating(1); // Reset rating to 1
            setComment('');
            setFormErrors({});
        });
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="book-detail-container">
            <h1 className="book-title">{book.title}</h1>
            <h2 className="book-author">{book.author}</h2>
            <p className="book-description">{book.description}</p>
            <p className="average-rating">Average Rating: {averageRating}</p>
            <div className="reviews-container">
                <h3>Reviews</h3>
                {reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <p className="review-rating">Rating: {review.rating}</p>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
                <div className="submit-review-container">
                    <h3>Submit a Review</h3>
                    <div>
                        <label className="submit-review-label">Rating:</label>
                        <input
                            type="number"
                            value={rating}
                            onChange={e => {
                                const newRating = Math.max(1, Math.min(5, Number(e.target.value)));
                                setRating(newRating);
                            }}
                            min="1"
                            max="5"
                        />
                        {formErrors.rating && <div className="error">{formErrors.rating}</div>}
                    </div>
                    <div>
                        <label className="submit-review-label">Comment:</label>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        ></textarea>
                        {formErrors.comment && <div className="error">{formErrors.comment}</div>}
                    </div>
                    <button className="submit-review-button" onClick={submitReview}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
