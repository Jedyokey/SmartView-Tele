import { useState, useEffect } from "react"
import {  lazy, Suspense } from "react"
import { Container, Row, Col, Breadcrumb, Badge, Tab, Tabs } from "react-bootstrap"
import { FaStar, FaStarHalfAlt, FaWhatsapp, FaShippingFast, FaCheckCircle, FaInfoCircle } from "react-icons/fa"
import { useParams, useSearchParams, Link } from "react-router-dom"
const RecentlyViewed = lazy(() => import("../../components/RecentlyViewed/RecentlyViewed"))
const Newsletter = lazy(() => import("../../components/Newsletter/Newsletter"))
const NotFound = lazy(() => import("../NotFound/NotFound"))
import { useTVContext } from "../../context/TVContext"
import "./ProductDetails.css"
import smartTVs from "../../TV_Data/data"

const ProductDetails = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get("from_page"); // Get the query parameter
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState("right")
  const [isFoldable, setIsFoldable] = useState(false)

  // Get translations from context with safe fallbacks
  const { translations, language, formatPrice } = useTVContext()

  // Validate `fromPage` query parameter
  const MAX_PAGE = 10;
  if (fromPage && parseInt(fromPage) > MAX_PAGE) {
    return <NotFound />; // Redirect to 404 if `from_page` is invalid
  }

  // Safe access to translations with comprehensive fallbacks
  const t = translations?.productDetails || {
    loadingProduct: "Loading product details...",
    productNotFound: "Product Not Found",
    productNotFoundMessage: "Sorry, the product you are looking for does not exist or has been removed.",
    backToCollection: "Back to Collection",
    breadcrumbHome: "Home",
    breadcrumbSmartTVs: "Smart TVs",
    sku: "SKU",
    inStock: "In Stock",
    outOfStock: "Out Of Stock",
    keyFeatures: "Key Features:",
    noFeaturesListed: "No features listed",
    quantity: "Quantity",
    buyViaWhatsApp: "Buy via WhatsApp",
    freeDelivery: "Free Delivery",
    onOrdersOver: "On orders over",
    whatsappMessage:
      "I'm interested in {quantity} unit{plural} of {productName} for {totalPrice}. Could you provide more information?",
    unit: "",
    units: "s",
    tabDescription: "Description",
    tabSpecifications: "Specifications",
    tabReviews: "Reviews",
    productDescriptionTitle: "Product Description",
    productDescriptionText1:
      "The {productName} is a premium {size} {category} TV that combines cutting-edge technology with elegant design.",
    productDescriptionText2: "This smart TV comes with a user-friendly interface and built-in Wi-Fi.",
    productDescriptionText3: "Experience immersive sound and sleek design.",
    technicalSpecifications: "Technical Specifications",
    customerReviews: "Customer Reviews",
    averageRating: "Based on {count} reviews",
    reviewsPlaceholder: "Customer reviews will appear here.",
    specifications: {
      screenSize: "Screen Size",
      resolution: "Resolution",
      displayType: "Display Type",
      smartFeatures: "Smart Features",
      hdr: "HDR",
      refreshRate: "Refresh Rate",
      connectivity: "Connectivity",
      audio: "Audio",
      dimensions: "Dimensions",
      smartFeaturesValue: "Streaming apps, screen mirroring",
      hdrValue: "Yes",
      refreshRateValue: "60Hz",
      connectivityValue: "HDMI, USB, Wi-Fi, Bluetooth",
      audioValue: "20W Speakers",
    },
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

  // Find the product by ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = smartTVs.find((tv) => tv.id.toString() === id)
      if (foundProduct) {
        setProduct(foundProduct)
        // Add to recently viewed
        addToRecentlyViewed(foundProduct)
      }
      setLoading(false)
    }, 500)
  }, [id])

  useEffect(() => {
    // Detect Galaxy Fold-like devices
    const isFold = window.innerWidth <= 400 && window.innerHeight > 600
    setIsFoldable(isFold)
  }, [])

  // Add product to recently viewed in localStorage
  const addToRecentlyViewed = (product) => {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || []

    // Check if product already exists in recently viewed
    const exists = recentlyViewed.some((item) => item.id === product.id)

    if (!exists) {
      // Add to the beginning of the array
      const updatedRecentlyViewed = [product, ...recentlyViewed].slice(0, 4)
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecentlyViewed))
    }
  }

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star filled" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star filled" />)
      } else {
        stars.push(<FaStar key={i} className="star empty" />)
      }
    }

    return stars
  }

  // Calculate discount percentage
  const calculateDiscount = (oldPrice, currentPrice) => {
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t.loadingProduct}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <Container className="not-found-container">
        <div className="not-found-content">
          <FaInfoCircle size={50} />
          <h2>{t.productNotFound}</h2>
          <p>{t.productNotFoundMessage}</p>
          <Link to="/smart-tvs" className="back-btn">
            {t.backToCollection}
          </Link>
        </div>
      </Container>
    )
  }

  const additionalImages = product.additionalImages || [product.image]
  const productName = getLocalizedText(product, "name", "Unknown Product")
  const productDescription = getLocalizedText(product, "description", "No description available")
  const detailedDescription = getLocalizedText(product, "detailedDescription", productDescription)

  const handleThumbnailClick = (index) => {
    if (index === selectedImageIndex) return
    setSlideDirection(index > selectedImageIndex ? "right" : "left")
    setSelectedImageIndex(index)
  }

  // Sample specifications 
  const specifications = {
    [t.specifications.screenSize]: getLocalizedText(product, "size", "Unknown Size"),
    [t.specifications.resolution]: product.resolution,
    [t.specifications.displayType]: product.category,
    [t.specifications.smartFeatures]: t.specifications.smartFeaturesValue,
    [t.specifications.hdr]: t.specifications.hdrValue,
    [t.specifications.refreshRate]: t.specifications.refreshRateValue,
    [t.specifications.connectivity]: t.specifications.connectivityValue,
    [t.specifications.audio]: t.specifications.audioValue,
    [t.specifications.dimensions]: "123 x 71 x 8 cm",
  }

  // Generate WhatsApp message
  const whatsappMessage = t.whatsappMessage
    .replace("{quantity}", quantity)
    .replace("{plural}", quantity > 1 ? t.units : t.unit)
    .replace("{productName}", productName)
    .replace("{totalPrice}", formatPrice(product.price * quantity))

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              {t.breadcrumbHome}
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/smart-tvs" }}>
              {t.breadcrumbSmartTVs}
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="breadcrumb-product-name">
              {productName}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      {/* Product Details */}
      <section className="product-details-section">
        <Container>
          <Row>
            {/* Product Images */}
            <Col lg={6} md={6}>
              <div className="product-images">
                <div className="main-image-container">
                  {product.oldPrice > product.price && (
                    <div className="discount-badge">-{calculateDiscount(product.oldPrice, product.price)}%</div>
                  )}

                  {/* Main Product Image */}
                  <div className={`slide-image-wrapper ${slideDirection}`}>
                    {loading ? (
                      <div className="main-image skeleton-box"></div>
                    ) : (
                      <img
                        src={product.additionalImages?.[selectedImageIndex] || product.image}
                        alt={productName}
                        className="main-image"
                        key={selectedImageIndex}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div className="thumbnail-container">
                  {additionalImages.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${selectedImageIndex === index ? "active" : ""}`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img 
                        src={img || "/placeholder.svg"} 
                        alt={`${productName} - view ${index + 1}`}
                        loading="lazy" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            {/* Product Info */}
            <Col lg={6} md={6}>
              <div className="product-info">
                <div className="product-brand">
                  <Badge bg="light" text="dark">
                    {product.brand}
                  </Badge>
                </div>

                <h1 className={`product-title ${isFoldable ? "foldable-device" : ""} full-product-title`}>
                  {productName}
                </h1>

                <div className="product-meta">
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="review-count">
                      ({product.reviews} {translations?.product?.reviews || "Reviews"})
                    </span>
                  </div>
                  <div className="product-id">
                    <span>
                      {t.sku}: TV-{product.id.toString().padStart(4, "0")}
                    </span>
                  </div>
                </div>

                <div className="product-price-container">
                  <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.oldPrice > product.price && (
                      <span className="old-price">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <div className="stock-status in-stock">
                    <FaCheckCircle /> {t.inStock}
                  </div>
                </div>

                <div className="product-short-description">
                  <p>{productDescription}</p>
                </div>

                <div className="key-features">
                  <h4>{t.keyFeatures}</h4>
                  <ul>
                    {(() => {
                      const features = getLocalizedText(product, "features", [])
                      const featuresArray = Array.isArray(features) ? features : product.features || []

                      return featuresArray.length > 0 ? (
                        featuresArray.map((feature, index) => <li key={index}>{feature}</li>)
                      ) : (
                        <li>{t.noFeaturesListed}</li>
                      )
                    })()}
                  </ul>
                </div>

                {/* Quantity Selector */}
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button
                      className="qty-btn"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="qty-input"
                    />
                    <button className="qty-btn" onClick={() => setQuantity((prev) => prev + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="buy-actions">
                  <a
                    href={
                      product.whatsappLink || `https://wa.me/2250575965968?text=${encodeURIComponent(whatsappMessage)}`
                    }
                    className="whatsapp-buy-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp /> {t.buyViaWhatsApp}
                  </a>
                </div>

                <div className="delivery-info">
                  <div className="delivery-item">
                    <FaShippingFast className="delivery-icon" />
                    <div>
                      <h5>{t.freeDelivery}</h5>
                      <p>{t.onOrdersOver} 500,000 CFA</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Product Details Tabs */}
          <div className="product-details-tabs">
            <Tabs defaultActiveKey="description" className="mb-3" unmountOnExit={false}>
              <Tab eventKey="description" title={t.tabDescription}>
                <div className="tab-content-inner">
                  <h3>{t.productDescriptionTitle}</h3>
                  <p>
                    {t.productDescriptionText1
                      .replace("{productName}", productName)
                      .replace("{size}", getLocalizedText(product, "size", "Unknown Size"))
                      .replace("{category}", product.category)
                      .replace("{resolution}", product.resolution)}
                  </p>
                  <p>{t.productDescriptionText2}</p>
                  <p>{t.productDescriptionText3}</p>
                  {detailedDescription !== productDescription && (
                    <div className="detailed-description">
                      <p>{detailedDescription}</p>
                    </div>
                  )}
                </div>
              </Tab>
              <Tab eventKey="specifications" title={t.tabSpecifications}>
                <div className="tab-content-inner">
                  <h3>{t.technicalSpecifications}</h3>
                  <div className="specifications-table">
                    <table>
                      <tbody>
                        {Object.entries(specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td className="spec-name">{key}</td>
                            <td className="spec-value">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="reviews" title={`${t.tabReviews} (${product.reviews})`}>
                <div className="tab-content-inner">
                  <h3>{t.customerReviews}</h3>
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <div className="rating-number">{product.rating.toFixed(1)}</div>
                      <div className="rating-stars">{renderStars(product.rating)}</div>
                      <div className="total-reviews">{t.averageRating.replace("{count}", product.reviews)}</div>
                    </div>
                  </div>
                  <div className="review-list">
                    <p className="text-center">{t.reviewsPlaceholder}</p>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </section>

      {/* Recently Viewed Products */}
      <Suspense fallback={null}>
        <RecentlyViewed currentProductId={product.id} />
      </Suspense>

      {/* Newsletter */}
      <Suspense fallback={null}>
        <Newsletter />
      </Suspense>
    </div>
  )
}

export default ProductDetails
