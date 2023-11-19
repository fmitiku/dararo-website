
import express from "express";
import fs from "fs";
import { db } from "./database/db.js";
import {createNews, createUsers, createFeedback, createContact,  createAds, createFeature} from "./schema/schemas.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import contactRoute from "./routes/contact.js";

import feedbackRoute from "./routes/feedback.js";
import adsRoute from "./routes/ads.js";
import featureRoute from "./routes/feature.js";
import cors from "cors";
import jwt from "jsonwebtoken";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();


app.use(express.static('public'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/", userRoute );
app.use("/", feedbackRoute );
app.use("/", contactRoute );

app.use("/", adsRoute );
app.use("/", featureRoute );

// Create user table
createUsers();

// Create news table
createNews();

// Create contacts table
createContact();

// Create feedback table
createFeedback();



//create ads table
createAds();

// Create feature table
createFeature();



const port=process.env.PORT;
app.listen(port, () => {
  console.log (`server running on  port:${port}`);
})
