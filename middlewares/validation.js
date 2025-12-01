import { getBookById } from "../services/book.js";
import { getAuthorById } from "../services/author.js";

//Validate book data
export const validateBook = (req, res, next) => {
  const { title, isbn, publishedYear, availableCopies, totalCopies, authorId } = req.body;
  const errors = [];
  
  // Title validation
  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  } else if (title.length > 200) {
    errors.push("Title must be max 200 characters");
  }
  
  // ISBN validation
  if (!isbn) {
    errors.push("ISBN is required");
  } else if (!/^\d{13}$/.test(isbn)) {
    errors.push("ISBN must be exactly 13 digits");
  }
  
  // Published year validation
  const currentYear = new Date().getFullYear();
  if (!publishedYear) {
    errors.push("Published year is required");
  } else if (publishedYear < 1800 || publishedYear > currentYear) {
    errors.push(`Published year must be between 1800 and ${currentYear}`);
  }
  
  // Available copies validation
  if (availableCopies === undefined || availableCopies === null) {
    errors.push("Available copies is required");
  } else if (availableCopies < 0) {
    errors.push("Available copies cannot be negative");
  }
  
  // Total copies validation
  if (totalCopies === undefined || totalCopies === null) {
    errors.push("Total copies is required");
  } else if (totalCopies < availableCopies) {
    errors.push("Total copies must be greater than or equal to available copies");
  }
  
  // Author ID validation
  if (!authorId) {
    errors.push("Author ID is required");
  } else {
    const author = getAuthorById(authorId);
    if (!author) {
      errors.push("Author does not exist");
    }
  }
  
  // If there are errors, return them
  if (errors.length > 0) {
    return res.error(errors.join(", "), 400);
  }
  
  // Validation passed
  next();
};

/**
 * Validate author data
 */
export const validateAuthor = (req, res, next) => {
  const { name, birthYear, country } = req.body;
  const errors = [];
  
  // Name validation
  if (!name || name.trim().length === 0) {
    errors.push("Name is required");
  } else if (name.length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (name.length > 100) {
    errors.push("Name must be max 100 characters");
  }
  
  // Birth year validation
  const currentYear = new Date().getFullYear();
  if (!birthYear) {
    errors.push("Birth year is required");
  } else if (birthYear < 1500 || birthYear > currentYear) {
    errors.push(`Birth year must be between 1500 and ${currentYear}`);
  }
  
  // Country validation
  if (!country || country.trim().length === 0) {
    errors.push("Country is required");
  } else if (country.length < 2) {
    errors.push("Country must be at least 2 characters");
  }
  
  // If there are errors, return them
  if (errors.length > 0) {
    return res.error(errors.join(", "), 400);
  }
  
  // Validation passed
  next();
};

/**
 * Validate borrow data
 */
export const validateBorrow = (req, res, next) => {
  const { bookId, borrowerName } = req.body;
  const errors = [];
  
  // Book ID validation
  if (!bookId) {
    errors.push("Book ID is required");
  } else {
    const book = getBookById(bookId);
    if (!book) {
      errors.push("Book does not exist");
    }
  }
  
  // Borrower name validation
  if (!borrowerName || borrowerName.trim().length === 0) {
    errors.push("Borrower name is required");
  } else if (borrowerName.length < 2) {
    errors.push("Borrower name must be at least 2 characters");
  }
  
  // If there are errors, return them
  if (errors.length > 0) {
    return res.error(errors.join(", "), 400);
  }
  
  next();
};