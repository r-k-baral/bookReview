import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addReview,
  updateReview,
  deleteReview,
  deleteReviewAdmin ,
  deleteReviewerAdmin,
   GetAllReviewer
} from "../controllers/reviewController.js";

const router = express.Router();


// Add review
router.post("/books/:isbn",authMiddleware,addReview);


// Update review
router.put("/:reviewId",authMiddleware,updateReview);


// Delete review
router.delete("/:reviewId",authMiddleware,deleteReview);

//  admin can see
router.get("/admin/reviewerall",authMiddleware, GetAllReviewer );

// Delete by admin

router.delete("/admin/:reviewId",authMiddleware,deleteReviewAdmin );

router.delete("/admin/reviewer/:reviewerId",authMiddleware,deleteReviewerAdmin );



export default router;