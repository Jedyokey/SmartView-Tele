import { Card, Badge } from "react-bootstrap"
import { StarFill, Star, Eye } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import "./ProductCard.css"
import { useTVContext } from "../../context/TVContext"

const ProductCard = ({ product }) => {
  const { formatPrice } = useTVContext();

  // Calculate discount percentage
  const discountPercentage = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

  // Generate star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

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
  }

  return (
    <Card className="product-card">
      {discountPercentage > 0 && <div className="discount-badge">-{discountPercentage}%</div>}

      <div className="card-img-container">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            console.log("Image failed to load:", e.target.src)
            e.target.onerror = null
            e.target.src = "/placeholder.svg?height=300&width=300"
          }}
        />
      </div>

      <Card.Body>
        <div className="brand-badge">
          <Badge bg="light" text="dark">
            {product.brand}
          </Badge>
        </div>

        <Card.Title className="product-title">{product.name}</Card.Title>

        <div className="product-meta">
          <Badge bg="secondary" className="category-badge">
            {product.category}
          </Badge>
          <Badge bg="info" className="size-badge">
            {product.size}
          </Badge>
          <Badge bg="dark" className="resolution-badge">
            {product.resolution}
          </Badge>
        </div>

        <div className="rating-container">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="price-container">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.oldPrice > product.price && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
        </div>

        <div className="card-footer">
          <Link to={`/product/${product.id}`} className="view-tele-btn">
            <Eye /> Voir le Téléviseur
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
