import { getAllBorrow, getBorrowById, createBorrow, returnBorrow, getOverdueBorrow} from "../services/borrow.js";

// Get all borrow records
export const getAllBorrowsController = (req, res) => {
  const borrows = getAllBorrow(); 
  res.success(borrows, "Borrow records retrieved successfully");
};

// Get a single borrow record by ID
export const getBorrowByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  const borrow = getBorrowById(id);
  
  if (!borrow) {
    return res.error("Borrow record not found", 404);
  }
  
  res.success(borrow, "Borrow record retrieved successfully");
};

// Create a borrow record (borrow a book)
 
export const createBorrowController = (req, res) => {
  const borrowData = req.body;
  
  const result = createBorrow(borrowData);
  
  if (result.error) {
    return res.error(result.error, 400);
  }
  
  res.success(result.borrow, "Book borrowed successfully", 201);
};


 // Return a borrowed book
export const returnBookController = (req, res) => {
  const borrowId = parseInt(req.params.id);
  const result = returnBorrow(borrowId);
  
  if (result.error) {
    return res.error(result.error, 400);
  }
  
  res.success(result.borrow, "Book returned successfully");
};

// Get overdue borrow records
 
export const getOverdueBorrowController = (req, res) => {
  const overdueBorrows = getOverdueBorrow();
  res.success(overdueBorrows, "Overdue borrows retrieved successfully");
};