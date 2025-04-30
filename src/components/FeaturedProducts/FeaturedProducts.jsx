import { Container, Row, Col } from "react-bootstrap"
import { FaStar, FaStarHalfAlt, FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import "./FeaturedProducts.css"
import { useTVContext } from "../../context/TVContext" // Import the context

const FeaturedProducts = ({ products }) => {
    const context = useTVContext();
    // Fallback formatPrice if context not available
    const formatPrice = context?.formatPrice || ((price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " CFA"
    });

  // Get first 4 featured products
  const featuredProducts = products.filter((tv) => tv.isFeatured).slice(0, 4)

  // Star rating component
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const starValue = i + 1
        if (starValue <= Math.floor(rating)) {
          return <FaStar key={i} className="star filled" />
        } else if (starValue === Math.ceil(rating) && rating % 1 >= 0.5) {
          return <FaStarHalfAlt key={i} className="star filled" />
        } else {
          return <FaStar key={i} className="star empty" />
        }
      })
  }

  return (
    <section className="featured-products-section">
      <Container>
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our top-rated Smart TVs with cutting-edge technology</p>
        </div>

        <Row className="featured-products-row">
          {featuredProducts.map((product) => (
            <Col key={product.id} lg={3} md={6} sm={6} xs={12} className="featured-product-col">
              <div className="featured-product-card">
                {/* Discount Badge */}
                {product.oldPrice > product.price && (
                  <div className="product-badge">
                    <span className="discount-badge">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  </div>
                )}

                {/* Product Image
                <Link to={`/product/${product.id}`} className="product-image-link">
                  <div className="product-image-container">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`
                        e.target.className = "product-image placeholder-image"
                      }}
                    />
                  </div>
                </Link> */}

                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="product-image-link">
                  <div className="product-image-container">
                    <img
                      src={product.image || "/placeholder.svg"}  
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        // Fallback to a custom placeholder if the image fails to load
                        // e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`;
                        e.target.src = "/placeholder.svg"; // Use a generic placeholder image
                        
                        // Optionally, update the class to apply specific styles (e.g., for placeholder images)
                        e.target.className = "product-image placeholder-image";
                      }}
                    />
                  </div>
                </Link>


                {/* Product Info */}
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-title">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className="product-meta">
                    <div className="product-rating">
                      <div className="stars">{renderStars(product.rating)}</div>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                  </div>

                  <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.oldPrice > product.price && (
                      <span className="old-price">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                </div>

                {/* View Product Button */}
                <Link to={`/product/${product.id}`} className="view-product-btn">
                  <FaEye /> Voir le Téléviseur
                </Link>
              </div>
            </Col>
          ))}
        </Row>

        <div className="view-all-container">
          <Link to="/smart-tvs" className="view-all-btn">
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProducts
