import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import "./RecentlyViewed.css"
import { useTVContext } from "../../context/TVContext"

const RecentlyViewed = ({ currentProductId }) => {
  const [recentProducts, setRecentProducts] = useState([])

  // Get translations and helper functions from context
  const { translations, language, formatPrice } = useTVContext()

  // Safe access to translations with fallbacks
  const t = translations?.recentlyViewed || {
    title: "Recently Viewed",
    subtitle: "Products you've viewed recently",
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

  useEffect(() => {
    // Get recently viewed products from localStorage
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || []

    // Filter out current product
    const filteredProducts = recentlyViewed.filter((product) => product?.id !== currentProductId)

    setRecentProducts(filteredProducts.slice(0, 4))
  }, [currentProductId])

  // If no recently viewed products, don't render the component
  if (recentProducts.length === 0) {
    return null
  }

  return (
    <section className="recently-viewed-section">
      <Container>
        <div className="section-header">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <Row>
          {recentProducts.map((product) => {
            const productName = getLocalizedText(product, "name", "Unknown Product")

            return (
              <Col key={product.id} lg={3} md={4} sm={6} xs={12}>
                <Link to={`/product/${product.id}`} className="recent-product-card">
                  <div className="recent-product-image">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={productName}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                  <div className="recent-product-info">
                    <h3 className="recent-product-title">{productName}</h3>
                    <div className="recent-product-rating">
                      <FaStar className="star-icon" />
                      <span>{product.rating?.toFixed(1) || "0.0"}</span>
                    </div>
                    <div className="recent-product-price">{safeFormatPrice(product.price)}</div>
                  </div>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

export default RecentlyViewed
