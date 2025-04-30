import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
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
  const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

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
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.name.trim())) {
      newErrors.name = 'Please enter a valid name (letters only)';
    }
    
    // Email validation
    if (formData.contactMethod === 'email' || formData.email.trim()) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Phone validation
    if (formData.contactMethod === 'whatsapp' || formData.phone.trim()) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required for WhatsApp contact';
      } else if (!/^(\+225|00225)?[0-9]{8,10}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid Ivorian phone number';
      }
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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
          setAlertMessage('Your message has been sent successfully! We will contact you soon.');
          
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
          setAlertMessage('There was an error sending your message. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setAlertVariant('danger');
        setAlertMessage('There was an error sending your message. Please try again later.');
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
      setAlertMessage('Please correct the errors in the form.');
      setShowAlert(true);
    }
  };

  // Redirect to WhatsApp
  const redirectToWhatsApp = () => {
    const phoneNumber = '+2250575965968'; // Replace with actual seller's WhatsApp number
    const message = `Hello, my name is ${formData.name}. ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setAlertVariant('success');
    setAlertMessage('Redirecting you to WhatsApp to continue the conversation.');
    setShowAlert(true);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <h1 className="contact-title">Contact Us</h1>
              <p className="contact-subtitle">
                Have questions about our Smart TVs or need assistance? 
                We're here to help you find the perfect entertainment solution.
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
              <h3>Visit Our Store</h3>
              <p>Abidjan, Cocody</p>
              <p>Ivory Coast</p>
            </Col>
            
            <Col lg={4} md={6} className="contact-info-item">
              <div className="contact-info-icon">
                <FaPhone />
              </div>
              <h3>Call Us</h3>
              <p><a href="tel:+2250707070707">+225 05 7596 5968</a></p>
              <p>Mon-Sat: 7am - 7pm</p>
            </Col>
            
            <Col lg={4} md={12} className="contact-info-item">
              <div className="contact-info-icon">
                <FaEnvelope />
              </div>
              <h3>Email Us</h3>
              <p><a href="mailto:info@smartviewtele.com">isrealokeyonyeze@gmail.com</a></p>
              <p>We'll respond within 24 hours</p>
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
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                
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
                    <Form.Label>Your Name*</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      placeholder="Enter your full name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address*</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          placeholder="Enter your email"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number*</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                          placeholder="+225 XX XXXX XXXX"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Subject*</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      isInvalid={!!errors.subject}
                      placeholder="What is this regarding?"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Message*</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                      placeholder="How can we help you?"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Preferred Contact Method</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Email"
                        name="contactMethod"
                        id="contactEmail"
                        value="email"
                        checked={formData.contactMethod === 'email'}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="WhatsApp"
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
                      formData.contactMethod === 'whatsapp' ? 'Contact via WhatsApp' : 'Send Message'
                    )}
                  </Button>
                </Form>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="contact-whatsapp-wrapper">
                <div className="whatsapp-content">
                  <div className="whatsapp-icon">
                    <FaWhatsapp />
                  </div>
                  <h2>Contact Us Directly on WhatsApp</h2>
                  <p>
                    For immediate assistance, you can reach us directly on WhatsApp. 
                    Our customer service team is available to answer your questions about our Smart TVs.
                  </p>
                  <Button 
                    variant="success" 
                    className="whatsapp-btn"
                    onClick={() => {
                      const phoneNumber = '+2250575965968'; // Replace with actual seller's WhatsApp number
                      const message = encodeURIComponent('Hello, I am interested in your Smart TVs.');
                      window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
                    }}
                  >
                    <FaWhatsapp /> Chat with Us on WhatsApp
                  </Button>
                  
                  <div className="business-hours">
                    <h3>Business Hours</h3>
                    <ul>
                      <li><span>Monday - Saturday:</span> 7:00 AM - 7:00 PM</li>
                      {/* <li><span>Saturday:</span> 7:00 AM - 5:00 PM</li> */}
                      <li><span>Sunday:</span> Closed</li>
                    </ul>
                  </div>
                </div>
                
                <div className="social-connect">
                  <h3>Connect With Us</h3>
                  <div className="social-icons">
                    <a href="#" className="social-icon"><FaFacebookF /></a>
                    <a href="#" className="social-icon"><FaTwitter /></a>
                    <a href="#" className="social-icon"><FaInstagram /></a>
                    <a href="#" className="social-icon"><FaYoutube /></a>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127356.39773539181!2d-4.0883311674805!3d5.348545628864936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959121%3A0x3fe70ddce19221a6!2sAbidjan%2C%20Ivory%20Coast!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
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