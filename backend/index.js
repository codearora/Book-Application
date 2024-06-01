const express = require('express');
const cors = require('cors');
const booksRouter = require('./routes/books');
const reviewsRouter = require('./routes/reviews');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
