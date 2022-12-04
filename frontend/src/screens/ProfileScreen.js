import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Map, Marker } from 'pigeon-maps'
import { LinkContainer } from 'react-router-bootstrap'

import {
  getUserLocation,
  getUserDetails,
  updateUserProfile,
} from '../actions/userActions'
import {
  getMyProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState({
    type: 'Point',
    coordinates: [85, 25],
  })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLocation = useSelector((state) => state.userLocation)
  const {
    loading: loadingLocation,
    error: errorLocation,
    coordinates,
  } = userLocation

  const productListMy = useSelector((state) => state.productListMy)
  const {
    loading: producctListLoading,
    error: productListError,
    products,
  } = productListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate, user, success])

  useEffect(() => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
    dispatch(getUserDetails('profile'))
  }, [successDelete, dispatch])

  useEffect(() => {
    dispatch(getMyProducts())
  }, [successDelete, dispatch])

  useEffect(() => {
    if (user && user.name) {
      setName(user.name)
      setPhone(user.phone)
      setEmail(user.email)
      setAddress(user.address)
      setLocation(user.location)
    }
  }, [user])

  useEffect(() => {
    if (coordinates) {
      setLocation({
        type: 'Point',
        coordinates: [coordinates[1], coordinates[0]],
      })
    }
  }, [coordinates])

  useEffect(() => {
    console.log(location)
  }, [location])

  useEffect(() => {
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
  }, [successCreate, createdProduct, navigate, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) setMessage('Passwords do not match')
    else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          phone,
          email,
          address,
          location,
          password,
        })
      )
    }
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = (product) => {
    dispatch(createProduct())
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {success && <Message variant="success">Profile Updated</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {productListError && (
          <Message variant="danger">{productListError}</Message>
        )}
        {producctListLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="py-1" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-1" controlId="email">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-1" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-1" controlId="email">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Location</Form.Label>
            {loadingLocation && <Loader />}
            {errorLocation && (
              <Message variant="danger">{errorLocation}</Message>
            )}
            <Map
              height={300}
              center={[location.coordinates[1], location.coordinates[0]]}
              onBoundsChanged={({ center }) => {
                setLocation({
                  type: 'Point',
                  coordinates: [center[1], center[0]],
                })
              }}
            >
              <Marker />
            </Map>
            <Form.Text>
              Latitude: {location.coordinates[1]} Longitude:{' '}
              {location.coordinates[0]}
            </Form.Text>
            <br />
            <Button
              className="my-3"
              variant="primary"
              onClick={() => dispatch(getUserLocation())}
            >
              Detect Location
            </Button>
          </Form.Group>

          <Form.Group className="py-1" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-1" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="my-3 w-100" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <Row className="align-item-center">
          <Col>
            <h1>Proucts</h1>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer
                      className="mx-2"
                      to={`/admin/product/${product._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm mx-2"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
