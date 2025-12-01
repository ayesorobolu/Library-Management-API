import { Router } from "express";
import { createBorrowController, getAllBorrowsController, getBorrowByIdController, getOverdueBorrowController, returnBookController } from "../controllers/borrowController";
import { validateBorrow } from '../middleware/validation.js'; 

const borrowRouter = Router();

borrowRouter.get("/", getAllBorrowsController);
borrowRouter.post("/", validateBorrow, createBorrowController);
borrowRouter.get("/:id", getBorrowByIdController);
borrowRouter.put("/:id/return", returnBookController);
borrowRouter.get("/overdue", getOverdueBorrowController);

export default borrowRouter