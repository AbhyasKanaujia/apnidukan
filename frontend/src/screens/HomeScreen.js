import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'

import Product from '../components/Product'

const HomeScreen = () => {
  // store all products from backend
  const [products, setProducts] = useState([])

  // on: page load
  // do:
  //    get all products from backend asynchronously
  //    update products state
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <h3>
              <Product product={product} />
            </h3>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
