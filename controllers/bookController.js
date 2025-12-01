import { createBook, deleteBook, getAllBooks, getAvailableBooks, getBookById, getBooksByAuthor, searchBooksByTitle, updateBook } from "../services/books.js";
import Pagination from "../utils/pagination.js";

//get all books
export const getAllBooksController = (req, res) => {
  try {
    const { page, limit, offset } = Pagination.getParams(req);

    const allBooks = getAllBooks(page, offset, limit);

    res.success(allBooks, "Books fetched successfully", 200);
  } catch (error) {
    res.error("Internal server error", 500);
  }
};

//get single book by id
export const getBookByIdController = (req, res) => {
    const id = parseInt(req.params.id);
    const book = getBookById(id);

        if (!book) {
        res.error("Book not found", 404);
        }
        res.success(book, "Book fetched successfully", 200);

}

//create book
 export const createBookController = (req, res) => {
    const bookData = req.body
    const newBook = createBook(bookData);
    
    res.success(newBook, 'Book created successfully', 201);

  }

// update a book
export const updateBookController = (req, res) => {
      const bookData = req.body;
      const id = parseInt(req.params.id);
      const updatedBook = updateBook(id, bookData);
  
  if (!updatedBook) {
    return res.error("Book not found", 404);
  }
  
  res.success(updatedBook, "Book updated successfully");
  }

// delete a book
export const deleteBookController = (req, res) => {
    const id = parseInt(req.params.id);

    const deletedBook = deleteBook(id);

     if (!deletedBook) {
            return res.error("Book not found", 404);
        }
     res.success( deletedBook, "Book deleted successfully");
    }

//search books 
export const searchBooksController = (req, res) => {
  const query = req.query.q || req.query.title || "";
  const books = searchBooksByTitle(query);
  res.success(books, "Books found");
};

//get books by an author
export const getBooksByAuthorController = (req, res) => {
  const authorId = parseInt(req.params.id);
  const books = getBooksByAuthor(authorId);
  res.success(books, `Books by author ${authorId} retrieved successfully`);
};

//get all available books
export const getAvailableBooksController = (req, res) => {
  const books = getAvailableBooks();
  res.success(books, "Available books retrieved successfully");
};     



