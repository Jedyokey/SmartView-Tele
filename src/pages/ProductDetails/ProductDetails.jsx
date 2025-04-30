

// import { useState, useEffect } from "react"
// import { Container, Row, Col, Breadcrumb, Badge, Tab, Tabs } from "react-bootstrap"
// import { FaStar, FaStarHalfAlt, FaWhatsapp, FaShippingFast, FaCheckCircle, FaInfoCircle } from "react-icons/fa"
// import { useParams, Link } from "react-router-dom"
// import Newsletter from "../../components/Newsletter/Newsletter"
// import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed"
// import "./ProductDetails.css"
// import smartTVs from "../../TV_Data/data"

// const ProductDetails = () => {
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [mainImage, setMainImage] = useState("")
//   const [quantity, setQuantity] = useState(1)

//   // Find the product by ID
//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       const foundProduct = smartTVs.find((tv) => tv.id.toString() === id)
//       if (foundProduct) {
//         setProduct(foundProduct)
//         setMainImage(foundProduct.image)

//         // Add to recently viewed
//         addToRecentlyViewed(foundProduct)
//       }
//       setLoading(false)
//     }, 500)
//   }, [id])

//   // Add product to recently viewed in localStorage
//   const addToRecentlyViewed = (product) => {
//     const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || []

//     // Check if product already exists in recently viewed
//     const exists = recentlyViewed.some((item) => item.id === product.id)

//     if (!exists) {
//       // Add to the beginning of the array
//       const updatedRecentlyViewed = [product, ...recentlyViewed].slice(0, 4)
//       localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecentlyViewed))
//     }
//   }

//   // Function to render star ratings
//   const renderStars = (rating) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 >= 0.5

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<FaStar key={i} className="star filled" />)
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<FaStarHalfAlt key={i} className="star filled" />)
//       } else {
//         stars.push(<FaStar key={i} className="star empty" />)
//       }
//     }

//     return stars
//   }

//   // Format price with spaces for thousands
//   const formatPrice = (price) => {
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " CFA"
//   }

//   // Calculate discount percentage
//   const calculateDiscount = (oldPrice, currentPrice) => {
//     return Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
//   }

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading product details...</p>
//       </div>
//     )
//   }

//   if (!product) {
//     return (
//       <Container className="not-found-container">
//         <div className="not-found-content">
//           <FaInfoCircle size={50} />
//           <h2>Product Not Found</h2>
//           <p>Sorry, the product you are looking for does not exist or has been removed.</p>
//           <Link to="/smart-tvs" className="back-btn">
//             Back to Collection
//           </Link>
//         </div>
//       </Container>
//     )
//   }

//   // Sample additional images (in a real app, these would come from your data)
//   const additionalImages = [
//     product.image,
//     "/placeholder.svg?height=100&width=100",
//     "/placeholder.svg?height=100&width=100",
//     "/placeholder.svg?height=100&width=100",
//   ]

//   // Sample specifications (in a real app, these would come from your data)
//   const specifications = {
//     "Screen Size": product.size,
//     Resolution: product.resolution,
//     "Display Type": product.category,
//     "Smart Features": "Yes",
//     HDR: "Yes",
//     "Refresh Rate": "60Hz",
//     Connectivity: "HDMI, USB, Wi-Fi, Bluetooth",
//     Audio: "20W Speakers",
//     Dimensions: "123 x 71 x 8 cm",
//     Weight: "15 kg",
//     "Model Year": "2023",
//   }

//   return (
//     <div className="product-details-page">
//       {/* Breadcrumb */}
//       <div className="breadcrumb-container">
//         <Container>
//           <Breadcrumb>
//             <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//             <Breadcrumb.Item href="/smart-tvs">Smart TVs</Breadcrumb.Item>
//             <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
//           </Breadcrumb>
//         </Container>
//       </div>

//       {/* Product Details */}
//       <section className="product-details-section">
//         <Container>
//           <Row>
//             {/* Product Images */}
//             <Col lg={6} md={6}>
//               <div className="product-images">
//                 <div className="main-image-container">
//                   {product.oldPrice > product.price && (
//                     <div className="discount-badge">-{calculateDiscount(product.oldPrice, product.price)}%</div>
//                   )}
//                   <img src={mainImage || "/placeholder.svg"} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="thumbnail-container">
//                   {additionalImages.map((img, index) => (
//                     <div
//                       key={index}
//                       className={`thumbnail ${mainImage === img ? "active" : ""}`}
//                       onClick={() => setMainImage(img)}
//                     >
//                       <img src={img || "/placeholder.svg"} alt={`${product.name} - view ${index + 1}`} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Col>

//             {/* Product Info */}
//             <Col lg={6} md={6}>
//               <div className="product-info">
//                 <div className="product-brand">
//                   <Badge bg="light" text="dark">
//                     {product.brand}
//                   </Badge>
//                 </div>
//                 <h1 className="product-title">{product.name}</h1>

//                 <div className="product-meta">
//                   <div className="product-rating">
//                     <div className="stars">{renderStars(product.rating)}</div>
//                     <span className="review-count">({product.reviews} Reviews)</span>
//                   </div>
//                   <div className="product-id">
//                     <span>SKU: TV-{product.id.toString().padStart(4, "0")}</span>
//                   </div>
//                 </div>

//                 <div className="product-price-container">
//                   <div className="product-price">
//                     <span className="current-price">{formatPrice(product.price)}</span>
//                     {product.oldPrice > product.price && (
//                       <span className="old-price">{formatPrice(product.oldPrice)}</span>
//                     )}
//                   </div>
//                   <div className="stock-status in-stock">
//                     <FaCheckCircle /> In Stock
//                   </div>
//                 </div>

//                 <div className="product-short-description">
//                   <p>
//                     Experience stunning visuals and smart features with the {product.name}. This {product.size}
//                     {product.category} TV offers exceptional picture quality, immersive sound, and seamless connectivity
//                     for all your entertainment needs.
//                   </p>
//                 </div>

//                 <div className="key-features">
//                   <h4>Key Features:</h4>
//                   <ul>
//                     <li>{product.resolution} Resolution</li>
//                     <li>{product.category} Display Technology</li>
//                     <li>Smart TV Functionality</li>
//                     <li>Multiple HDMI and USB Ports</li>
//                     <li>Built-in Wi-Fi and Bluetooth</li>
//                   </ul>
//                 </div>

//                 <div className="product-actions">
//                   <div className="quantity-selector">
//                     <button
//                       className="qty-btn"
//                       onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                       disabled={quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
//                       className="qty-input"
//                     />
//                     <button className="qty-btn" onClick={() => setQuantity((prev) => prev + 1)}>
//                       +
//                     </button>
//                   </div>

//                   <a
//                     href={
//                       product.whatsappLink ||
//                       `https://wa.me/yournumberhere?text=I'm interested in the ${product.name}. Can you provide more information?`
//                     }
//                     className="whatsapp-contact-btn"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <FaWhatsapp /> Contact on WhatsApp
//                   </a>
//                 </div>

//                 <div className="delivery-info">
//                   <div className="delivery-item">
//                     <FaShippingFast className="delivery-icon" />
//                     <div>
//                       <h5>Free Delivery</h5>
//                       <p>On orders over 500,000 CFA</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           </Row>

