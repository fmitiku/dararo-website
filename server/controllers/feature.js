import { db } from "../database/db.js";

export const addFeatures  = (req, res) => {
    
  const image = req.file ? req.file.filename : '';
    const q = "INSERT INTO features(`titile`, `category`, `image`, `description`) VALUES (?)";
    
    const values = [
        req.body.titile,
        req.body.category,
        image,
        req.body.description,
       
      ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(" Successfull.");
    });
  
};



  export const getFeatures = (req, res) => {
     const q = "SELECT * FROM features ";
    
    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  };



  export const getFeature = (req, res) => {
    const featureId = req.params.featureId;
  
    const q = `SELECT * FROM features WHERE id = ?`;
  
    db.query(q, [featureId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) {
        return res.status(404).json({ error: 'Ad not found' });
      }
  
      const result = data[0];
      res.json(result);
    });
  };

  export const editFeature = (req, res) => {
    //const id = req.params.id;
    const featureId = req.params.featureId;
  const { titile, category,  description } = req.body;
  const image = req.file ? req.file.filename : '';
  let updateQuery = 'UPDATE features SET ';

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

  updateValues.push(featureId);
 
    db.query(updateQuery, updateValues, (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json(" updated successfully");
     
    });
  };




  export const deleteFeature= (req, res) => {
    const addId = req.params.id ;
    const q = "DELETE FROM features WHERE id=?";
  
    db.query(q, [addId], (err, data) => {
      if (err) return res.status(500).json(err);
     
      return res.status(200).json("  deleted successfully");
     
    });
  };