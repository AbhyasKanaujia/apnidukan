import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Marker } from 'pigeon-maps'
import haversine from 'haversine-distance'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, getSellerDetails } from '../actions/productActions'

const ProductScreen = () => {
  const [showDetails, setShowDetails] = useState(false)

  // get id from URL
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const sellerDetails = useSelector((state) => state.sellerDetails)
  const { loading: loadingSeller, error: errorSeller, seller } = sellerDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // on: page load
  // do:
  //      get a single product by id from backend asynchronously
  //      update product state
  useEffect(() => {
    if (userInfo) {
      dispatch(listProductDetails(id))
    } else {
      navigate('/login')
    }
  }, [dispatch, id, navigate, userInfo])

  useEffect(() => {
    if (product && product.name) {
      dispatch(getSellerDetails(id))
    }
  }, [product, dispatch, id])

  const showDetailsHandler = () => {
    setShowDetails((prevState) => !prevState)
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} className="text-center">
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Seller</Col>
                  <Col>{product.seller}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Seller Address</Col>
                  <Col>{product.address}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Button
                      className="col-12"
                      type="button"
                      onClick={showDetailsHandler}
                    >
                      Get Seller Details
                    </Button>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {showDetails &&
                    seller &&
                    (loadingSeller ? (
                      <Loader />
                    ) : errorSeller ? (
                      <Message variant="danger">{errorSeller}</Message>
                    ) : (
                      <>
                        <ListGroup.Item>
                          <Row>
                            <Col>Distance</Col>
                            <Col>
                              {(
                                haversine(
                                  product.location.coordinates,
                                  userInfo.location.coordinates
                                ) / 1000
                              ).toFixed(2)}{' '}
                              KM
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Phone Number</Col>
                            <Col>{seller.phone}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Email Address</Col>
                            <Col>{seller.email}</Col>
                          </Row>
                        </ListGroup.Item>
                        <Map
                          height={300}
                          center={[
                            product.location.coordinates[1],
                            product.location.coordinates[0],
                          ]}
                          defaultZoom={11}
                        >
                          <Marker
                            color="#485785"
                            width={50}
                            anchor={[
                              product.location.coordinates[1],
                              product.location.coordinates[0],
                            ]}
                          />
                          <Marker
                            color="#7b8ab8"
                            width={50}
                            anchor={[
                              userInfo.location.coordinates[1],
                              userInfo.location.coordinates[0],
                            ]}
                          />
                        </Map>
                        <span
                          style={{
                            height: '1rem',
                            width: '1rem',
                            display: 'inline-block',
                            backgroundColor: '#485785',
                          }}
                        ></span>
                        <span style={{ color: '#485785' }}> {seller.name}</span>
                        <br />

                        <span
                          style={{
                            height: '1rem',
                            width: '1rem',
                            display: 'inline-block',
                            backgroundColor: '#7b8ab8',
                          }}
                        ></span>
                        <span style={{ color: '#7b8ab8' }}> You</span>
                      </>
                    ))}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
