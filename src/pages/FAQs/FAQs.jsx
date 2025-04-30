import React, { useState } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import faqCategories from './faqCategories';
import { useNavigate } from 'react-router-dom'; 
import './FAQs.css';

const FAQs = () => {
  // Track active category for mobile view
  const [activeCategory, setActiveCategory] = useState('general');

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    document.getElementById(categoryId).scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="faqs-page">
      <Container fluid className="faqs-container">
        {/* Header Section */}
        <HeaderSection />

        {/* Mobile Category Selector */}
        <MobileCategorySelector 
          categories={faqCategories} 
          activeCategory={activeCategory} 
          onChange={handleCategoryChange} 
        />

        <Row className="faqs-content">
          {/* Category Navigation - Desktop */}
          <CategoryNavigation 
            categories={faqCategories} 
            activeCategory={activeCategory} 
            onChange={handleCategoryChange} 
          />

          {/* FAQ Content */}
          <FAQContent 
            categories={faqCategories} 
            activeCategory={activeCategory} 
          />
        </Row>

        {/* Contact Section */}
        <ContactSection />
      </Container>
    </div>
  );
};

// Header Section Component
const HeaderSection = () => (
  <Row className="justify-content-center">
    <Col xs={12} className="text-center">
      <h1 className="faqs-main-title">FAQs</h1>
      <p className="faqs-subtitle">Find answers to commonly asked questions about SmartView Télé</p>
    </Col>
  </Row>
);

// Mobile Category Selector Component
const MobileCategorySelector = ({ categories, activeCategory, onChange }) => (
  <div className="category-selector d-md-none">
    <select 
      className="form-select" 
      value={activeCategory}
      onChange={(e) => onChange(e.target.value)}
    >
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </select>
  </div>
);

// Category Navigation Component
const CategoryNavigation = ({ categories, activeCategory, onChange }) => (
  <Col md={3} className="category-nav d-none d-md-block">
    <div className="category-nav-inner">
      <h3>Categories</h3>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <a 
              href={`#${category.id}`}
              className={activeCategory === category.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onChange(category.id);
              }}
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </Col>
);

// FAQ Content Component
const FAQContent = ({ categories, activeCategory }) => (
  <Col md={9} className="faq-accordion-container">
    {categories.map(category => (
      <div 
        key={category.id} 
        id={category.id} 
        className={`faq-category ${activeCategory === category.id ? 'active' : ''}`}
      >
        <h2 className="category-title">{category.title}</h2>
        <Accordion defaultActiveKey="0" className="faq-accordion">
          {category.questions.map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={faq.id}>
              <Accordion.Header>
                {faq.question}
              </Accordion.Header>
              <Accordion.Body>
                {faq.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    ))}
  </Col>
);

// Contact Section Component
const ContactSection = () => {
  const navigate = useNavigate(); 
  
  return (
      <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} className="text-center contact-section">
        <h3>Still have questions?</h3>
        <p>Our customer support team is here to help you with any questions about our products and services.</p>
        <div className="contact-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Chat with Us
          </button>
        </div>
      </Col>
    </Row>
  )
};

export default FAQs;