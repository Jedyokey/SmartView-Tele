import { Container, Row, Col } from "react-bootstrap"
import { FaStar, FaStarHalfAlt, FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import "./FeaturedProducts.css"
import { useTVContext } from "../../context/TVContext"

const FeaturedProducts = ({ products }) => {
  // Get context with translations and helper functions
  const { translations, language, formatPrice } = useTVContext()

  // Safe access to translations with fallbacks
  const t = translations?.featured || {
    title: "Featured Products",
    subtitle: "Discover our top-rated Smart TVs with cutting-edge technology",
    view: "View TV",
    viewAll: "View All Products",
  }

  // Helper function to get localized text using the flattened structure
  const getLocalizedText = (product, field, fallback = "") => {
    if (!product) return fallback

    const langField = `${field}_${language}`
    const enField = `${field}_en`
    const frField = `${field}_fr`

    // Try current language first, then fallback to English, then French, then fallback
    return product[langField] || product[enField] || product[frField] || product[field] || fallback
  }

  // Fallback formatPrice if context not available
  const safeFormatPrice =
    formatPrice ||
    ((price) => {
      return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " CFA" || "0 CFA"
    })

  // Get first 4 featured products
  const featuredProducts = products?.filter((tv) => tv?.isFeatured)?.slice(0, 4) || []

  // Star rating component
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const starValue = i + 1
        if (starValue <= Math.floor(rating || 0)) {
          return <FaStar key={i} className="star filled" />
        } else if (starValue === Math.ceil(rating || 0) && (rating || 0) % 1 >= 0.5) {
          return <FaStarHalfAlt key={i} className="star filled" />
        } else {
          return <FaStar key={i} className="star empty" />
        }
      })
  }

  if (!featuredProducts.length) {
    return null
  }

  return (
    <section className="featured-products-section">
      <Container>
        <div className="section-header">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <Row className="featured-products-row">
          {featuredProducts.map((product) => {
            const productName = getLocalizedText(product, "name", "Unknown Product")

            return (
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

                  {/* Product Image */}
                  <Link to={`/product/${product.id}`} className="product-image-link">
                    <div className="product-image-container">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={productName}
                        className="product-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg"
                          e.target.className = "product-image placeholder-image"
                        }}
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-title">
                      <Link to={`/product/${product.id}`}>{productName}</Link>
                    </h3>

                    <div className="product-meta">
                      <div className="product-rating">
                        <div className="stars">{renderStars(product.rating)}</div>
                        <span className="review-count">({product.reviews || 0})</span>
                      </div>
                    </div>

                    <div className="product-price">
                      <span className="current-price">{safeFormatPrice(product.price)}</span>
                      {product.oldPrice > product.price && (
                        <span className="old-price">{safeFormatPrice(product.oldPrice)}</span>
                      )}
                    </div>
                  </div>

                  {/* View Product Button */}
                  <Link to={`/product/${product.id}`} className="view-product-btn">
                    <FaEye /> {t.view}
                  </Link>
                </div>
              </Col>
            )
          })}
        </Row>

        <div className="view-all-container">
          <Link to="/smart-tvs" className="view-all-btn">
            {t.viewAll}
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProducts
