import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import colors from 'colors'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
