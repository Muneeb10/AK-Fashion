import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import errorHandler from "./src/middlewares/errorMiddleware.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from './src/routes/orderRoutes.js';
import customerRoutes from './src/routes/customerRoutes.js'
import authRoutes from "./src/routes/authRoutes.js";
import userAuth from "./src/routes/userAuth.js"

import path from 'path';
import { fileURLToPath } from 'url';

import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
const allowedOrigins = process.env.CLIENT_URLS.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 



// Serve static files from the dist/build folder
// app.use(express.static(path.join(__dirname, "dist")));

// // Handle all other routes by sending index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });


app.get("/", (req, res) => {
    res.send("App is running")
})

// Routes
app.use("/api/categories", categoryRoutes);
// serve uploads folder statically so frontend can show images
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));
// register product routes
app.use("/api/products/", productRoutes);
// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/userAuth', userAuth);

app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));


app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: `Contact Form Submission from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email." });
  }
});



// Error handler
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
