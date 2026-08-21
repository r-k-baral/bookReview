import Review from "../models/Review.js";
import Book from "../models/Book.js";
import User from "../models/user.js";
// ADD REVIEW
export const addReview = async (req, res) => {
  try {
    const { isbn } = req.params; 
     if (!isbn) {
      return res.status(404).json({
        message: "isbn not found"
      });
    }
    
     const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }
    const { rating, comment } = req.body;
      if(!rating || !comment){
        return res.status(400).json({
          message:'does not have any rating and comment'
        })
      }
    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      user: req.user.id,
      book: book._id
    });
 
    if (existingReview) {
      return res.status(400).json({
        message: "You already reviewed this book"
      });
    }
    console.log(req.user.id);
   const nameOfReviewer = await User.findById(req.user.id)
    const review = new Review({
      user: req.user.id,
      book: book._id,
      username: nameOfReviewer.username,
      rating,
      comment
    });

    await review.save();

    res.status(201).json({
      message: "Review added successfully",
      review
    });

  } catch (error) {
    console.log("Failed to add review: ", error.message)
    res.status(500).json({
      message: "Failed to add review",
      error: error.message
    });
  }
};
// UPDATE REVIEW
export const updateReview = async (req, res) => {
  try {
   // const { reviewId } = req.params.reviewId;
    if(!req.params.reviewId) {
      return res.status(400).json({
        message:"reviewID is not extists"
      })
    }
    const review = await Review.findById(req.params.reviewId)
    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }
    const { rating, comment } = req.body;
    if(!rating || !comment){
      return res.status(400).json({
        message:"rating and comment is not given"
      })
    }
    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can update only your own review"
      });
    }

    review.rating = rating;
    review.comment = comment;
   // review.rating = rating;
   // review.comment = comment;
   

    await review.save();

    res.json({
      message: "Review updated successfully",
      review
    });

  } catch (error) {
    console.log("Failed to update review: ", error.message)
    res.status(500).json({
      message: "Failed to update review",
      error: error.message
    });
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
      if(!reviewId){
        return res.status(400).json({
          message:"reviewID is not here"
        })
      }
    const review = await Review.findById(reviewId);  
    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }
    // Check ownership of comment
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own review"
      });
    }
    await Review.findByIdAndDelete(reviewId);
    const stillReview = await Review.findById(reviewId);
    if(stillReview){
      return res.status(500).json(
        {
          message:"still the comment present"
        })
    }

    res.json({
      message: "Review deleted successfully"
    });

  } catch (error) {
     console.log("Failed to delete review : ", error.message)
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message
    });
  }
};
export const deleteReviewAdmin = async (req, res) => {
  try {
      if(req.user.role !== "admin"){
      return res.status(401).json({
        message:"you can not access it"
      })
    }
      if(!req.params.reviewId){
        return res.status(400).json({
          message:"reviewID is not here"
        })
      }
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    } 
   await Review.findByIdAndDelete(req.params.reviewId);

    const stillReview = await Review.findById(req.params.reviewId);
    if(stillReview){
      return res.status(500).json(
        {
          message:"still the comment present"
        })
    }

    res.json({
      message: "Review deleted successfully"
    });

  } catch (error) {
     console.log("Failed to delete review : ", error.message)
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message
    });
  }
};

export const GetAllReviewer =  async(req, res) =>{
  try {
    if(req.user.role !== "admin"){
      return res.status(401).json({
        message:" you have no access to  see all Reviewer"
      })
    }
     const users = await User.find();
      if(!users){
        return res.status(404).json({
          message:"reviewer are not found"
        })
      }
      res.json(users)
  } catch (error) {
    console.log(`errorr to get all users: ${error}`)
    res.status(404).json({
      message:"reviewer are not found are not found",
      error: error.message
    })
  }
}
export const deleteReviewerAdmin = async (req, res) => {
  try {
      if(req.user.role !== "admin"){
      return res.status(401).json({
        message:"you can not access it only admin can delete"
      })
    }
      if(!req.params.reviewerId){
        return res.status(400).json({
          message:"reviewerID is not here"
        })
      }
    const review = await User.findById(req.params.reviewerId);

        if(review.role === "admin"){
          return res.status(401).json({
            message:" you cannot delete your self"
          })
        }
    if (!review) {
      return res.status(404).json({
        message: "Reviewer not found"
      });
    } 
   await User.findByIdAndDelete(req.params.reviewerId);

    const stillReview = await User.findById(req.params.reviewerId);
    if(stillReview){
      return res.status(500).json(
        {
          message:"still the comment present"
        })
    }

    res.json({
      message: "Reviewer deleted successfully"
    });

  } catch (error) {
     console.log("Failed to delete review : ", error.message)
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message
    });
  }
};