//           {/* Product Details Tabs */}
//           <div className="product-details-tabs">
//             <Tabs defaultActiveKey="description" className="mb-3">
//               <Tab eventKey="description" title="Description">
//                 <div className="tab-content-inner">
//                   <h3>Product Description</h3>
//                   <p>
//                     The {product.name} is a premium {product.size} {product.category} TV that combines cutting-edge
//                     technology with elegant design. With its {product.resolution} resolution, you'll enjoy crystal-clear
//                     images with vibrant colors and deep contrasts.
//                   </p>
//                   <p>
//                     This smart TV comes with a user-friendly interface that gives you access to popular streaming
//                     services, allowing you to enjoy your favorite movies, shows, and content with ease. The built-in
//                     Wi-Fi ensures seamless connectivity, while multiple HDMI and USB ports provide versatile options for
//                     connecting external devices.
//                   </p>
//                   <p>
//                     Experience immersive sound with the integrated speakers that deliver clear audio for an enhanced
//                     viewing experience. The sleek design with minimal bezels not only looks modern but also maximizes
//                     your viewing area.
//                   </p>
//                 </div>
//               </Tab>
//               <Tab eventKey="specifications" title="Specifications">
//                 <div className="tab-content-inner">
//                   <h3>Technical Specifications</h3>
//                   <div className="specifications-table">
//                     <table>
//                       <tbody>
//                         {Object.entries(specifications).map(([key, value]) => (
//                           <tr key={key}>
//                             <td className="spec-name">{key}</td>
//                             <td className="spec-value">{value}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab eventKey="reviews" title={`Reviews (${product.reviews})`}>
//                 <div className="tab-content-inner">
//                   <h3>Customer Reviews</h3>
//                   <div className="reviews-summary">
//                     <div className="average-rating">
//                       <div className="rating-number">{product.rating.toFixed(1)}</div>
//                       <div className="rating-stars">{renderStars(product.rating)}</div>
//                       <div className="total-reviews">Based on {product.reviews} reviews</div>
//                     </div>
//                   </div>
//                   <div className="review-list">
//                     <p className="text-center">Customer reviews will appear here.</p>
//                   </div>
//                 </div>
//               </Tab>
//             </Tabs>
//           </div>
//         </Container>
//       </section>

//       {/* Recently Viewed Products */}
//       <RecentlyViewed currentProductId={product.id} />

//       {/* Newsletter */}
//       <Newsletter />
//     </div>
//   )
// }

// export default ProductDetails


















