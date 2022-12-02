import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright © 2022
            {new Date().getFullYear() > 2022 &&
              '-' + new Date().getFullYear()}{' '}
            Centrex Student Services
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
