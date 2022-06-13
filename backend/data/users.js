import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@apnidukan.com',
    password: bcrypt.hashSync('adminadmin', 10),
    isAdmin: true,
  },
  {
    name: 'Kavya Bhatnagar',
    email: 'kavya@gmail.com',
    password: bcrypt.hashSync('kavya123', 10),
  },
  {
    name: 'Anisu Neeti Kanaujia',
    email: 'anisu@gmail.com',
    password: bcrypt.hashSync('anisu123', 10),
  },
]

export default users
