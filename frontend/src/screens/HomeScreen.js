import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { listNearbyProducts } from '../actions/productActions'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Product from '../components/Product'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const keyword = params.keyword

  const productListNearby = useSelector((state) => state.productListNearby)
  const { loading, products, error } = productListNearby

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // on: page load
  // do:
  //    get all products from backend asynchronously
  //    update products state in redux
  useEffect(() => {
    if (userInfo) {
      dispatch(listNearbyProducts(keyword))
    } else {
      navigate('/login')
    }
  }, [dispatch, keyword, userInfo])

  return (
    <>
      <h1>Recommended Products near you</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
