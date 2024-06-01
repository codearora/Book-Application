const express = require('express');
const db = require('../db/sqlite');
const router = express.Router();

router.get('/', (req, res) => {
    const { search } = req.query;
    let query = 'SELECT * FROM books';
    if (search) {
        query += ` WHERE title LIKE '%${search}%' OR author LIKE '%${search}%' OR genre LIKE '%${search}%'`;
    }
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { title, author, description, genre } = req.body;
    const query = 'INSERT INTO books (title, author, description, genre) VALUES (?, ?, ?, ?)';
    db.run(query, [title, author, description, genre], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM books WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

module.exports = router;
