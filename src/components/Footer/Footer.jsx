import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [language, setLanguage] = useState('en'); // Default language is English

  // Content in both languages
  const content = {
    en: {
      quickLinks: 'Quick Links',
      aboutUs: 'About Us',
      products: 'Products',
      services: 'Services',
      blog: 'Blog',
      contactUs: 'Contact Us',
      support: 'Support',
      categories: 'Categories',
      smartTVs: 'Smart TVs',
      accessories: 'Accessories',
      homeTheater: 'Home Theater',
      soundSystems: 'Sound Systems',
      mountingKits: 'Mounting Kits',
      remoteControls: 'Remote Controls',
      contactInfo: 'Contact Information',
      address: 'Abidjan, Cocody, Ivory Coast',
      callUs: 'Call Us',
      emailUs: 'Email Us',
      email: 'info@smartviewtele.com',
      followUs: 'Follow Us',
      newsletter: 'Newsletter',
      subscribeText: 'Subscribe to receive updates on new products and special promotions',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      copyright: '© 2023 SmartView Télé. All rights reserved.',
      developedBy: 'Developed by Jedy++',
      language: 'Language',
      english: 'English',
      french: 'French'
    },
    fr: {
      quickLinks: 'Liens Rapides',
      aboutUs: 'À Propos',
      products: 'Produits',
      services: 'Services',
      blog: 'Blog',
      contactUs: 'Contactez-Nous',
      support: 'Support',
      categories: 'Catégories',
      smartTVs: 'Télévisions Intelligentes',
      accessories: 'Accessoires',
      homeTheater: 'Home Cinéma',
      soundSystems: 'Systèmes Audio',
      mountingKits: 'Kits de Montage',
      remoteControls: 'Télécommandes',
      contactInfo: 'Informations de Contact',
      address: 'Abidjan, Cocody, Côte d\'Ivoire',
      callUs: 'Appelez-Nous',
      emailUs: 'Envoyez-Nous un Email',
      email: 'info@smartviewtele.com',
      followUs: 'Suivez-Nous',
      newsletter: 'Bulletin d\'Information',
      subscribeText: 'Abonnez-vous pour recevoir des mises à jour sur les nouveaux produits et les promotions spéciales',
      emailPlaceholder: 'Votre adresse email',
      subscribe: 'S\'abonner',
      copyright: '© 2023 SmartView Télé. Tous droits réservés.',
      developedBy: 'Développé par Jedy++',
      language: 'Langue',
      english: 'Anglais',
      french: 'Français'
    }
  };

  // Current language content
  const t = content[language];

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <Container>
          <Row>
            {/* Company Info */}
            <Col lg={3} md={6} sm={12} className="footer-column">
              <div className="footer-logo">
                <h2>SmartView <span>Télé</span></h2>
              </div>
              <p className="footer-about">
                {language === 'en' 
                  ? 'Your premier destination for high-quality Smart TVs and home entertainment systems in Ivory Coast.' 
                  : 'Votre destination privilégiée pour les Smart TV et systèmes de divertissement à domicile de haute qualité en Côte d\'Ivoire.'}
              </p>
              <div className="language-selector">
                <div className="language-toggle">
                  <span>{t.language}:</span>
                  <button 
                    className={`language-btn ${language === 'en' ? 'active' : ''}`} 
                    onClick={() => setLanguage('en')}
                  >
                    <FaGlobe /> {t.english}
                  </button>
                  <button 
                    className={`language-btn ${language === 'fr' ? 'active' : ''}`} 
                    onClick={() => setLanguage('fr')}
                  >
                    <FaGlobe /> {t.french}
                  </button>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6} sm={6} className="footer-column">
              <h4>{t.quickLinks}</h4>
              <ul className="footer-links">
                <li><a href="#">{t.aboutUs}</a></li>
                <li><a href="#">{t.products}</a></li>
                <li><a href="#">{t.services}</a></li>
                <li><a href="#">{t.blog}</a></li>
                <li><a href="#">{t.contactUs}</a></li>
                <li><a href="#">{t.support}</a></li>
              </ul>
            </Col>

            {/* Categories */}
            <Col lg={2} md={6} sm={6} className="footer-column">
              <h4>{t.categories}</h4>
              <ul className="footer-links">
                <li><a href="#">{t.smartTVs}</a></li>
                <li><a href="#">{t.accessories}</a></li>
                <li><a href="#">{t.homeTheater}</a></li>
                <li><a href="#">{t.soundSystems}</a></li>
                <li><a href="#">{t.mountingKits}</a></li>
                <li><a href="#">{t.remoteControls}</a></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col lg={2} md={6} sm={6} className="footer-column">
              <h4>{t.contactInfo}</h4>
              <ul className="footer-contact">
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>{t.address}</span>
                </li>
                <li>
                  <FaPhone className="contact-icon" />
                  <span>{t.callUs}: <a href="tel:+2250707070707">+225 07 0707 0707</a></span>
                </li>
                <li>
                  <FaWhatsapp className="contact-icon whatsapp" />
                  <span>WhatsApp: <a href="https://wa.me/2250505050505">+225 05 0505 0505</a></span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <span>{t.emailUs}: <a href="mailto:info@smartviewtele.com">{t.email}</a></span>
                </li>
              </ul>
            </Col>

            {/* Newsletter */}
            <Col lg={3} md={6} sm={12} className="footer-column">
              <h4>{t.newsletter}</h4>
              <p>{t.subscribeText}</p>
              <Form className="newsletter-form">
                <Form.Group>
                  <Form.Control type="email" placeholder={t.emailPlaceholder} />
                </Form.Group>
                <Button type="submit" className="subscribe-btn">{t.subscribe}</Button>
              </Form>
              <div className="social-icons">
                <h5>{t.followUs}</h5>
                <div className="social-links">
                  <a href="#" className="social-icon"><FaFacebookF /></a>
                  <a href="#" className="social-icon"><FaTwitter /></a>
                  <a href="#" className="social-icon"><FaInstagram /></a>
                  <a href="#" className="social-icon"><FaYoutube /></a>
                  <a href="#" className="social-icon"><FaWhatsapp /></a>
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
                  <a href="tel:+2250707070707">
                    <FaPhone className="dev-icon" /> +225 07 0707 0707
                  </a>
                  <a href="https://wa.me/2250505050505">
                    <FaWhatsapp className="dev-icon whatsapp" /> +225 05 0505 0505
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;