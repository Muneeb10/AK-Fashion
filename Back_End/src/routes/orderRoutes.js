// routes/orderRoutes.js
import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";  // ✅ import multer
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUser,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

// Create a new order (with file upload support)
router.post("/", upload.array("files", 5), createOrder);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);
router.get("/user/:userId", getOrdersByUser);

export default router;
