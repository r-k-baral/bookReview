import axios from "axios";

const BASE_URL = "http://localhost:5000/api/books";

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

// Get book by ISBN
export const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(`${BASE_URL}/${isbn}`);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

// Get books by author
export const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

// Get books by title
export const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/title/${encodeURIComponent(title)}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};