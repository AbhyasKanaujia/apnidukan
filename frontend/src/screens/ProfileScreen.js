import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserLocation, getUserDetails } from '../actions/userActions'
import { Map, Marker } from 'pigeon-maps'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const userLocation = useSelector((state) => state.userLocation)
  const {
    loading: loadingLocation,
    error: errorLocation,
    coordinates,
  } = userLocation

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })(getUserDetails('profile'))
      } else {
        setName(user.name)
        setPhone(user.phone)
        setEmail(user.email)
        setAddress(user.address)
        setLatitude(user.location.coordinates[0])
        setLongitude(user.location.coordinates[1])
      }
    }
  }, [dispatch, userInfo, navigate, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) setMessage('Passwords do not match')
    else {
      // DISPATCH UPDATE PROFILE
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {success && <Message variant="success">Profile Updated</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
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
            {loadingLocation ? (
              <Loader />
            ) : errorLocation ? (
              <Message variant="danger">{errorLocation}</Message>
            ) : (
              coordinates && (
                <Map
                  height={300}
                  defaultCenter={coordinates}
                  onBoundsChanged={({ center }) => {
                    setLatitude(center[0])
                    setLongitude(center[1])
                  }}
                >
                  <Marker />
                </Map>
              )
            )}
            <Form.Text>
              Latitude: {latitude} Longitude: {longitude}
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
        <h2>My Products</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
