import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="text-decoration-none">
      <Card className="my-3 p-3 rounded">
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: '300px', width: 'auto', objectFit: 'cover' }}
        />

        <Card.Body>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text>₹{product.price}</Card.Text>
          <Card.Text>
            {product.description.length <= 80
              ? product.description
              : `${product.description.slice(0, 80)}...`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product
