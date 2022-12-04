import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import UploadWidget from '../components/UploadWidget'
import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'

import { listProductDetails, updateProduct } from '../actions/productActions'
import { getUserLocation } from '../actions/userActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ services }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState({
    type: 'Point',
    coordinates: [0, 0],
  })
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLocation = useSelector((state) => state.userLocation)
  const {
    loading: loadingLocation,
    error: errorLocation,
    coordinates,
  } = userLocation

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const navigate = useNavigate()
  const params = useParams()

  const productId = params.id

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/profile')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setAddress(product.address)
        setLocation(product.location)
        setImage(product.image)
        setCategory(product.category)
        setDescription(product.description)
        setPrice(product.price)
      }
    }
  }, [dispatch, productId, product, successUpdate, navigate])

  useEffect(() => {
    if (coordinates) {
      setLocation({
        type: 'Point',
        coordinates: [coordinates[1], coordinates[0]],
      })
    }
  }, [coordinates])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        address,
        location,
        image,
        category,
        description,
        price,
      })
    )
  }

  return (
    <>
      <Link to="/profile" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="py-1" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="py-1" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {loading ? (
              <Loader />
            ) : (
              product &&
              product.location && (
                <Form.Group>
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
              )
            )}

            <Form.Group className="py-1" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="py-1" controlId="image">
              <Form.Label>Image</Form.Label>
              <img
                alt={image}
                src={image}
                className="img-responsive my-2"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  display: 'block',
                  margin: 'auto',
                }}
              />
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <div className="my-2">
                <UploadWidget setUrl={setImage} />
              </div>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group className="py-1" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {services.map((service) => (
                  <option value={service}>{service}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="py-1" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
