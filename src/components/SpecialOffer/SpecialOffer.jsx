import { Container, Row, Col } from "react-bootstrap"
import { FaClock } from "react-icons/fa"
import "./SpecialOffer.css"

const SpecialOffer = () => {
  return (
    <section className="special-offer-section">
      <Container fluid>
        <Row className="g-0">
          <Col lg={6} className="offer-image">
            <img src="https://i5.walmartimages.com/seo/LG-65-Class-4K-UHD-OLED-Web-OS-Smart-TV-with-Dolby-Vision-C3-Series-OLED65C3PUA_4507d0a3-83cb-4420-9c59-ef2c191d7fe7.3c9fdb1665a5e2074e0c8c38fc251fff.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" alt="Premium 4K Smart TV on Sale" className="offer-img" />
            {/* Note: Replace with an actual premium TV image */}
            {/* Recommended: Use an image of a high-end TV in a modern living room setting */}
          </Col>
          <Col lg={6} className="offer-content">
            <div className="offer-content-inner">
              <div className="offer-badge">Limited Time Offer</div>
              <h2>Premium 4K Smart TV Experience</h2>
              <p className="offer-description">
                Upgrade your home entertainment with our premium selection of 4K Smart TVs at unbeatable prices.
              </p>

              <div className="discount-highlight">
                <span className="discount-value">Up to 30% OFF</span>
                <span className="discount-period">
                  <FaClock /> Offer ends in 5 days
                </span>
              </div>

              <ul className="offer-features">
                <li>4K Ultra HD Resolution</li>
                <li>Smart TV Functionality</li>
                <li>Free Delivery & Installation</li>
              </ul>

              <a href="/smart-tvs" className="shop-offer-btn">
                Shop This Offer
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SpecialOffer
