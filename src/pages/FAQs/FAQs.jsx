import React, { useState } from "react"
import { Container, Row, Col, Accordion } from "react-bootstrap"
import faqCategories from "./faqCategories"
import { useNavigate } from "react-router-dom"
import { useTVContext } from "../../context/TVContext"
import "./FAQs.css"

const FAQs = () => {
  const { translations } = useTVContext()

  // Track active category for mobile view
  const [activeCategory, setActiveCategory] = useState("general")

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    document.getElementById(categoryId).scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <div className="faqs-page">
      <Container fluid className="faqs-container">
        {/* Header Section */}
        <HeaderSection translations={translations} />

        {/* Mobile Category Selector */}
        <MobileCategorySelector
          categories={faqCategories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          translations={translations}
        />

        <Row className="faqs-content">
          {/* Category Navigation - Desktop */}
          <CategoryNavigation
            categories={faqCategories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
            translations={translations}
          />

          {/* FAQ Content */}
          <FAQContent 
            categories={faqCategories} 
            activeCategory={activeCategory} 
            translations={translations} 
          />
        </Row>

        {/* Contact Section */}
        <ContactSection translations={translations} />
      </Container>
    </div>
  )
}

// Header Section Component
const HeaderSection = ({ translations }) => (
  <Row className="justify-content-center">
    <Col xs={12} className="text-center">
      <h1 className="faqs-main-title">{translations.faqs.title}</h1>
      <p className="faqs-subtitle">{translations.faqs.subtitle}</p>
    </Col>
  </Row>
)

// Mobile Category Selector Component
const MobileCategorySelector = ({ categories, activeCategory, onChange, translations }) => (
  <div className="category-selector d-md-none">
    <select className="form-select" value={activeCategory} onChange={(e) => onChange(e.target.value)}>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {translations.faqs[category.id]?.title || `${category.id} Category`}
        </option>
      ))}
    </select>
  </div>
)

// Category Navigation Component
const CategoryNavigation = ({ categories, activeCategory, onChange, translations }) => (
  <Col md={3} className="category-nav d-none d-md-block">
    <div className="category-nav-inner">
      <h3>{translations.faqs.categories}</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={`#${category.id}`}
              className={activeCategory === category.id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault()
                onChange(category.id)
              }}
            >
              {translations.faqs[category.id]?.title || `${category.id} Category`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </Col>
)

// FAQ Content Component
const FAQContent = ({ categories, activeCategory, translations }) => {
  return (
    <Col md={9} className="faq-accordion-container">
      {categories.map((category) => (
        <div
          key={category.id}
          id={category.id}
          className={`faq-category ${activeCategory === category.id ? "active" : ""}`}
        >
          <h2 className="category-title">{translations.faqs[category.id]?.title || `${category.id} Category`}</h2>
          <Accordion defaultActiveKey="0" className="faq-accordion">
            {category.questions.map((faq) => (
              <Accordion.Item eventKey={faq.id} key={faq.id}>
                <Accordion.Header>
                  {translations.faqs[category.id]?.[faq.id]?.question || `Question ${faq.id}`}
                </Accordion.Header>
                <Accordion.Body>
                  {translations.faqs[category.id]?.[faq.id]?.answer || `Answer for ${faq.id}`}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ))}
    </Col>
  )
}

// Contact Section Component
const ContactSection = ({ translations }) => {
  const navigate = useNavigate()

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} className="text-center contact-section">
        <h3>{translations.faqs.stillHaveQuestions}</h3>
        <p>{translations.faqs.contactSupport}</p>
        <div className="contact-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/contact")}>
            {translations.faqs.chatWithUs}
          </button>
        </div>
      </Col>
    </Row>
  )
}

export default FAQs
