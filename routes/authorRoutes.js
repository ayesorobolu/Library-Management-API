import { Router } from "express";
import { authenticate } from '../middlewares/auth.js';
import { validateAuthor } from '../middlewares/validation.js';
import { createAuthorController, deleteAuthorController, getAllAuthorsController, getAuthorByIdController, updateAuthorController } from "../controllers/authorController.js";

const authorRouter = Router();

authorRouter.get("/", getAllAuthorsController);
authorRouter.post("/", authenticate, validateAuthor, createAuthorController);
authorRouter.get("/:id", getAuthorByIdController);
authorRouter.put("/:id", authenticate, validateAuthor, updateAuthorController);
authorRouter.delete("/:id", authenticate, deleteAuthorController);

export default authorRouter;