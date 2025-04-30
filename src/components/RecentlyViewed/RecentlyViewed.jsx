

import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import "./RecentlyViewed.css"

const RecentlyViewed = ({ currentProductId }) => {
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    // Get recently viewed products from localStorage
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || []

    // Filter out current product
    const filteredProducts = recentlyViewed.filter((product) => product.id !== currentProductId)

    setRecentProducts(filteredProducts.slice(0, 4))
  }, [currentProductId])

  // If no recently viewed products, don't render the component
  if (recentProducts.length === 0) {
    return null
  }

  // Format price with spaces for thousands
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " CFA"
  }

  return (
    <section className="recently-viewed-section">
      <Container>
        <div className="section-header">
          <h2>Recently Viewed</h2>
          <p>Products you've viewed recently</p>
        </div>

        <Row>
          {recentProducts.map((product) => (
            <Col key={product.id} lg={3} md={4} sm={6} xs={12}>
              <Link to={`/product/${product.id}`} className="recent-product-card">
                <div className="recent-product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                </div>
                <div className="recent-product-info">
                  <h3 className="recent-product-title">{product.name}</h3>
                  <div className="recent-product-rating">
                    <FaStar className="star-icon" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="recent-product-price">{formatPrice(product.price)}</div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default RecentlyViewed
