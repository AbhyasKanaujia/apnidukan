import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@apnidukan.com',
    password: bcrypt.hashSync('adminadmin', 10),
    phone: '9635874125',
    address: 'Imageinary Highway',
    isAdmin: true,
    location: { type: 'Point', coordinates: [-104.9903, 39.7392] },
  },
  {
    name: 'Kavya Bhatnagar',
    email: 'kavya@gmail.com',
    password: bcrypt.hashSync('kavya123', 10),
    phone: '9635874125',
    address: 'Imageinary Highway',
    location: {
      type: 'Point',
      coordinates: [-122.5, 37.7],
    },
  },
  {
    name: 'Anisu Neeti Kanaujia',
    email: 'anisu@gmail.com',
    password: bcrypt.hashSync('anisu123', 10),
    phone: '9635874125',
    address: 'Imageinary Highway',
    location: {
      type: 'Point',
      coordinates: [-122.5, 37.7],
    },
  },
]

export default users
