import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes//userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
