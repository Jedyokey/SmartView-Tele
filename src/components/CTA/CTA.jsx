import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaSearch } from "react-icons/fa";
import "./CTA.css";

const CTA = () => {
  const phoneNumber = "+2250575965968";
  const whatsappMessage = "Hello! I'm interested in your Smart TVs. Can you help me find what I'm looking for?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="cta-section">
      <Container>
        <div className="cta-container">
          <Row className="align-items-center">
            <Col lg={7} md={7} sm={12}>
              <div className="cta-content">
                <FaSearch className="cta-icon" />
                <h2>Don't find what you're looking for?</h2>
                <p>
                  We have more Smart TV models and accessories available! Contact our team directly for personalized
                  assistance and special orders.
                </p>
              </div>
            </Col>
            <Col lg={5} md={5} sm={12} className="text-center text-md-end mt-sm-3 mt-md-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-contact-btn"
              >
                <FaWhatsapp size={20} /> Contact us on WhatsApp
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default CTA;