import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import BookPage from './BookPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books/:id" element={<BookPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
