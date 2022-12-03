import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import Product from '../models/productModel.js'
import {
  getProducts,
  getNearbyProducts,
  getProductById,
  getSellerDetails,
  getMyProducts,
  deleteProduct,
} from '../controllers/productController.js'

import { protect } from '../middleware/authMiddleware.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
router.get('/', getProducts)

// @desc   Fetch all products
// @route  GET /api/products
// @access Private
router.get('/my', protect, getMyProducts)

// @desc   Fetch all nearby products
// @route  GET /api/products
// @access Public
router.get('/nearby', getNearbyProducts)

// @desc   Fetch a single products
// @route  GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById).delete(protect, deleteProduct)
router.get('/:id/seller', getSellerDetails)

export default router
