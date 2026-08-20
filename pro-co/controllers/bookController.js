import Book from "../models/Book.js";
import Review from "../models/Review.js";
import User from "../models/user.js";
import { AddBookSchema, authorSchema, isbnSchema, titleSchema } from "../validator/user-schema.js";

// add book
export const addBook = async (req, res) => {
  try {
      if(req.user.role !== "admin" && req.user.role !=="reviewer"){
      return res.status(401).json({
        message:"you can not access it"
      })
    }
  

  const result = AddBookSchema.safeParse(req.body)
  if(!result.success){
      const errorSend =  result.error.issues[0].message
      return res.status(400).json({
        error: errorSend
      })
    }
     const { isbn, title, author, description } = result.data;
    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        message: "Book already exists"
      });
    }
    const book = new Book({
      isbn,
      title,
      author,
      description
    });

   const  savebook =  await book.save();
   if(!savebook){
    return res.status(500).json({
      message:" book is not save "
    })
   }

    res.status(201).json({
      message: "Book added successfully",
      book
    });
    console.log("the book is added",book)
  } catch (error) {
    console.log("Failed to add book:" ,error.message)
    res.status(500).json({
      message: "Failed to add book",
      error: error.message
    });
  }
};
// GET ALL BOOKS
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if(!books){
      return res.status(404).json({
        message:"not found books "
      })
    }
    res.json(books);
  } catch (error) {
     console.log("Failed to get all books: ", error.message)
    res.status(500).json({
      message: "Failed to get books",
      error: error.message
    });
  }
};

// GET BOOK BY ISBN
export const getBookByISBN = async (req, res) => {
  try {
    const result  = isbnSchema.safeParse(req.params);
  if(!result.success){
    const errorINsearch = result.error.issues[0].message
    return res.status(400).json({
      message: errorINsearch
    })
  }
    const {isbn} = result.data;
    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }
    res.json(book);
    console.log("working fine book send to user", book)
  } catch (error) {
     console.log("Failed to get book by isbn :" , error.message)
    res.status(500).json({
      message: "Failed to get book",
      error: error.message
    });
  }
};
// SEARCH BY TITLE
export const searchByTitle = async (req, res) => {
  try {
    const result = titleSchema.safeParse(req.params)
      if(!result.success){
        const errorTitle = result.error.issues[0].message
        return res.status(400).json({
          message: errorTitle
        })
      }
      const {title} = result.data
    const books = await Book.findOne({
      title: {
        $regex: title,
        $options: "i"
      }
    });
    if(!books){
      return res.status(404).json({
        message:"this title book not foumd"
      })
    }
    res.json(books);
    console.log(" send searchbyTitle is  the working :", books)
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
};
// SEARCH BY AUTHOR
export const searchByAuthor = async (req, res) => {
  try {
    const result = authorSchema.safeParse(req.params)
      if(!result.success){
        const errorAuth = result.error.issues[0].message
        return res.status(400).json({
          message: errorAuth
        })
      }
      const {author} = result.data
      console.log(author);
      
    const books = await Book.find({
      author: {
        $regex: author,
        $options: "i"
      }
      
    });
        console.log("this working ",books);
      if(books.length === 0){
      return res.status(404).json({
        message:"the author book not foumd"
      })
    }
    
    
    res.json(books);
   console.log("the author wroking " , books)
  } catch (error) {
    console.log("Search failed : ", error.message)
    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
};
// GET REVIEWS FOR BOOK
export const getBookReviews = async (req, res) => {
  try {
       const result  = isbnSchema.safeParse(req.params);
  if(!result.success){
    const errorINsearch = result.error.issues[0].message
    return res.status(400).json({
      error: errorINsearch
    })
  }
    const {isbn} = result.data;
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }
    const reviews = await Review.find({
      book: book._id
    }).populate("user", "username");

    res.json(reviews);
  } catch (error) {
    console.log("Failed to get reviews : ", error.message)
    res.status(500).json({
      message: "Failed to get reviews",
      error: error.message
    });
  }
};
// all review
export const getAllreview = async(req,res) =>{
  try {

    const data = await Review.find()
    if(!data){
      return res.status(404).json({
        message:"the data is not found "
      })
    }
    res.json(data)
  } catch (error) {
    res.status(404).json({
      message:"data is not found",
      error: error.message
    })
  }
}

// delete book
export const deleteTheBook = async(req, res) =>{
 try {
      if(req.user.role !== "admin"){
      return res.status(401).json({
        message:"you can not access it only admin can delete"
      })
    }
      if(!req.params.bookId){
        return res.status(400).json({
          message:"reviewerID is not here"
        })
      }
    const books = await Book.findById(req.params.bookId);

        if(books.role === "admin"){
          return res.status(401).json({
            message:" you cannot delete your self"
          })
        }
    if (!books) {
      return res.status(404).json({
        message: "book not found"
      });
    } 
   await Book.findByIdAndDelete(req.params.bookId);

    const stillReview = await Book.findById(req.params.bookId);
    if(stillReview){
      return res.status(500).json(
        {
          message:"still the book is present"
        })
    }

    res.json({
      message: "Book deleted successfully"
    });

  } catch (error) {
     console.log("Failed to delete book : ", error.message)
    res.status(500).json({
      message: "Failed to delete book ",
      error: error.message
    });
  }
};
