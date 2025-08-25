import Product from "../models/Product.js";
import Category from "../models/Category.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

// Helper to delete files
const unlinkFile = (filePath) => {
  try {
    if (!filePath) return;

    const filename = path.basename(filePath);
    const fullPath = path.join(uploadDir, filename);

    console.log("Attempting to delete:", fullPath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("Deleted:", fullPath);
    } else {
      console.warn("File not found for deletion:", fullPath);
    }
  } catch (err) {
    console.error("File deletion error:", err.message);
  }
};

// Parse array fields (supports JSON string, comma-separated, or array)
const parseArrayField = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;

  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Not JSON, fallback to comma-separated
  }

  return String(val)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

// GET all products
// GET all products - newest first
// GET /api/products?category=...
export const getProducts = async (req, res) => {
  try {
    const { category, categoryId } = req.query;
    let filter = {};

    if (categoryId) filter.category = categoryId;

    // Populate category to get { _id, name }
    const products = await Product.find(filter).populate("category");

    // If filtering by category name
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(
        (p) => p.category && p.category.name === category
      );
    }

    res.json(filteredProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET /api/products/category/:category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ "category.name": category }); 
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET single product
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};





// CREATE product
export const createProduct = async (req, res, next) => {
  try {
    const { name, stock, category, rating, currentPrice, originalPrice, description } = req.body;

    if (!name || !category || !currentPrice) {
      return res.status(400).json({
        success: false,
        message: "Name, category and currentPrice are required",
      });
    }

    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);

    const product = new Product({
      name: name.trim(),
      images,
      stock: stock ? Number(stock) : 0,
      category,
      rating: rating ? Number(rating) : 0,
      currentPrice: Number(currentPrice),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      colors: parseArrayField(req.body.colors),
      sizes: parseArrayField(req.body.sizes),
      description,
    });

    await product.save();
    const populated = await product.populate("category", "name");

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// UPDATE product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { name, stock, category, rating, currentPrice, originalPrice, description } = req.body;

    if (name) product.name = name.trim();
    if (stock !== undefined) product.stock = Number(stock);
    if (category) {
      const cat = await Category.findById(category);
      if (!cat) {
        return res.status(400).json({ success: false, message: "Invalid category" });
      }
      product.category = category;
    }
    if (rating !== undefined) product.rating = Number(rating);
    if (currentPrice !== undefined) product.currentPrice = Number(currentPrice);
    if (originalPrice !== undefined) product.originalPrice = Number(originalPrice);
    if (description !== undefined) product.description = description;

    const colors = parseArrayField(req.body.colors);
    const sizes = parseArrayField(req.body.sizes);
    if (colors.length > 0) product.colors = colors;
    if (sizes.length > 0) product.sizes = sizes;

    // Remove selected images
    if (req.body.removeImages) {
      const toRemove = Array.isArray(req.body.removeImages)
        ? req.body.removeImages
        : [req.body.removeImages];

      product.images = product.images.filter((img) => {
        const shouldRemove = toRemove.includes(img) || toRemove.includes(path.basename(img));
        if (shouldRemove) unlinkFile(img);
        return !shouldRemove;
      });
    }

    // Add new images
    if (req.files?.length > 0) {
      product.images = product.images.concat(req.files.map((f) => `/uploads/${f.filename}`));
    }

    await product.save();
    const populated = await product.populate("category", "name");

    res.status(200).json(populated);
  } catch (err) {
    next(err);
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    try {
      if (product.images?.length > 0) {
        product.images.forEach((img) => unlinkFile(img));
      }
    } catch (fileErr) {
      console.warn("Image deletion warning:", fileErr.message);
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: { id: req.params.id },
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during deletion",
      error: err.message,
    });
  }
};
