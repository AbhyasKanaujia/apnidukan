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
  updateProduct,
  createProduct,
} from '../controllers/productController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, createProduct)
router.get('/my', protect, getMyProducts)
router.get('/nearby', getNearbyProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct)
router.get('/:id/seller', getSellerDetails)

export default router
