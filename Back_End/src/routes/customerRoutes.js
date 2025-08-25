import express from "express";
import { getCustomersWithOrders, getCustomerById } from "../controllers/customerController.js";

const router = express.Router();

// Get all customers with order summary
router.get("/", getCustomersWithOrders);

// Get single customer details by ID
router.get("/:id", getCustomerById);

export default router;
