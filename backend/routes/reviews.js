const express = require('express');
const db = require('../db/sqlite');
const router = express.Router();

router.get('/', (req, res) => {
    const { bookId } = req.query;
    const query = 'SELECT * FROM reviews WHERE book_id = ?';
    db.all(query, [bookId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { bookId, rating, comment } = req.body;
    const query = 'INSERT INTO reviews (book_id, rating, comment) VALUES (?, ?, ?)';
    db.run(query, [bookId, rating, comment], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

module.exports = router;
