import { useState } from "react"
import { Container } from "react-bootstrap"
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "./Testimonials.css"

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jean Kouassi",
      position: "Business Owner",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "The quality of the Samsung QLED TV I purchased from SmartView Télé exceeded my expectations. The colors are vibrant and the customer service was exceptional. Highly recommended!",
    },
    {
      id: 2,
      name: "Marie Diallo",
      position: "Interior Designer",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "I bought an LG OLED TV for my new apartment and I am amazed by the picture quality. The team at SmartView Télé was very helpful in guiding me to choose the right model for my space.",
    },
    {
      id: 3,
      name: "Ahmed Touré",
      position: "Tech Enthusiast",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "Great selection of smart TVs with competitive prices. The delivery was prompt and the installation service was professional. Will definitely shop here again for my tech needs.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} className={i < rating ? "star filled" : "star empty"} />)
    }
    return stars
  }

  return (
    <section className="testimonials-section">
      <Container>
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Hear from our satisfied customers about their experience</p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>

            <div className="testimonial-rating">{renderStars(testimonials[activeIndex].rating)}</div>

            <p className="testimonial-text">{testimonials[activeIndex].text}</p>

            <div className="testimonial-author">
              <div className="author-image">
                <img src={testimonials[activeIndex].image || "/placeholder.svg"} alt={testimonials[activeIndex].name} />
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
  )
}

export default Testimonials
