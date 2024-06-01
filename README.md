# Book Review Application

Welcome to the Book Review Application! This web application allows users to browse, search, and review books. Users can explore a collection of books, view book details, submit their own reviews, and more.

## Features

- Browse and search for books by title, author, or genre.
- View detailed information about each book, including title, author, description, average rating, and user reviews.
- Submit reviews for books, including a rating and comment.
- User-friendly interface with responsive design.

## Technologies Used

- Frontend:
  - HTML, CSS
  - JavaScript
  - React.js

- Backend:
  - Node.js
  - Express.js
  - SQLite (database)

## Getting Started

To run the Book Review Application locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/codearora/Book-Application.git
   ```

2. Navigate to the project directory:

   ```
   cd Book Application
   ```

3. Install dependencies:

   ```
   cd frontend
   npm install
   cd backend
   npm install
   ```

4. Start the frontend development server:

   ```
   cd frontend
   npm start
   ```

5. Start the backend server:

   ```
   cd backend
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Sending Requests to the Backend API

To send requests to the backend API, you can use tools like `curl` or `Invoke-RestMethod` in PowerShell. Below is an example of how to send a POST request to add a new book:

```powershell
$bodyJsonString = '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "description": "A fantasy novel about the adventures of Bilbo Baggins.",
    "genre": "Fantasy"
}'

Invoke-RestMethod -Uri 'http://localhost:3001/api/books' -Method Post -Body $bodyJsonString -ContentType 'application/json'
```

This command will add a new book titled "The Hobbit" to the database via the backend API.

## Contributors

- Jai Arora (jaiarora75977@gmail.com)
- LinkedIn-https://www.linkedin.com/in/jaiarora6377

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
