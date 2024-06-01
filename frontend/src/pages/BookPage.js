import React from 'react';
import { useParams } from 'react-router-dom';
import BookDetail from '../components/BookDetail';

const BookPage = () => {
    const { id } = useParams();
    return <BookDetail match={{ params: { id } }} />;
};

export default BookPage;
