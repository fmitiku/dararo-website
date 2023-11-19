
import { db } from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let role;
    if (req.body.role === "admin") {
      role = 1;
    } 
    else {
      role = 0;
    }
    
    const profile = req.file ? req.file.filename : '';
    const q = "INSERT INTO users(`fullname`,`email`,  `role`, `profile`, `address`, `sex`, `age`, `phone`, `password`) VALUES (?)";
    const values = [req.body.fullname, req.body.email,  role, profile, req.body.address, req.body.sex,  req.body.age, req.body.phone, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Registered Successfully.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");
const { password, ...other } = data[0];
const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: data[0].id, role:data[0].role}, secretKey);
    

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
      .status(200)
      .json({ accessToken: token, user: other });
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.");
};





