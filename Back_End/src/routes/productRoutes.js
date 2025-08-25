import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from "../controllers/productController.js";
import { upload } from "../middlewares/uploadMiddleware.js"; // Multer setup

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get product by ID
router.get("/updateproducts/:id", getProductById);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);

// Create product
router.post("/addproducts", upload.array("images", 5), createProduct);

// Update product
router.put("/updateproducts/:id", upload.array("images", 5), updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
