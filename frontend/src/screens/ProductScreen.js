import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Marker } from 'pigeon-maps'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, getSellerDetails } from '../actions/productActions'

const ProductScreen = () => {
  const [showDetails, setShowDetails] = useState(false)

  // get id from URL
  const id = useParams().id
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const sellerDetails = useSelector((state) => state.sellerDetails)
  const { loading: loadingSeller, error: errorSeller, seller } = sellerDetails

  // on: page load
  // do:
  //      get a single product by id from backend asynchronously
  //      update product state
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

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
          <Col md={6}>
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
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
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
                        defaultCenter={seller.location.coordinates}
                        defaultZoom={11}
                      >
                        <Marker
                          width={50}
                          anchor={seller.location.coordinates}
                        />
                        <Marker
                          width={50}
                          anchor={seller.location.coordinates}
                        />
                      </Map>
                    </>
                  ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
