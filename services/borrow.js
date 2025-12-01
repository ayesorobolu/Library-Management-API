import { getBookById, updateBook } from "./books.js";

let borrows = [
  {
    id: 1,
    bookId: 1,
    borrowerName: "John Doe",
    borrowDate: "2025-11-15",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: 2,
    bookId: 2,
    borrowerName: "Jane Smith",
    borrowDate: "2025-11-01",
    returnDate: "2025-11-10",
    status: "returned"
  },
{
  id: 3,
  bookId: 3,
  borrowerName: "Michael Johnson",
  borrowDate: "2025-11-20",
  returnDate: null,
  status: "borrowed"
},
{
  id: 4,
  bookId: 4,
  borrowerName: "Emily Carter",
  borrowDate: "2025-10-28",
  returnDate: "2025-11-05",
  status: "returned"
},
{
  id: 5,
  bookId: 5,
  borrowerName: "Daniel Brown",
  borrowDate: "2025-11-12",
  returnDate: null,
  status: "borrowed"
}
]

let nextId = 6;

export const getAllBorrow = () => {
return borrows
}

export const getBorrowById = (id) => {
const findBorrowers = borrows.find((borrow) => borrow.id === id)
return findBorrowers
}

export const createBorrow = (borrowData) => {
  const { bookId, borrowerName } = borrowData;
  
  // 1. Check if book exists
  const book = getBookById(bookId);
  if (!book) {
    return { error: "Book not found" };
  }
  
  // 2. Check if copies are available
  if (book.availableCopies <= 0) {
    return { error: "No copies available" };
  }
  
  // 3. Check if borrower already has this book (unreturned)
 const existingBorrow = borrows.find((borrow) => borrow.bookId === bookId && borrow.borrowerName === borrowerName && borrow.status === "borrowed"
  );
  
  if (existingBorrow) {
    return { error: "Borrower already has this book" };
  }
  
  // 4. Decrease available copies
  updateBook(bookId, { availableCopies: book.availableCopies - 1 });
  
  // 5. Create borrow record
  const newBorrow = {
    id: nextId,
    bookId,
    borrowerName,
    borrowDate: new Date().toISOString().split('T')[0],
    returnDate: null,
    status: "borrowed"
  };
  
  borrows.push(newBorrow);
  nextId++;
  
  return { borrow: newBorrow };
};


export const returnBorrow = (borrowId) => {
  // 1. Find the borrow record index
  const borrowIndex = borrows.findIndex((b) => b.id === borrowId);

  if (borrowIndex === -1) {
    return { error: "Borrow record not found" };
  }

  // 2. Get the borrow record
  const borrow = borrows[borrowIndex];

  // 3. Check if already returned
  if (borrow.status === "returned") {
    return { error: "Book already returned" };
  }

  // 4. Get the book
  const book = getBookById(borrow.bookId);

  // 5. Increase available copies
  updateBook(book.id, {
    availableCopies: book.availableCopies + 1
  });

  // 6. Update borrow record
  borrow.returnDate = new Date().toISOString().split("T")[0];
  borrow.status = "returned";

  return {
    success: true,
    message: "Book returned successfully",
    borrow
  };
};

export const getOverdueBorrow = () => {
const today = new Date();
const fourteenDaysAgo = new Date(today);
fourteenDaysAgo.setDate(today.getDate() - 14);

return borrows.filter((borrow) => {
  if (borrow.status !== "borrowed") return false;
  
  const borrowDate = new Date(borrow.borrowDate);
  return borrowDate < fourteenDaysAgo;
});
}
