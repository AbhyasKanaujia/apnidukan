import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'user name is required'],
    },
    phone: {
      type: String,
      required: [true, 'user phone number is required'],
      unique: [true, 'user phone number must be unique'],
    },
    email: {
      type: String,
      required: [true, 'user email is required'],
      unique: [true, 'user email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'user password is required'],
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'user admin status is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
