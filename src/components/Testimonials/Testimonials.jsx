import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Testimonials.css";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonialImages = [
    "https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749970027/Jean_testimonial_xxqaoi.jpg",
    "https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749970041/Marie_testimonial_c6mn5x.jpg",
    "https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749970054/Ahmed_testimonial_rtryka.jpg",
  ];

  const testimonials = t("testimonials.entries", { returnObjects: true });

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} className={i < rating ? "star filled" : "star empty"} />);
    }
    return stars;
  };

  return (
    <section className="testimonials-section">
      <Container>
        <div className="section-header">
          <h2>{t("testimonials.title")}</h2>
          <p>{t("testimonials.description")}</p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>

            <div className="testimonial-rating">{renderStars(5)}</div>

            <p className="testimonial-text">{testimonials[activeIndex].text}</p>

            <div className="testimonial-author">
              <div className="author-image">
                <img
                  src={testimonialImages[activeIndex] || "/placeholder.svg"}
                  alt={testimonials[activeIndex].name}
                />
              </div>
              <div className="author-info">
                <h4>{testimonials[activeIndex].name}</h4>
                <p>{testimonials[activeIndex].position}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button className="control-btn prev" onClick={prevTestimonial} aria-label="Previous testimonial">
              <FaChevronLeft />
            </button>
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                ></span>
              ))}
            </div>
            <button className="control-btn next" onClick={nextTestimonial} aria-label="Next testimonial">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
