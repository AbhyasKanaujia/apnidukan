import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@apnidukan.com',
    password: bcrypt.hashSync('adminadmin', 10),
    phone: '9635874125',
    address: 'Imageinary Highway',
    isAdmin: true,
    latitude: 59,
    longitude: 44,
  },
  {
    name: 'Kavya Bhatnagar',
    email: 'kavya@gmail.com',
    password: bcrypt.hashSync('kavya123', 10),
    phone: '9635874125',
    address: 'Imageinary Highway',
    latitude: 23,
    longitude: 15,
  },
  {
    name: 'Anisu Neeti Kanaujia',
    email: 'anisu@gmail.com',
    password: bcrypt.hashSync('anisu123', 10),
    phone: '9635874125',
    address: 'Imageinary Highway',
    latitude: 88,
    longitude: 22,
  },
]

export default users
