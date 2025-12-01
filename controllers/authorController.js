import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../services/authors.js"

export const getAllAuthorsController = (req, res) => {
  const allAuthors = getAllAuthors();
 return res.success(allAuthors, "Authors fetched successfully")
}

export const getAuthorByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  const author = getAuthorById(id);
  
  if (!author) {
    return res.error("Author not found", 404);
  }
  
 return res.success(author, "Author fetched successfully", 200);
}

export const createAuthorController = (req, res) => {
const authorData = req.body
const newAuthor = createAuthor(authorData);
return res.success(newAuthor, "Author added successfully", 201)
}

export const updateAuthorController = (req, res) => {
const authorData = req.body
const id = parseInt(req.params.id);

  const updatedAuthor = updateAuthor(id, authorData);
  
  if (!updatedAuthor) {
    return res.error("Author not found", 404);
  }
  
 return res.success(updatedAuthor, "Author updated successfully", 200);
}

export const deleteAuthorController = (req, res) => {
    const id = parseInt(req.params.id);

    const deletedAuthor = deleteAuthor(id);
  
  if (!deletedAuthor) {
    return res.error("Author not found", 404);
  }
  
  res.success(deletedAuthor, "Author deleted successfully", 200);
}