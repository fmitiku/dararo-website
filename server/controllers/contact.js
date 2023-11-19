import { db } from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


 export const createContact = (req, res) => {
      const q = "INSERT INTO contacts(`address`,`phone`,`email`,`pobox`) VALUES (?)";
      const values = [req.body.address, req.body.phone, req.body.email, req.body.pobox];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(" Successfull.");
      });
    
  };

  export const getContacts = (req, res) => {
    
    const q = "SELECT * FROM contacts ";
  
    db.query(q,  (err, data) => {
      if (err) return res.status(500).json(err);
       return res.json(data);
       
    });
    
  };

  export const getContact= (req, res) => {
    const userId = req.params.userId;
    const q = `SELECT * FROM contacts WHERE id = ?`;
  
  
    db.query(q, [userId],  (err, data) => {
       if (err) return res.status(500).json(err);
       if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
       
      

       const result = data[0];
       res.json(result);
       
    });
    
  };

  export const editContact = (req, res) => {
    //const id = req.params.id;
    const userId = req.params.userId;
  const { address, phone, pobox, email } = req.body;

  let updateQuery = 'UPDATE contacts SET ';

  const updateFields = [];

  if (address) {
    updateFields.push('address = ?');
  }

  if (phone) {
    updateFields.push('phone = ?');
  }

  if (pobox) {
    updateFields.push('pobox = ?');
  }

  if (email) {
    updateFields.push('email = ?');
  }

  updateQuery += updateFields.join(', ');
  updateQuery += ' WHERE id = ?';

  const updateValues = [];

  if (address) {
    updateValues.push(address);
  }

  if (phone) {
    updateValues.push(phone);
  }

  if (pobox) {
    updateValues.push(pobox);
  }

  if (email) {
    updateValues.push(email);
  }

  updateValues.push(userId);
 
    db.query(updateQuery, updateValues, (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json(" updated successfull");
     
    });
  };




  export const deleteContact= (req, res) => {
    const contactId = req.params.id ;
    const q = "DELETE FROM contacts WHERE id=?";
  
    db.query(q, [contactId], (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json(" contact deleted successfull");
     
    });
  };