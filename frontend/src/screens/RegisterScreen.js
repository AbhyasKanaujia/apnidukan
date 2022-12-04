import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Map, Marker } from 'pigeon-maps'

import { getUserLocation, register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [formLocation, setFormLocation] = useState({
    type: 'Point',
    coordinates: [85, 25],
  })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const userLocation = useSelector((state) => state.userLocation)
  const {
    loading: loadingLocation,
    error: errorLocation,
    coordinates,
  } = userLocation

  const location = useLocation()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, userInfo, navigate])

  useEffect(() => {
    if (coordinates && coordinates.length == 2) {
      setFormLocation({
        type: 'Point',
        coordinates: [coordinates[1], coordinates[0]],
      })
    }
  }, [coordinates])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) setMessage('Passwords do not match')
    else dispatch(register(name, phone, email, address, formLocation, password))
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="py-1" controlId="email">
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

        {/* Try interpretation and lock */}
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
          {errorLocation && <Message variant="danger">{errorLocation}</Message>}
          <Map
            height={300}
            center={[formLocation.coordinates[1], formLocation.coordinates[0]]}
            onBoundsChanged={({ center }) => {
              setFormLocation({
                type: 'Point',
                coordinates: [center[1], center[0]],
              })
            }}
          >
            <Marker />
          </Map>
          <Form.Text>
            Latitude: {formLocation.coordinates[1]} Longitude:{' '}
            {formLocation.coordinates[0]}
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

        <Button className="my-3" type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-1">
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
