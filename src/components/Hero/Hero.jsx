import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTVContext } from "../../context/TVContext";
import "./Hero.css";
import hero_image from "../../assets/hero-image.png";
import hero_image2 from "../../assets/hero_image2.png";

const images = [hero_image, hero_image2];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { language } = useTVContext(); // Sync language from global context
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
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

  const phoneNumber = "+2250575965968";
  const whatsappMessage = t("hero.whatsappMessage");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="hero-container">
      <div className="hero-left">
        <h1>
          {t("hero.welcome")}{" "}
          <span className="highlight-smart">SmartView</span>{" "}
          <span className="highlight-tele">Télé</span>
        </h1>
        <p>{t("hero.subtitle")}</p>

        <button className="shop-now-btn" onClick={() => navigate("/smart-tvs")}>
          {t("hero.shopNow")}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp className="icon" />
          {t("hero.contactWhatsApp")}
        </a>
      </div>

      <div className="hero-right">
        <div className="carousel-fade">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={t("hero.imageAlt", { index: index + 1 })}
              className={`fade-image ${index === currentIndex ? "active" : ""}`}
            />
          ))}

          <div className="nav-controls">
            <button className="nav-btn prev" onClick={goToPrev} aria-label={t("hero.previous")}>
              <FaChevronLeft />
            </button>
            <button className="nav-btn next" onClick={goToNext} aria-label={t("hero.next")}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
