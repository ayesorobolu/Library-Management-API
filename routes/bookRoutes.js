import  { Router } from "express"
import { authenticate } from '../middlewares/auth.js';
import { validateBook } from '../middlewares/validation.js';
import { createBookController, deleteBookController, getAllBooksController, getAvailableBooksController, getBookByIdController, getBooksByAuthorController, searchBooksController, updateBookController } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.get("/", getAllBooksController);
bookRouter.post("/", authenticate, validateBook, createBookController);
bookRouter.get("/search", searchBooksController);
bookRouter.get("/available", getAvailableBooksController);
bookRouter.get("/:id", getBookByIdController);
bookRouter.put("/:id", authenticate, validateBook, updateBookController);
bookRouter.delete("/:id", authenticate, deleteBookController);
bookRouter.get("/author/:id", getBooksByAuthorController);


export default bookRouter;
