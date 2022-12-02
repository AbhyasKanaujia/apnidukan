import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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

userSchema.index({ location: '2dsphere' })

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
