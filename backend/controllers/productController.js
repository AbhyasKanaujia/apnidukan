import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const category = req.query.category ? { category: req.query.category } : {}

  const products = await Product.find({
    ...keyword,
    ...category,
  })
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
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const category = req.query.category ? { category: req.query.category } : {}
  const maxDistance = req.query.maxDistance
    ? req.query.maxDistance * 1000
    : 10000

  const query = {
    ...keyword,
    ...category,
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: req.user.location.coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  }
  console.log(query)
  const products = await Product.find(query)
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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    seller: req.user.name,
    address: req.user.address,
    location: req.user.location,
    name: 'Sample name',
    image: '/images/sample.jpeg',
    category: 'Books',
    description: 'Sample description',
    price: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, address, location, image, category, description, price } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    if (product.user.equals(req.user._id) || req.user.isAdmin) {
      product.address = address
      product.location = location
      product.name = name
      product.image = image
      product.category = category
      product.description = description
      product.price = price

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(401)
      throw new Error('Only owner or admin can update a product')
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
  createProduct,
  updateProduct,
}
