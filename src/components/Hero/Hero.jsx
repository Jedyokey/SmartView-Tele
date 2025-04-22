import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './Hero.css';
import hero_image from '../../assets/hero-image.png';
import hero_image2 from '../../assets/hero_image2.png'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [hero_image, hero_image2];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="hero-container">
      <div className="hero-left">
        <h1>
          Welcome to <span className="highlight-smart">SmartView</span>{' '}
          <span className="highlight-tele">Télé</span>
        </h1>
        <p>Your go-to place for the best Smart TVs!</p>
        <button className="shop-now-btn">Shop Now</button>
        <button className="whatsapp-btn">
          <FaWhatsapp className="icon" />
          Contact us on WhatsApp
        </button>
      </div>

      <div className="hero-right">
        <div className="carousel-fade">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Smart TV ${index + 1}`}
              className={`fade-image ${index === currentIndex ? 'active' : ''}`}
            />
          ))}

          <div className="nav-controls">
                <button className="nav-btn prev" onClick={goToPrev}>
                    <FaChevronLeft />
                    </button>
                    <button className="nav-btn next" onClick={goToNext}>
                    <FaChevronRight />
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
