import { db } from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const addAds = (req, res) => {
    
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  const secretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, secretKey, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const image = req.file ? req.file.filename : '';
  
      const q = "INSERT INTO ads(`titile`, `category`, `image`, `description`, `uid`) VALUES (?)";
  
      const values = [
        req.body.titile,
        req.body.category,
        image,
        req.body.description,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Ads has been created.");
      });
    });
  };



  export const getAds = (req, res) => {
    const q = "SELECT ads.*, users.fullName, users.profile FROM ads INNER JOIN users ON ads.uid = users.id";
    
    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  };



  export const getAdd = (req, res) => {
    const addId = req.params.addId;
  
    const q = `SELECT ads.*, users.fullName, users.profile FROM ads JOIN users ON ads.uid = users.id WHERE ads.id = ?`;
  
    db.query(q, [addId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) {
        return res.status(404).json({ error: 'Ad not found' });
      }
  
      const result = data[0];
      res.json(result);
    });
  };

  export const editAdd = (req, res) => {
    //const id = req.params.id;
    const addId = req.params.addId;
    
  const { titile, category,  description } = req.body;
const image = req.file ? req.file.filename : '';
  let updateQuery = 'UPDATE ads SET ';

  const updateFields = [];

  if (titile) {
    updateFields.push('titile = ?');
  }

  if (category) {
    updateFields.push('category = ?');
  }

  if (image) {
    updateFields.push('image = ?');
  }

  if (description) {
    updateFields.push('description = ?');
  }

  updateQuery += updateFields.join(', ');
  updateQuery += ' WHERE id = ?';

  const updateValues = [];

  if (titile) {
    updateValues.push(titile);
  }

  if (category) {
    updateValues.push(category);
  }

  if (image) {
    updateValues.push(image);
  }

  if (description) {
    updateValues.push(description);
  }

  updateValues.push(addId);
 
    db.query(updateQuery, updateValues, (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json(" updated successfully");
     
    });
  };




  export const deleteAds= (req, res) => {
    const addId = req.params.id ;
    const q = "DELETE FROM ads WHERE id=?";
  
    db.query(q, [addId], (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json("  deleted successfully");
     
    });
  };