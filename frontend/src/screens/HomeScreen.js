import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
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
