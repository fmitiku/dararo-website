import { db } from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getAllUser = (req, res) => {
    
    const q = "SELECT * FROM users ";
  
    db.query(q,  (err, data) => {
       if (err) return res.status(500).json(err);
       if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const users = data.map((user) => ({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        sex:user.sex,
        phone:user.phone,
        address:user.address,
        registration_date:user.registration_date,
        age:user.age,
        profile:user.profile,
        role: user.role === 1 ? 'admin' : 'user',
        
      }));
       return res.json(users);
       
    });
    
  };

  export const getTotalUser = (req, res) => {
    
    const q = "SELECT COUNT(*) as count FROM users ";
  
    db.query(q,  (err, data) => {
      if (err) return res.status(500).json(err);
      
      const count = data[0].count;
      res.json({ count })
       
    });
    
  };


  export const getUser= (req, res) => {
    const userId = req.params.userId;
    const q = `SELECT * FROM users WHERE id = ?`;
  
  
    db.query(q, [userId],  (err, data) => {
       if (err) return res.status(500).json(err);
       if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      
      
      const result = data[0];
      res.json(result);
       
    });
    
  };



export const updateUser = (req, res) => {
  
    const id = req.params.id;

    const profile = req.file ? req.file.filename : '';
    const { fullname, email, age, address, phone, password  } = req.body;
  
    let updateQuery = 'UPDATE users SET ';
  
    const updateFields = [];
    if (fullname) {
      updateFields.push('fullname = ?');
    }
    if (email) {
      updateFields.push('email = ?');
    }
  
    
  
    if (age) {
      updateFields.push('age = ?');
    }
  
    if (address) {
      updateFields.push('address = ?');
    }
  
    if (phone) {
      updateFields.push('phone = ?');
    }

    if (profile) {
      updateFields.push('profile = ?');
    }

    if (password) {
      updateFields.push('password = ?');
    }
  
    updateQuery += updateFields.join(', ');
    updateQuery += ' WHERE id = ?';
  
    const updateValues = [];

    if (fullname) {
      updateValues.push(fullname);
    }
    if (email) {
      updateValues.push(email);
    }
  
    
  
    if (age) {
      updateValues.push(age);
    }
  
    if (address) {
      updateValues.push(address);
    }
  
    if (phone) {
      updateValues.push(phone);
    }
  
    if (profile) {
      updateValues.push(profile);
    }

    if (password) {
      updateValues.push(password);
    }
    updateValues.push(id);

    db.query(updateQuery, updateValues, (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json(" updated successfully");
     
    });
  
};


export const deleteUser = (req, res) => {
  const userId = req.params.id ;
  const q = "DELETE FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
   
    return res.status(200).json(" user deleted successfull");
   
  });
};




export const subscribe = (req, res) => {
  const token = req.cookies.accessToken;
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!token) return res.status(401).json("You have to login!");

  jwt.verify(token,  secretKey, (err, userInfo) => {
    if (err) return res.status(403).json("Authentication failed!");
    const id = req.params.id;
    const { subscription } = req.body;
  
    let updateQuery = 'UPDATE users SET ';
  
    const updateFields = [];
  
    if (subscription) {
      if (subscription === "subscribe") {
        updateFields.push('subscription = 1');
      } else if (subscription === "unsubscribe") {
        updateFields.push('subscription = 0');
      }
    }
  
   
  
    updateQuery += updateFields.join(', ');
    updateQuery += ' WHERE id = ?';
  
    const updateValues = [];
  
    updateValues.push(id);

    db.query(updateQuery, updateValues,  (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("subscribed!");
       
      }
    );
  });
 
};


export const getTotalSubscriber = (req, res) => {
    
  const q = "SELECT COUNT(*) as count FROM users WHERE subscription = 1";

  db.query(q,  (err, data) => {
    if (err) return res.status(500).json(err);
    
    const count = data[0].count;
    res.json({ count })
     
  });
  
};