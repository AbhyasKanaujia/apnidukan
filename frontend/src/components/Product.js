import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import turf from 'turf'

const Product = ({ product, userCoordinates }) => {
  var from = turf.point([-75.343, 39.984])
  var to = turf.point([-75.534, 39.123])

  console.log(product.location.coordinates)
  console.log(userCoordinates)
  if (userCoordinates) {
    var distance = turf.distance(product.location.coordinates, userCoordinates)
  }

  return (
    <Link to={`/product/${product._id}`} className="text-decoration-none">
      <Card className="my-3 p-3 rounded">
        <Card.Img src={product.image} variant="top" />

        <Card.Body>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text>₹{product.price}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <strong>{distance.toFixed(2)} KM away</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product
