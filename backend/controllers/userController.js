import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc   Auth user & get a token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      location: user.location,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error(`Invalid Email or Password`)
  }
})

// @desc   Register a new year
// @route  POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, email, address, location, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error(`User already exists`)
  }

  const user = await User.create({
    name,
    phone,
    email,
    address,
    location,
    password,
  })

  if (user) {
    res.status(201)
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      location: user.location,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error(`Invalid User Data`)
  }
})

// @desc   get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = User.findById(req.user._id).select('-password')
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      location: user.location,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }
})

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = User.findById(req.user._id).select('-password')
  if (user) {
    user.name = req.body.name || user.name
    user.phone = req.body.phone || user.phone
    user.email = req.body.email || user.email
    user.address = req.body.address || user.address
    user.location = req.body.location || user.location
    if (req.body.password) User.password = req.body.password

    const updatedUser = await user.save()
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      address: updatedUser.address,
      location: updatedUser.location,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }
})

export { authUser, registerUser, getUserProfile, updateUserProfile }
