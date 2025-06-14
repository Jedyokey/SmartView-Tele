import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Modal } from "react-bootstrap";
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import "./Newsletter.css";
import { useTranslation } from "react-i18next";

const Newsletter = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "c24dc6ef-8062-4b51-9a87-a59e90a306e3",
          email: email,
          subject: t("newsletter.title"),
          from_name: "SmartView Télé Newsletter",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: t("newsletter.thankYouMessage"),
        });
        setShowModal(true);
        setEmail("");
        setValidated(false);
      } else {
        setMessage({
          type: "danger",
          text: t("newsletter.errorGeneric"),
        });
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: t("newsletter.errorNetwork"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className="newsletter-container">
              <div className="newsletter-icon">
                <FaEnvelope />
              </div>
              <h2>{t("newsletter.title")}</h2>
              <p>{t("newsletter.description")}</p>

              {message && message.type === "danger" && (
                <Alert variant="danger" className="text-center">
                  {message.text}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="newsletter-form">
                  <Form.Control
                    type="email"
                    placeholder={t("newsletter.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Button type="submit" className="subscribe-btn" disabled={loading}>
                    {loading ? (
                      t("newsletter.subscribing")
                    ) : (
                      <>
                        {t("newsletter.subscribeBtn")} <FaPaperPlane />
                      </>
                    )}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid" className="text-center">
                  {t("newsletter.invalidEmail")}
                </Form.Control.Feedback>
              </Form>

              <div className="privacy-note">{t("newsletter.privacyNote")}</div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Thank You */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center">
          <FaCheckCircle size={70} className="text-success mb-3" />
          <h4>{t("newsletter.thankYouTitle")}</h4>
          <p>{t("newsletter.thankYouMessage")}</p>
          <Button variant="success" onClick={handleCloseModal} className="mt-3">
            {t("newsletter.closeBtn")}
          </Button>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Newsletter;
