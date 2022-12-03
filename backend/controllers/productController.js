import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc   Fetch my products
// @route  GET /api/products
// @access Private
const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user._id })
  res.json(products)
})

// @desc   Fetch all nearby products
// @route  GET /api/products
// @access Public
const getNearbyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc   Fetch a single products
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc   Get seller details
// @route  GET /api/products/:id/seller
// @access Private
const getSellerDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('product not found')
  }

  const seller = await User.findById(product.user).select('-password')
  if (seller) {
    res.json(seller)
  } else {
    res.status(404)
    throw new Error('Seller does not exist')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    if (product.user.equals(req.user._id) || req.user.isAdmin) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(401)
      throw new Error('Only owner or admin can delete a product')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getMyProducts,
  getNearbyProducts,
  getProductById,
  getSellerDetails,
  deleteProduct,
}
