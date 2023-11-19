import express from "express";
import { addFeatures, getFeatures, getFeature, editFeature, deleteFeature } from "../controllers/feature.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post("/features", upload.single('image'),  addFeatures);
router.get("/features",  getFeatures);
router.get("/feature/:featureId",   getFeature);
router.put("/feature/update:featureId", upload.single('image'),  editFeature);
router.delete("/feature/delete/:id",  deleteFeature);


export default router;