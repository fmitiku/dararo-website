import express from "express";
 import { getUser , updateUser,  getAllUser, getTotalUser, deleteUser, subscribe,  getTotalSubscriber} from "../controllers/user.js";
 import { upload } from "../middlewares/uploadMiddleware.js";
 const router = express.Router();
 
router.get ("/user/:userId",    getUser)
router.get("/users",    getAllUser)
router.get("/users/subscriber", getTotalSubscriber)
router.get("/users/count",   getTotalUser)
router.put("/user/update:id", upload.single('profile'), updateUser)
router.put ("/user/subscribe/:id",  subscribe)
 router.delete ("/user/delete/:id",  deleteUser)


export default router