import { Container, Row, Col } from "react-bootstrap"
import "./Categories.css"

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "OLED TVs",
      description: "Perfect black levels and infinite contrast",
      image: "https://i5.walmartimages.com/seo/LG-65-Class-4K-UHD-OLED-Web-OS-Smart-TV-with-Dolby-Vision-C3-Series-OLED65C3PUA_4507d0a3-83cb-4420-9c59-ef2c191d7fe7.3c9fdb1665a5e2074e0c8c38fc251fff.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      link: "/smart-tvs?category=OLED",
    },
    {
      id: 2,
      name: "QLED TVs",
      description: "Vibrant colors with Quantum Dot technology",
      image: "https://www.tcl.com/usca/content/dam/tcl/product/home-theater/q-class/43q51bg/43Q51BG-UI_Front.png",
      link: "/smart-tvs?category=QLED",
    },
    {
      id: 3,
      name: "LED TVs",
      description: "Affordable quality with great performance",
      image: "https://d1ncau8tqf99kp.cloudfront.net/converted/118893_original_local_1200x1050_v3_converted.webp",
      link: "/smart-tvs?category=LED",
    },
    {
      id: 4,
      name: "Smart TVs",
      description: "Connect to your favorite streaming services",
      image: "https://m.media-amazon.com/images/I/61W9PZAWKTL._AC_SX569_.jpg",
      link: "/smart-tvs",
    },
  ]

  return (
    <section className="categories-section">
      <Container>
        <div className="section-header">
          <h2>Browse by Category</h2>
          <p>Find the perfect TV for your entertainment needs</p>
        </div>

        <Row>
          {categories.map((category) => (
            <Col key={category.id} lg={3} md={6} sm={6} xs={12}>
              <a href={category.link} className="category-card">
                <div className="category-image">
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="explore-btn">Explore</span>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Categories