import { useState, useEffect } from "react"
import { Container, Row, Col, Breadcrumb, Badge, Tab, Tabs } from "react-bootstrap"
import { FaStar, FaStarHalfAlt, FaWhatsapp, FaShippingFast, FaCheckCircle, FaInfoCircle } from "react-icons/fa"
import { useParams, Link } from "react-router-dom"
import Newsletter from "../../components/Newsletter/Newsletter"
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed"
import "./ProductDetails.css"
import smartTVs from "../../TV_Data/data"

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState("")
  const [quantity, setQuantity] = useState(1)

  // Find the product by ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = smartTVs.find((tv) => tv.id.toString() === id)
      if (foundProduct) {
        setProduct(foundProduct)
        setMainImage(foundProduct.image)

        // Add to recently viewed
        addToRecentlyViewed(foundProduct)
      }
      setLoading(false)
    }, 500)
  }, [id])

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

  // Format price with commas for thousands
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " CFA"
  }

  // Calculate discount percentage
  const calculateDiscount = (oldPrice, currentPrice) => {
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <Container className="not-found-container">
        <div className="not-found-content">
          <FaInfoCircle size={50} />
          <h2>Product Not Found</h2>
          <p>Sorry, the product you are looking for does not exist or has been removed.</p>
          <Link to="/smart-tvs" className="back-btn">
            Back to Collection
          </Link>
        </div>
      </Container>
    )
  }

  // Sample additional images (in a real app, these would come from your data)
  const additionalImages = [
    product.image,
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ]

  // Sample specifications (in a real app, these would come from your data)
  const specifications = {
    "Screen Size": product.size,
    Resolution: product.resolution,
    "Display Type": product.category,
    "Smart Features": "Yes",
    HDR: "Yes",
    "Refresh Rate": "60Hz",
    Connectivity: "HDMI, USB, Wi-Fi, Bluetooth",
    Audio: "20W Speakers",
    Dimensions: "123 x 71 x 8 cm",
    Weight: "15 kg",
    "Model Year": "2023",
  }

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/smart-tvs">Smart TVs</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
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
                  <img src={mainImage || "/placeholder.svg"} alt={product.name} className="main-image" />
                </div>
                <div className="thumbnail-container">
                  {additionalImages.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${mainImage === img ? "active" : ""}`}
                      onClick={() => setMainImage(img)}
                    >
                      <img src={img || "/placeholder.svg"} alt={`${product.name} - view ${index + 1}`} />
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
                <h1 className="product-title">{product.name}</h1>

                <div className="product-meta">
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="review-count">({product.reviews} Reviews)</span>
                  </div>
                  <div className="product-id">
                    <span>SKU: TV-{product.id.toString().padStart(4, "0")}</span>
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
                    <FaCheckCircle /> In Stock
                  </div>
                </div>

                <div className="product-short-description">
                  <p>
                    Experience stunning visuals and smart features with the {product.name}. This {product.size}
                    {product.category} TV offers exceptional picture quality, immersive sound, and seamless connectivity
                    for all your entertainment needs.
                  </p>
                </div>

                <div className="key-features">
                  <h4>Key Features:</h4>
                  <ul>
                    <li>{product.resolution} Resolution</li>
                    <li>{product.category} Display Technology</li>
                    <li>Smart TV Functionality</li>
                    <li>Multiple HDMI and USB Ports</li>
                    <li>Built-in Wi-Fi and Bluetooth</li>
                  </ul>
                </div>

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
                      product.whatsappLink ||
                      `https://wa.me/yournumberhere?text=Je suis intéressé par ${quantity} ${product.name} à ${formatPrice(product.price * quantity)}. Pouvez-vous me fournir plus d'informations?`
                    }
                    className="whatsapp-buy-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp /> Acheter via WhatsApp
                  </a>
                </div>

                <div className="delivery-info">
                  <div className="delivery-item">
                    <FaShippingFast className="delivery-icon" />
                    <div>
                      <h5>Free Delivery</h5>
                      <p>On orders over 500,000 CFA</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Product Details Tabs */}
          <div className="product-details-tabs">
            <Tabs defaultActiveKey="description" className="mb-3">
              <Tab eventKey="description" title="Description">
                <div className="tab-content-inner">
                  <h3>Product Description</h3>
                  <p>
                    The {product.name} is a premium {product.size} {product.category} TV that combines cutting-edge
                    technology with elegant design. With its {product.resolution} resolution, you'll enjoy crystal-clear
                    images with vibrant colors and deep contrasts.
                  </p>
                  <p>
                    This smart TV comes with a user-friendly interface that gives you access to popular streaming
                    services, allowing you to enjoy your favorite movies, shows, and content with ease. The built-in
                    Wi-Fi ensures seamless connectivity, while multiple HDMI and USB ports provide versatile options for
                    connecting external devices.
                  </p>
                  <p>
                    Experience immersive sound with the integrated speakers that deliver clear audio for an enhanced
                    viewing experience. The sleek design with minimal bezels not only looks modern but also maximizes
                    your viewing area.
                  </p>
                </div>
              </Tab>
              <Tab eventKey="specifications" title="Specifications">
                <div className="tab-content-inner">
                  <h3>Technical Specifications</h3>
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
              <Tab eventKey="reviews" title={`Reviews (${product.reviews})`}>
                <div className="tab-content-inner">
                  <h3>Customer Reviews</h3>
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <div className="rating-number">{product.rating.toFixed(1)}</div>
                      <div className="rating-stars">{renderStars(product.rating)}</div>
                      <div className="total-reviews">Based on {product.reviews} reviews</div>
                    </div>
                  </div>
                  <div className="review-list">
                    <p className="text-center">Customer reviews will appear here.</p>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </section>

      {/* Recently Viewed Products */}
      <RecentlyViewed currentProductId={product.id} />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

export default ProductDetails
