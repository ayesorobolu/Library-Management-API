let authors = [
  {
    id: 1,
    name: "F. Scott Fitzgerald",
    birthYear: 1896,
    country: "USA"
  },
  {
    id: 2,
    name: "Harper Lee",
    birthYear: 1926,
    country: "USA"
  },
  {
    id: 3,
    name: "George Orwell",
    birthYear: 1903,
    country: "UK"
  }
];

let nextId = 4;


export const getAllAuthors = () => {
return authors
}

export const getAuthorById = (id) => {
const findAuthor = authors.find((author) => author.id === id)
return findAuthor
}

export const createAuthor = (authorData) => {
const newAuthor = { id: nextId, ...authorData };
authors.push(newAuthor);
nextId++;
return newAuthor;
}

export const updateAuthor = (id, authorData) => {
 const checkAuthor =  authors.findIndex((author) => author.id === id)

  if (checkAuthor === -1) {
    return null
  }

  if(authorData.name) {
    authors[checkAuthor].name = authorData.name;
  }

  if(authorData.birthYear){
    authors[checkAuthor].birthYear = authorData.birthYear
  }

  if(authorData.country){
    authors[checkAuthor].country = authorData.country
  }

  return authors[checkAuthor];
}


export const deleteAuthor = (id) => {
  const authorIndex =  authors.findIndex((author) => author.id === id)


    if (authorIndex === -1) {
      return null;
    }

    return authors.splice(authorIndex, 1)[0];
    }
