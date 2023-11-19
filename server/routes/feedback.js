import express from "express";
import { createFeedback, getFeedbacks, getFeedback , deleteFeedback, readFeedback, getUnreadFeedback } from "../controllers/feedback.js";

const router = express.Router();

router.post("/feedback", createFeedback);
router.get("/feedback/:id",  getFeedback)

router.get("/feedbacks",  getFeedbacks)
router.get("/feedbacks/unread",  getUnreadFeedback)
router.delete("/feedback/delete/:id",  deleteFeedback)
router.put("/feedbacks/:id",  readFeedback);


export default router;