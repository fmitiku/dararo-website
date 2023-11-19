import { db } from "../database/db.js";
//users table
export const createUsers = () => {
  const createUsersQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      sex VARCHAR(45) NULL,
      age VARCHAR(45) NULL,
      address VARCHAR(255) NULL,
      phone VARCHAR(100) NULL,
      profile VARCHAR(405) NULL,
      role TINYINT(1)  NULL DEFAULT 0,
      subscription TINYINT(1)  NULL DEFAULT 0,
     
      registration_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createUsersQuery, (err, results) => {
    if (err) {
      console.error('Error creating users: ', err);
      return;
    }
    console.log('users table created successfully');
  });
};

//news table
export const createNews = () => {
    const createNewsQuery = `
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titile VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL ,
        image VARCHAR(405) NULL,
        description VARCHAR(2255) NOT NULL,
        news_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL,
        uid INT,
        FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
  
    db.query(createNewsQuery, (err, results) => {
      if (err) {
        console.error('Error creating news table: ', err);
        return;
      }
      console.log('news table  created successfully');
    });
  };
  

  //feedbacks table
  export const createFeedback = () => {
    const createFeedbackQuery = `
      CREATE TABLE IF NOT EXISTS feedbacks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NULL,
        email VARCHAR(255) NULL ,
        subject VARCHAR(405) NULL,
        message VARCHAR(2255) NOT NULL,
        isread TINYINT(1) NOT NULL DEFAULT 0,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL
      )
    `;
  
    db.query(createFeedbackQuery, (err, results) => {
      if (err) {
        console.error('Error creating feedbacks table: ', err);
        return;
      }
      console.log('feedbacks table  created successfully');
    });
  };


  //contact table
  export const createContact = () => {
    const createContactQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(2255) NULL,
        pobox VARCHAR(405) NULL,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL
      )
    `;
  
    db.query(createContactQuery, (err, results) => {
      if (err) {
        console.error('Error creating contact table: ', err);
        return;
      }
      console.log('contact table  created successfully');
    });
  };




  export const createAds = () => {
    const createAdsQuery = `
      CREATE TABLE IF NOT EXISTS ads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titile VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL ,
        image VARCHAR(405) NULL,
        description VARCHAR(2255) NOT NULL,
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL,
        uid INT,
         FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `;
  
    db.query(createAdsQuery, (err, results) => {
      if (err) {
        console.error('Error creating ads table: ', err);
        return;
      }
      console.log('ads table  created successfully');
    });
  };


  export const createFeature = () => {
    const createFeatureQuery = `
      CREATE TABLE IF NOT EXISTS features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titile VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL ,
        image VARCHAR(405) NULL,
        description VARCHAR(2255) NOT NULL,
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL
       
      )
    `;
  
    db.query(createFeatureQuery, (err, results) => {
      if (err) {
        console.error('Error creating feature table: ', err);
        return;
      }
      console.log('feature table  created successfully');
    });
  };