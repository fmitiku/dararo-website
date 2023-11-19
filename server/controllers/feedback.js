import { db } from "../database/db.js";

export const createFeedback = (req, res) => {
    
  
      const q = "INSERT INTO feedbacks(`name`,`email`,`subject`,`message`) VALUES (?)";
      const values = [req.body.name, req.body.email, req.body.subject, req.body.message];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(" Successfull.");
      });
    
  };




  export const getFeedbacks = (req, res) => {
    
    const q = "SELECT * FROM feedbacks ";
  
    db.query(q,  (err, data) => {
      if (err) return res.status(500).json(err);
       return res.json(data);
       
    });
    
  };

  export const getFeedback = (req, res) => {
    const contactId = req.params.id ;
    const q = "SELECT * FROM feedbacks WHERE id=?";
  
    db.query(q, [contactId], (err, data) => {
      if (err) return res.status(500).json(err);
      const result = data[0];
      res.json(result);
    });
  };

  export const getUnreadFeedback = (req, res) => {
    const query = 'SELECT * FROM feedbacks WHERE isread = 0';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching unread feedbacks:', error);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  };


  export const deleteFeedback = (req, res) => {
    const feedbackId = req.params.id ;
    const q = "DELETE FROM feedbacks WHERE id=?";
  
    db.query(q, [feedbackId], (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json(" feedback deleted successfull");
     
    });
  };

  export const readFeedback = (req, res) => {
    const feedbackId = req.params.id;
  const isread = req.body.isread;

  const query = 'UPDATE feedbacks SET isread = ? WHERE id = ?';

  db.query(query, [isread, feedbackId], (error, results) => {
    if (error) {
      console.error('Error updating feedback:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};