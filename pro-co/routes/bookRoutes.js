import express from "express";

import {
  getAllBooks,
  getBookByISBN,
  searchByTitle,
  searchByAuthor,
  getBookReviews,
  addBook,
  deleteTheBook,
  getAllreview
  
} from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();


// ADD BOOK
router.post("/", authMiddleware,addBook);


// GET all books
router.get("/", getAllBooks);


// Search by title
router.get("/title/:title", searchByTitle);


// Search by author
router.get("/author/:author", searchByAuthor);


// Get reviews for a book
router.get("/:isbn/reviews", getBookReviews);


// Get book by ISBN
router.get("/:isbn", getBookByISBN);

// all review 
router.get("/allreviw/all", getAllreview);


// admin delete book

router.delete("/delete/:bookId",authMiddleware,deleteTheBook);


export default router;