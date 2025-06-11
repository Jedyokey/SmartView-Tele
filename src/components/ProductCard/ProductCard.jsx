import { Card, Badge } from "react-bootstrap"
import { StarFill, Star, Eye } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import "./ProductCard.css"
import { useTVContext } from "../../context/TVContext"
import { useEffect, useState, useMemo, useCallback } from "react"

const ProductCard = ({ product, currentPage, isAlone = false }) => {
  const { formatPrice, language, translations } = useTVContext()

  // Memoize localized text helper
  const getLocalizedText = useCallback((product, field, fallback = "") => {
    if (!product) return fallback

    const langField = `${field}_${language}`
    const enField = `${field}_en`
    const frField = `${field}_fr`

    return product[langField] || product[enField] || product[frField] || product[field] || fallback
  }, [language])

  // Memoize product name
  const productName = useMemo(() => 
    getLocalizedText(product, "name", "Unknown Product"),
    [product, getLocalizedText]
  )

  const [isMobile, setIsMobile] = useState(false)
  const [displayTitle, setDisplayTitle] = useState(productName)

  // Memoize translations
  const t = useMemo(() => 
    translations?.productCard || { viewTV: "View TV" },
    [translations]
  )

  // Memoize resize handler
  const handleResize = useCallback(() => {
    const width = window.innerWidth
    const isMobile = width <= 767
    const isExtraSmall = width <= 400

    setIsMobile(isMobile)

    if (isAlone) {
      setDisplayTitle(productName)
      return
    }

    const limit = isExtraSmall ? 42 : isMobile ? 52 : 38

    if (productName.length <= limit) {
      setDisplayTitle(productName)
      return
    }

    const lastSpace = productName.lastIndexOf(" ", limit)
    setDisplayTitle(`${productName.substring(0, lastSpace > 0 ? lastSpace : limit)}...`)
  }, [productName, isAlone])

  // Track screen size
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Memoize discount calculation
  const discountPercentage = useMemo(() => 
    product?.oldPrice && product?.price 
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
      : 0,
    [product?.oldPrice, product?.price]
  )

  // Memoize star rating
  const renderStars = useCallback((rating) => {
    const stars = []
    const fullStars = Math.floor(rating || 0)
    const hasHalfStar = (rating || 0) % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarFill key={i} className="star-icon filled" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarFill key={i} className="star-icon half" />)
      } else {
        stars.push(<Star key={i} className="star-icon" />)
      }
    }

    return stars
  }, [])

  // Memoize product link
  const productLink = useMemo(() => 
    currentPage ? `/product/${product?.id}?from_page=${currentPage}` : `/product/${product?.id}`,
    [currentPage, product?.id]
  )

  // Safety check for product
  if (!product) {
    return null
  }

  return (
    <Card className="product-card">
      {discountPercentage > 0 && <div className="discount-badge">-{discountPercentage}%</div>}

      <div className="card-img-container">
        <Card.Img
          variant="top"
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={productName}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg?height=300&width=300"
          }}
        />
      </div>

      <Card.Body>
        <div className="brand-badge">
          <Badge bg="light" text="dark">
            {product.brand || "Unknown Brand"}
          </Badge>
        </div>

        <Card.Title
          className={`product-title ${isAlone ? "full-title" : ""}`}
          title={productName}
        >
          {displayTitle}
        </Card.Title>

        <div className="product-meta">
          <Badge bg="secondary" className="category-badge">
            {product.category || "TV"}
          </Badge>
          <Badge bg="info" className="size-badge">
            {getLocalizedText(product, "size", "Unknown Size")}
          </Badge>
          <Badge bg="dark" className="resolution-badge">
            {product.resolution || "HD"}
          </Badge>
        </div>

        <div className="rating-container">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="review-count">({product.reviews || 0})</span>
        </div>

        <div className="price-container">
          <span className="current-price">{formatPrice(product.price || 0)}</span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="old-price">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        <div className="card-footer">
          <Link to={productLink} className="view-tele-btn">
            <Eye /> {t.viewTV}
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
