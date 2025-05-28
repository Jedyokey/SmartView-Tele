import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaSearch } from "react-icons/fa";
import "./CTA.css";
import { useTranslation } from "react-i18next";
import { useTVContext } from "../../context/TVContext";

const CTA = () => {
  const { t } = useTranslation();
  const { language } = useTVContext();

  // WhatsApp contact details
  const phoneNumber = "+2250575965968";
  const whatsappMessage = 
    language === "fr"
    ? "Bonjour ! Je suis intéressé(e) par vos Smart TV. Pouvez-vous m’aider à trouver ce que je cherche ?"
    : "Hello! I'm interested in your Smart TVs. Can you help me find what I'm looking for?";
  // Encode the message for URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="cta-section">
      <Container>
        <div className="cta-container">
          <Row className="align-items-center">
            <Col lg={7} md={7} sm={12}>
              <div className="cta-content">
                <FaSearch className="cta-icon" />
                <h2>{t("cta.title")}</h2>
                <p>{t("cta.description")}</p>
              </div>
            </Col>
            <Col lg={5} md={5} sm={12} className="text-center text-md-end mt-sm-3 mt-md-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-contact-btn"
              >
                <FaWhatsapp size={20} /> {t("cta.button")}
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
