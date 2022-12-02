import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Radar from 'radar-sdk-js'
import { useDebounce } from 'use-debounce'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [coordinate, setCoordinate] = useState([0, 0])
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(null)

  const [manualAddress] = useDebounce(address, 3000)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const location = useLocation()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, userInfo, navigate])

  useEffect(() => {
    const getLocation = (location) => {
      setCoordinate([location.coords.latitude, location.coords.longitude])
      Radar.reverseGeocode(location.coords, function (err, result) {
        if (!err) {
          if (address !== result.addresses[0].formattedAddress) {
            setAddress(result.addresses[0].formattedAddress)
          }
        }
      })
    }

    const handleError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setMessage('User denied the request for Geolocation.')
          break
        case error.POSITION_UNAVAILABLE:
          setMessage('Location information is unavailable.')
          break
        case error.TIMEOUT:
          setMessage('The request to get user location timed out.')
          break
        default:
          setMessage('An unknown error occurred.')
          break
      }
    }

    navigator.geolocation.getCurrentPosition(getLocation, handleError)

    console.log(`On Page load got coordinates: `, coordinate[0])
  }, [])

  useEffect(() => {
    const getLatLong = () => {
      Radar.geocode({ query: address }, function (err, result) {
        if (!err) {
          console.log(result.addresses[0])
          setCoordinate([
            result.addresses[0].latitude,
            result.addresses[0].longitude,
          ])
        }
      })
    }
    getLatLong()
  }, [manualAddress])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) setMessage('Passwords do not match')
    else
      dispatch(
        register(
          name,
          email,
          phone,
          address,
          password,
          coordinate[0],
          coordinate[1]
        )
      )
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='py-1' controlId='email'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='tel'
            placeholder='Enter Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='py-1' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='py-1' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='py-1' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button className='my-3' type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-1'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
      <p>Address: {address}</p>
      <p>Coordinates: {`(${coordinate[0]}, ${coordinate[1]})`}</p>
    </FormContainer>
  )
}

export default RegisterScreen
