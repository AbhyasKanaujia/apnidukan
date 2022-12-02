import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="text-decoration-none">
      <Card className="my-3 p-3 rounded">
        <Card.Img src={product.image} variant="top" />

        <Card.Body>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Card.Text as="h6">Seller: {product.seller}</Card.Text>
          <Card.Text as="h6">Address: {product.address}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product
