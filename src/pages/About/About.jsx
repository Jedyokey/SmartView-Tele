import React from 'react';
import "./About.css"

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h1>About SmartView Télé</h1>
          <p>Connecting the world through innovative technology</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="about-section story-section">
        <div className="section-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2015, SmartView Télé began with a simple mission: to provide cutting-edge telecommunications
            products that enhance people's lives. What started as a small operation has grown into a trusted name in the
            industry.
          </p>
          <p>
            Our journey has been defined by innovation, quality, and customer satisfaction. We believe in creating
            products that not only meet but exceed expectations, setting new standards in the telecommunications market.
          </p>
        </div>
        <div className="image-container">
          {/* Placeholder for company history image */}
          <img src="/placeholder.svg?height=400&width=600" alt="Our company history" className="about-image" />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="about-section mission-section">
        <div className="image-container">
          {/* Placeholder for mission image */}
          <img src="/placeholder.svg?height=400&width=600" alt="Our mission" className="about-image" />
        </div>
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            At SmartView Télé, we're committed to delivering innovative telecommunications solutions that connect people
            and enhance their daily experiences. We strive to:
          </p>
          <ul>
            <li>Provide high-quality, reliable products</li>
            <li>Offer exceptional customer service</li>
            <li>Stay at the forefront of technological advancements</li>
            <li>Create sustainable and eco-friendly solutions</li>
          </ul>
        </div>
      </section>

      {/* Video Section */}
      <section className="about-section video-section">
        <h2>Discover Our Story</h2>
        <p>Watch this short video to learn more about SmartView Télé and our journey.</p>
        <div className="video-container">
          {/* Placeholder for video - will be replaced with actual video */}
          <div className="video-placeholder">
            <div className="play-button">
              <span>▶</span>
            </div>
            <p>Video: Our SmartView Télé Journey</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We constantly push the boundaries of what's possible in telecommunications.</p>
          </div>
          <div className="value-card">
            <h3>Quality</h3>
            <p>We never compromise on the quality of our products and services.</p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We conduct business with honesty, transparency, and ethical standards.</p>
          </div>
          <div className="value-card">
            <h3>Customer Focus</h3>
            <p>Our customers are at the heart of everything we do.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
