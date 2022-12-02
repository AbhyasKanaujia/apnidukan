import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Abhyas Kumar Kanaujia',
    phone: '9635871234',
    email: 'abhyas@gmail.com',
    address: 'Jalpaiguri, West Benal',
    location: {
      type: 'Point',
      coordinates: [26.53274942898416, 88.69851847611588],
    },
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Khushboo Gupta',
    phone: '7896541230',
    email: 'khusboo@gmail.com',
    address: 'Tiwaripur, Lucknow, Uttar Pradesh',
    location: {
      type: 'Point',
      coordinates: [26.80049644875591, 80.92364894532035],
    },
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Ashish Kumar',
    phone: '8794651310',
    email: 'ashish@gmail.com',
    address: 'Mahendru, Patna, Bihar',
    location: {
      type: 'Point',
      coordinates: [25.618113490130686, 85.18314564911499],
    },
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
