// In-memory data storage
import Pagination from "../utils/pagination.js";
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    isbn: "9780743273565",
    publishedYear: 1925,
    authorId: 1,
    availableCopies: 3,
    totalCopies: 5
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    isbn: "9780061120084",
    publishedYear: 1960,
    authorId: 2,
    availableCopies: 2,
    totalCopies: 4
  },
  {
    id: 3,
    title: "1984",
    isbn: "9780451524935",
    publishedYear: 1949,
    authorId: 3,
    availableCopies: 5,
    totalCopies: 5
  },
  {
    id: 4,
    title: "To Kill a Monkey",
    isbn: "9780451768987",
    publishedYear: 2025,
    authorId: 4,
    availableCopies: 6,
    totalCopies: 3
  }
];

 let nextId = 5;

  export const getAllBooks = ( page, offset, limit ) => {
        return Pagination.paginate(books, page, offset, limit);
    }

  export const getBookById = (id) => {
        return books.find((book) => book.id === id)
    }

  export const createBook = (bookData) => {
    const newBook = { id: nextId, ...bookData };
    books.push(newBook);
    nextId++;
    return newBook;
  }

  export const updateBook = (id, bookData) => {
        
    let bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return null;
    }

    if (bookData.title) {
      books[bookIndex].title = bookData.title;
    }

    if (bookData.isbn) {
      books[bookIndex].isbn = bookData.isbn;
    }

    if (bookData.publishedYear) {
      books[bookIndex].publishedYear = bookData.publishedYear;
    }

    if (bookData.authorId) {
      books[bookIndex].authorId = bookData.authorId;
    }

    if (bookData.availableCopies) {
      books[bookIndex].availableCopies = bookData.availableCopies;
    }

    if (bookData.totalCopies) {
      books[bookIndex].totalCopies = bookData.totalCopies;
    }

    return books[bookIndex];
    }

   export const deleteBook = (id) => {
    let bookIndex = books.findIndex((u) => u.id === id);

    if (bookIndex === -1) {
      return null;
    }

    return books.splice(bookIndex, 1)[0];
    }

   export const searchBooksByTitle = (query) => {
  if (!query) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerQuery)
  );
};


   export const getBooksByAuthor = (authorId) => {
  return books.filter(book => book.authorId === parseInt(authorId));
};

   export const getAvailableBooks = () => {
  return books.filter(book => book.availableCopies > 0);
};
