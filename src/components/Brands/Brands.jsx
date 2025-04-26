import { Container } from "react-bootstrap"
import "./Brands.css"

const Brands = () => {
  const brands = [
    { id: 1, name: "Samsung", logo: "https://i.pinimg.com/736x/f3/1e/04/f31e042d016da67ec981a44005f40fd1.jpg", link: "/smart-tvs?brand=Samsung" },
    { id: 2, name: "LG", logo: "https://i.pinimg.com/736x/db/a3/2c/dba32c2a6dc9602b611f5a74dca60e9c.jpg", link: "/smart-tvs?brand=LG" },
    { id: 3, name: "Sony", logo: "https://i.pinimg.com/736x/71/ac/84/71ac84aee7fc00c02b8f183a300c193d.jpg", link: "/smart-tvs?brand=Sony" },
    { id: 4, name: "TCL", logo: "https://i.pinimg.com/736x/04/6d/43/046d43ce52cecd16b4a9b099f8cf920a.jpg", link: "/smart-tvs?brand=TCL" },
    { id: 5, name: "Hisense", logo: "https://i.pinimg.com/736x/00/49/0b/00490b84d633acde73d8d582f49284b3.jpg", link: "/smart-tvs?brand=Hisense" },
  ]

  return (
    <section className="brands-section">
      <Container>
        <div className="section-header">
          <h2>Our Trusted Brands</h2>
          <p>We partner with the world's leading TV manufacturers</p>
        </div>

        <div className="brands-container">
          {brands.map((brand) => (
            <a key={brand.id} href={brand.link} className="brand-item">
              <img src={brand.logo || "/placeholder.svg"} alt={brand.name} />
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Brands
