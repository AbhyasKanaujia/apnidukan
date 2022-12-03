import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'

import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProductEditScreen from './screens/ProductEditScreen'

const App = () => {
  const services = [
    'Books',
    'Electronics',
    'Furniture',
    'Triffin',
    'Laundry',
    'Other',
  ]
  const ranges = [0.5, 1, 2, 3, 5, 10, 20, 30, 40, 50, 100]

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path="/"
              element={<HomeScreen services={services} ranges={ranges} />}
              exact
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            userRegister: userRegisterReducer,
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route
              path="/search/:keyword"
              element={<HomeScreen services={services} ranges={ranges} />}
            />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen services={services} />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
