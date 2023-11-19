import express from "express";
import { addAds, getAds, getAdd, editAdd, deleteAds } from "../controllers/ads.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post("/ads", upload.single('image'), addAds);
router.get("/ads",  getAds);
router.get("/add/:addId",   getAdd);
router.put("/add/update:addId",upload.single('image'),   editAdd);
router.delete("/add/delete/:id",  deleteAds);


export default router;



