import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram} from 'react-icons/fa';
import { SiTiktok } from "react-icons/si";
import { useTVContext } from '../../context/TVContext';
import './Contact.css';

const Contact = () => {
  const { translations } = useTVContext();
  const t = translations.contact;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  // Validation and submission state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  // Web3Forms access key - you'll need to replace this with your actual key
  const WEB3FORMS_ACCESS_KEY = 'c24dc6ef-8062-4b51-9a87-a59e90a306e3';

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t.validation.nameRequired;
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.name.trim())) {
      newErrors.name = t.validation.nameInvalid;
    }
    
    // Email validation
    if (formData.contactMethod === 'email' || formData.email.trim()) {
      if (!formData.email.trim()) {
        newErrors.email = t.validation.emailRequired;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = t.validation.emailInvalid;
      }
    }
    
  // Phone validation
  const cleanedPhone = formData.phone.replace(/\s/g, '');

  if (formData.contactMethod === 'whatsapp' || cleanedPhone) {
    if (!cleanedPhone) {
      newErrors.phone = t.validation.phoneRequired;
    } else if (!/^(\+225|00225)?[0-9]{10}$/.test(cleanedPhone)) {
      newErrors.phone = t.validation.phoneInvalid;
    }
  }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = t.validation.subjectRequired;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t.validation.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.validation.messageTooShort;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // If WhatsApp is selected as contact method
      if (formData.contactMethod === 'whatsapp') {
        redirectToWhatsApp();
        return;
      }
      
      // Email submission via Web3Forms
      try {
        setIsSubmitting(true);
        
        const formDataToSend = new FormData();
        formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('message', formData.message);
        formDataToSend.append('from_name', 'SmartView Télé Contact Form');
        
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Success
          setAlertVariant('success');
          setAlertMessage(t.alerts.success);
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            contactMethod: 'email'
          });
        } else {
          // Error
          setAlertVariant('danger');
          setAlertMessage(t.alerts.error);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setAlertVariant('danger');
        setAlertMessage(t.alerts.error);
      } finally {
        setIsSubmitting(false);
        setShowAlert(true);
        
        // Auto-hide alert after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } else {
      setAlertVariant('danger');
      setAlertMessage(t.alerts.fixErrors);
      setShowAlert(true);
    }
  };

  // Redirect to WhatsApp
  const redirectToWhatsApp = () => {
    const phoneNumber = '+2250575965968'; 
    const message = `Hello, my name is ${formData.name}. ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setAlertVariant('success');
    setAlertMessage(t.alerts.redirectWhatsApp);
    setShowAlert(true);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <h1 className="contact-title">{t.heroTitle}</h1>
              <p className="contact-subtitle">
                {t.heroSubtitle}
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact Information Section */}
      <section className="contact-info-section">
        <Container>
          <Row>
            <Col lg={4} md={6} className="contact-info-item">
              <div className="contact-info-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>{t.visitTitle}</h3>
              <p>{t.visitAddress1}</p>
              <p>{t.visitAddress2}</p>

              {/* Extra Store Description */}
              <div className="store-extra-info">
                <h5>{t.storeExtraTitle}</h5>
                <p>{t.storeExtraDescription}</p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="contact-info-item">
              <div className="contact-info-icon">
                <FaPhone />
              </div>
              <h3>{t.callTitle}</h3>
              <p><a href="tel:+2250575965968">+225 05 7596 5968</a></p>
              <p>{t.callHours}</p>
            </Col>
            
            <Col lg={4} md={12} className="contact-info-item">
              <div className="contact-info-icon">
                <FaEnvelope />
              </div>
              <h3>{t.emailTitle}</h3>
              <p><a href="mailto:isrealokeyonyeze@gmail.com">isrealokeyonyeze@gmail.com</a></p>
              <p>{t.emailNote}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <Container>
          <Row>
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="contact-form-wrapper">
                <h2>{t.formTitle}</h2>
                <p>{t.formSubtitle}</p>
                
                {showAlert && (
                  <Alert 
                    variant={alertVariant} 
                    onClose={() => setShowAlert(false)} 
                    dismissible
                  >
                    {alertMessage}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  {/* Hidden field for Web3Forms */}
                  <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                  <input type="hidden" name="from_name" value="SmartView Télé Contact Form" />
                  <input type="hidden" name="subject" value={`New Contact Form Submission: ${formData.subject}`} />
                  {/* Honeypot field to prevent spam */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  
                  <Form.Group className="mb-3">
                    <Form.Label>{t.nameLabel}</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      placeholder={t.namePlaceholder}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t.emailLabel}</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          placeholder={t.emailPlaceholder}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t.phoneLabel}</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>+225</InputGroup.Text>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                            placeholder="01 23 45 67 89"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>{t.subjectLabel}</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      isInvalid={!!errors.subject}
                      placeholder={t.subjectPlaceholder}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>{t.messageLabel}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                      placeholder={t.messagePlaceholder}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>{t.contactMethodLabel}</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label={t.emailOption}
                        name="contactMethod"
                        id="contactEmail"
                        value="email"
                        checked={formData.contactMethod === 'email'}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label={t.whatsappOption}
                        name="contactMethod"
                        id="contactWhatsApp"
                        value="whatsapp"
                        checked={formData.contactMethod === 'whatsapp'}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="submit-btn" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Sending...
                      </>
                    ) : (
                      formData.contactMethod === 'whatsapp' ? t.submitWhatsApp : t.submitEmail
                    )}
                  </Button>
                </Form>
              </div>
            </Col>

            {/* Whatsapp form section */}
            <Col lg={6}>
              <div className="contact-whatsapp-wrapper">
                <div className="whatsapp-content">
                  <div className="whatsapp-icon">
                    <FaWhatsapp />
                  </div>
                  <h2>{t.whatsappTitle}</h2>
                  <p>
                    {t.whatsappText}
                  </p>
                  <Button 
                    variant="success" 
                    className="whatsapp-btn"
                    onClick={() => {
                      const phoneNumber = '+2250575965968'; 
                      const message = encodeURIComponent('Hello, I am interested in your Smart TVs.');
                      window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
                    }}
                  >
                    <FaWhatsapp /> {t.whatsappBtn}
                  </Button>
                  
                  <div className="business-hours">
                    <h3>{t.hoursTitle}</h3>
                    <ul>
                      <li><span>{t.mondayToSaturday}</span> 7:00 AM - 7:00 PM</li>
                      <li><span>{t.sunday}</span> {t.closed}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="social-connect">
                  <h3>{t.connectWithUs}</h3>
                  <div className="social-icons">
                    <a 
                      href="https://www.facebook.com/share/18RmyzRPdq/?mibextid=wwXIfr" className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                    <a 
                      href="https://www.instagram.com/tele_adjame_isreal?igsh=MWdobG9ydzF4eHZueQ%3D%3D&utm_source=qr" 
                      className="social-icon"
                      target='_blank'
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <Container fluid className="p-0">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9699408155086!2d-4.037173825911917!3d5.684915794112361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ebfe1a2c5bd5%3A0x59aa87b9e4d865be!2sRue%20Nimlin%20Fax-Clark%2C%20Abidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sen!2sus!4v1714400000000!5m2!1sen!2sus"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="SmartView Télé Location"
            ></iframe>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;