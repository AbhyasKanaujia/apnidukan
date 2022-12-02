import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
import { getUserDetails } from '../actions/userActions'
import Radar from 'radar-sdk-js'
import { useDebounce } from 'use-debounce'

const ProductScreen = () => {
  const id = useParams().id
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [distance, setDistance] = useState(0)
  const [driveTime, setDriveTime] = useState('0 hr')
  const [walkTime, setWalkTime] = useState('0 hr')

  const [carDistance, setCarDistance] = useState({ dist: 0, time: '0 hr' })
  const [walkDistance, setWalkDistance] = useState({ dist: 0, time: '0 hr' })

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const {
    loading: loadingUserDetails,
    error: errorUserDetails,
    user: seller,
  } = userDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, successProductReview, id])

  const [loadedProduct] = useDebounce(product, 3000)

  useEffect(() => {
    if (product && product.user) dispatch(getUserDetails(product.user))
  }, [product])

  useEffect(() => {
    if (seller && seller.location) {
      Radar.getDistance(
        {
          origin: {
            latitude: userInfo.location.coordinates[0],
            longitude: userInfo.location.coordinates[1],
          },
          destination: {
            latitude: seller.location.coordinates[0],
            longitude: seller.location.coordinates[1],
          },
          modes: ['foot', 'car'],
          units: 'imperial',
        },
        function (err, result) {
          if (!err) {
            console.log(result.routes)

            setDistance(
              (result.routes.car.distance.value * 0.0003048).toFixed(2)
            )
            setDriveTime(result.routes.car.duration.text)
            setWalkTime(result.routes.foot.duration.text)
          } else {
            Radar.getDistance(
              {
                origin: {
                  latitude: userInfo.location.coordinates[0],
                  longitude: userInfo.location.coordinates[1],
                },
                destination: {
                  latitude: seller.location.coordinates[0],
                  longitude: seller.location.coordinates[1],
                },
                modes: ['car'],
                units: 'imperial',
              },
              function (err, result) {
                if (!err) {
                  console.log(result.routes)

                  setDistance(
                    (result.routes.car.distance.value * 0.0003048).toFixed(2)
                  )
                  setDriveTime(result.routes.car.duration.text)
                  setWalkTime(result.routes.foot.duration.text)
                }
              }
            )
          }
        }
      )
    }
  }, [seller])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta
            title={product.name}
            description={product.description}
            keywords={`cheap ${product.category}, best ${product.category} product`}
          />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {false &&
                    'hide how many user can order' &&
                    product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  <ListGroup.Item>
                    <Button
                      onClick={() => setShowInfo((prevState) => !prevState)}
                      className='col-12'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Get seller info
                    </Button>
                  </ListGroup.Item>
                  {showInfo && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Seller Name</Col>
                          <Col>{seller.name}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Seller Address</Col>
                          <Col>{seller.address}</Col>
                        </Row>
                      </ListGroup.Item>
                      {distance !== 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Distance</Col>
                            <Col>{distance} KM</Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      {walkTime !== '0 hr' && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Walking Time</Col>
                            <Col>{walkTime}</Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      {driveTime !== '0 hr' && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Drive Time</Col>
                            <Col>{driveTime}</Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Row>
                          <Col>Phone Number</Col>
                          <Col>{seller.phone}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Email</Col>
                          <Col>{seller.email}</Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        className='my-3 col-12'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
