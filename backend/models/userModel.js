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
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
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