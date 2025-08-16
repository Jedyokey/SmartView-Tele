import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap"
import { useTVContext } from "../../context/TVContext"
import { scrollToTop } from "../../utils/scrollToTop"
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa"
import { SiTiktok } from "react-icons/si"
import logo from "../../assets/smartview-pro-logo-2.png" 
import "./Footer.css"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Get language functions from context with safety checks
  const context = useTVContext()
  const language = context?.language || "en"
  const switchLanguageWithLoading = context?.switchLanguageWithLoading || (() => {})
  const languageLoading = context?.languageLoading || false

  // Content in both languages
  const content = {
    en: {
      info: "Info",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      faqs: "FAQs",
      categories: "Categories",
      smartTVs: "Smart TVs",
      contactInfo: "Contact Information",
      address: "Rue Nimlin Fax-Clark, Adjame, Abidjan, Côte d'Ivoire",
      callUs: "Call Us",
      emailUs: "Email Us",
      email: "isrealokeyonyeze@gmail.com",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      subscribeText: "Subscribe to receive updates on new products and special promotions",
      emailPlaceholder: "Your email address",
      subscribe: "Subscribe",
      copyright: "© 2025 SmartView Télé. All rights reserved.",
      developedBy: "Developed by Jedy++",
      language: "Language",
      english: "English",
      french: "French",
      modalThankYou: "Thank You!",
      modalMessage: "You have successfully subscribed to SmartView Télé's newsletter. Stay tuned for exciting updates!",
      close: "Close",
    },
    fr: {
      info: "Infos",
      aboutUs: "À Propos",
      contactUs: "Contactez-Nous",
      faqs: "FAQ",
      categories: "Catégories",
      smartTVs: "Télévisions Intelligentes",
      contactInfo: "Informations de Contact",
      address: "Rue Nimlin Fax-Clark, Adjame, Abidjan, Côte d'Ivoire",
      callUs: "Appelez-Nous",
      emailUs: "Envoyez-Nous un Email",
      email: "isrealokeyonyeze@gmail.com",
      followUs: "Suivez-Nous",
      newsletter: "Bulletin d'Information",
      subscribeText:
        "Abonnez-vous pour recevoir des mises à jour sur les nouveaux produits et les promotions spéciales",
      emailPlaceholder: "Votre adresse email",
      subscribe: "S'abonner",
      copyright: "© 2025 SmartView Télé. Tous droits réservés.",
      developedBy: "Développé par Jedy++",
      language: "Langue",
      english: "Anglais",
      french: "Français",
      modalThankYou: "Merci !",
      modalMessage:
        "Vous êtes abonné avec succès au bulletin d'information de SmartView Télé. Restez à l'écoute pour des mises à jour passionnantes !",
      close: "Fermer",
    },
  }

  // Current language content with fallback
  const t = content[language] || content.en

  // Handle language change
  const handleLanguageChange = (lang) => {
    if (lang !== language && !languageLoading) {
      localStorage.setItem("preferredLanguage", lang)
      switchLanguageWithLoading(lang)
      
      // Use setTimeout to ensure scrolling happens after state updates
      setTimeout(() => {
        scrollToTop()
      }, 100)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setLoading(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "c24dc6ef-8062-4b51-9a87-a59e90a306e3", 
          email: email,
          subject: "New Newsletter Subscription",
          from_name: "SmartView Télé Newsletter",
        }),
      })

      const data = await response.json()
      if (data.success) {
        setShowModal(true)
        setEmail("")
        setValidated(false)
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <Container>
          <Row>
            {/* Business Info */}
            <Col lg={3} md={6} sm={12} className="footer-column">
              <Link 
                to="/" 
                className="footer-logo d-flex align-items-center text-decoration-none"
                onClick={() => {
                  if (window.location.pathname === '/') {
                    scrollToTop();
                  }
                }}
              >
                <img src={logo || "/placeholder.svg"} alt="SmartView Tele Logo" className="logo-img" />
                <h2 className="mb-0">
                  SmartView <span>Télé</span>
                </h2>
              </Link>
              <p className="footer-about">
                {language === "en"
                  ? "Your premier destination for high-quality Smart TVs and home entertainment systems in Ivory Coast."
                  : "Votre destination privilégiée pour les Smart TV et systèmes de divertissement à domicile de haute qualité en Côte d'Ivoire."}
              </p>
              <div className="language-selector">
                <div className="language-toggle">
                  <span>{t.language}:</span>
                  <button
                    className={`language-btn ${language === "en" ? "active" : ""} ${languageLoading ? "loading" : ""}`}
                    onClick={() => handleLanguageChange("en")}
                    disabled={languageLoading}
                  >
                    EN
                  </button>
                  <span className="separator">|</span>
                  <button
                    className={`language-btn ${language === "fr" ? "active" : ""} ${languageLoading ? "loading" : ""}`}
                    onClick={() => handleLanguageChange("fr")}
                    disabled={languageLoading}
                  >
                    FR
                  </button>
                </div>
              </div>
            </Col>

            {/* Info */}
            <Col lg={2} md={6} sm={6} className="footer-column">
              <h4>{t.info}</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/about">{t.aboutUs}</Link>
                </li>
                <li>
                  <Link to="/smart-tvs">{t.smartTVs}</Link>
                </li>
                <li>
                  <Link to="/contact">{t.contactUs}</Link>
                </li>
                <li>
                  <Link to="/faqs">{t.faqs}</Link>
                </li>
              </ul>
            </Col>

            {/* Contact Information */}
            <Col lg={4} md={6} sm={6} className="footer-column">
              <h4>{t.contactInfo}</h4>
              <ul className="footer-contact">
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>{t.address}</span>
                </li>
                <li>
                  <FaPhone className="contact-icon" />
                  <span>
                    {t.callUs}: <a href="tel:+2250575965968">+225 05 7596 5968</a>
                  </span>
                </li>
                <li>
                  <FaWhatsapp className="contact-icon whatsapp" />
                  <span>
                    WhatsApp: <a href="https://wa.me/2250575965968">+225 05 7596 5968</a>
                  </span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <span>
                    {t.emailUs}: <a href="mailto:isrealokeyonyeze@gmail.com">{t.email}</a>
                  </span>
                </li>
              </ul>
            </Col>

            {/* Newsletter */}
            <Col lg={3} md={6} sm={12} className="footer-column newsletter">
              <h4>{t.newsletter}</h4>
              <p>{t.subscribeText}</p>
              <Form className="newsletter-form" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="subscribe-btn" disabled={loading}>
                  {loading ? "Subscribing..." : t.subscribe}
                </Button>
              </Form>
              <div className="social-icons">
                <h5 className="social-text">{t.followUs}</h5>
                <div className="social-links">
                  <a
                    href="https://www.facebook.com/share/18RmyzRPdq/?mibextid=wwXIfr"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.instagram.com/tele_adjame_isreal?igsh=MWdobG9ydzF4eHZueQ%3D%3D&utm_source=qr"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    className="social-icon"
                    href="https://www.tiktok.com/@isrealokey6?_t=ZM-8wESJbNhVLy&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiTiktok />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="copyright">
              <p>{t.copyright}</p>
            </Col>
            <Col md={6} className="developer-credit">
              <div className="developer-info">
                <p>{t.developedBy}</p>
                <div className="developer-contact">
                  <a href="tel:+2250501436430">
                    <FaPhone className="dev-icon" /> +225 05 0143 6430
                  </a>
                  <a href="https://wa.me/2250576183285">
                    <FaWhatsapp className="dev-icon whatsapp" /> +225 05 7618 3285
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="success-modal">
        <Modal.Body className="text-center">
          <FaCheckCircle size={48} color="green" />
          <h4 className="mt-3">{t.modalThankYou}</h4>
          <p>{t.modalMessage}</p>
          <Button variant="success" onClick={() => setShowModal(false)}>
            {t.close}
          </Button>
        </Modal.Body>
      </Modal>
    </footer>
  )
}

export default Footer
