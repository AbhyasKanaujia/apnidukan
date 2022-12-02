import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { listNearbyProducts } from '../actions/productActions'

import Product from '../components/Product'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productListNearby = useSelector((state) => state.productListNearby)
  const { loading, products, error } = productListNearby

  // on: page load
  // do:
  //    get all products from backend asynchronously
  //    update products state in redux
  useEffect(() => {
    dispatch(listNearbyProducts())
  }, [dispatch])

  return (
    <>
      <h1>Recommended Products near you</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <h3>
                <Product product={product} />
              </h3>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
