import React, { useState, useEffect, useCallback } from "react";
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTVContext } from "../../context/TVContext";
import "./Hero.css";
import hero_image_webp from "../../assets/hero-image.webp";
import hero_image2_webp from "../../assets/hero_image2.webp";
import hero_image_fallback from "../../assets/hero-image.png";
import hero_image2_fallback from "../../assets/hero_image2.png";

const images = [
  {
    webp: hero_image_webp,
    fallback: hero_image_fallback,
    alt: "Smart TV Collection"
  },
  {
    webp: hero_image2_webp,
    fallback: hero_image2_fallback,
    alt: "Premium Smart TV"
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { translations } = useTVContext();
  const t = translations?.hero || {};

  // Memoize navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // WhatsApp setup
  const phoneNumber = "+2250575965968";
  const whatsappMessage = t.whatsappMessage || "Hello! I'm interested in your Smart TVs.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="hero-container">
      <div className="hero-left">
        <h1>
          {t.welcome || "Welcome to"}{" "}
          <span className="highlight-smart">SmartView</span>{" "}
          <span className="highlight-tele">Télé</span>
        </h1>
        <p>{t.subtitle || "Discover the future of entertainment"}</p>

        <button 
          className="shop-now-btn" 
          onClick={() => navigate("/smart-tvs")}
          aria-label={t.shopNow || "Shop Now"}
        >
          {t.shopNow || "Shop Now"}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          aria-label={t.contactWhatsApp || "Contact on WhatsApp"}
        >
          <FaWhatsapp className="icon" />
          {t.contactWhatsApp || "Contact on WhatsApp"}
        </a>
      </div>

      <div className="hero-right">
        <div className="carousel-fade">
          {images.map((img, index) => (
            <picture key={index} className={`fade-image ${index === currentIndex ? "active" : ""}`}>
              <source srcSet={img.webp} type="image/webp" />
              <img
                src={img.fallback}
                alt={t.imageAlt ? t.imageAlt.replace('{index}', index + 1) : img.alt}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
          ))}

          <div className="nav-controls">
            <button 
              className="nav-btn prev" 
              onClick={goToPrev} 
              aria-label={t.previous || "Previous image"}
            >
              <FaChevronLeft />
            </button>
            <button 
              className="nav-btn next" 
              onClick={goToNext} 
              aria-label={t.next || "Next image"}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
