import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

import { listNearbyProducts } from '../actions/productActions'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Product from '../components/Product'
import Filter from '../components/Filter'

const HomeScreen = ({ services, ranges }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const keyword = params.keyword

  const [category, setCategory] = useState(services[0])
  const [maxDistance, setMaxDistance] = useState(ranges[3])
  const [debouncedMaxDistance] = useDebounce(maxDistance, 1000)

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
      dispatch(listNearbyProducts(keyword, category, debouncedMaxDistance))
    } else {
      navigate('/login')
    }
  }, [dispatch, keyword, userInfo, category, navigate, debouncedMaxDistance])

  return (
    <>
      <h1>Recommended Products near you</h1>
      <div className="d-flex justify-content-between flex-wrap align-center">
        <Filter
          services={services}
          ranges={ranges}
          category={category}
          setCategory={setCategory}
          maxDistance={maxDistance}
          setMaxDistance={setMaxDistance}
        />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product
                product={product}
                userCoordinates={userInfo.location.coordinates}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
