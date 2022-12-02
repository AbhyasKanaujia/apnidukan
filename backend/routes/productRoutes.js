import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import Product from '../models/productModel.js'
import {
  getProducts,
  getNearbyProducts,
  getProductById,
} from '../controllers/productController.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
router.get('/', getProducts)

// @desc   Fetch all nearby products
// @route  GET /api/products
// @access Public
router.get('/nearby', getNearbyProducts)

// @desc   Fetch a single products
// @route  GET /api/products/:id
// @access Public
router.get('/:id', getProductById)

export default router
