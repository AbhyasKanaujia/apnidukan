import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'
import { Map, Marker } from 'pigeon-maps'

const ProductEditScreen = () => {
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

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const navigate = useNavigate()
  const params = useParams()

  const productId = params.id

  useEffect(() => {
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
  }, [dispatch, productId, product])

  const submitHandler = (e) => {
    e.preventDefault()
    // UPDATE PRODUCT
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
                  <Form.Label>Location</Form.Label>
                  <Map
                    height={300}
                    defaultCenter={product.location.coordinates}
                    onBoundsChanged={({ center }) => {
                      setLocation({
                        type: 'Point',
                        coordinates: [center[0], center[1]],
                      })
                    }}
                  >
                    <Marker />
                  </Map>
                  <Form.Text>
                    Latitude: {location.coordinates[0]} Longitude:
                    {location.coordinates[1]}
                  </Form.Text>
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
                src={image}
                className="img-responsive"
                width="100%"
                height="auto"
              />
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="py-1" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="py-1" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
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
