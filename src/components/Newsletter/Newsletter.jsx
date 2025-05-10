import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Modal } from "react-bootstrap";
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import "./Newsletter.css";

const Newsletter = () => {
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
          subject: "New Newsletter Subscription",
          from_name: "SmartView Télé Newsletter",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "Thank you for subscribing to our newsletter!",
        });
        setShowModal(true); // Show modal on success
        setEmail("");
        setValidated(false);
      } else {
        setMessage({
          type: "danger",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "An error occurred. Please try again later.",
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
              <h2>Subscribe to Our Newsletter</h2>
              <p>Stay updated with our latest products, special offers, and TV technology news</p>

              {message && message.type === "danger" && (
                <Alert variant="danger" className="text-center">
                  {message.text}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="newsletter-form">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Button type="submit" className="subscribe-btn" disabled={loading}>
                    {loading ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe <FaPaperPlane />
                      </>
                    )}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid" className="text-center">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form>

              <div className="privacy-note">We respect your privacy. Unsubscribe at any time.</div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Thank You */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center">
          <FaCheckCircle size={70} className="text-success mb-3" />
          <h4>Thank You!</h4>
          <p>You have successfully subscribed to SmartView Télé's newsletter. Stay tuned for exciting updates!</p>
          <Button variant="success" onClick={handleCloseModal} className="mt-3">
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Newsletter;
