 import express from "express";
import { createContact, getContacts, editContact, deleteContact, getContact } from "../controllers/contact.js";

const router = express.Router();

router.post("/contact",  createContact);
router.get("/contacts",  getContacts);
router.get("/contact/:userId",   getContact);
router.put("/contact/update:userId",   editContact);
router.delete("/contact/delete/:id",  deleteContact);


export default router;