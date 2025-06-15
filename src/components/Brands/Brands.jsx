import { Container } from "react-bootstrap";
import "./Brands.css";
import { useTranslation } from "react-i18next";
import samsungLogo from "../../assets/brands/samsung.webp";
import lgLogo from "../../assets/brands/LG.webp";
import sonyLogo from "../../assets/brands/sony.webp";
import tclLogo from "../../assets/brands/TCL.webp";
import hisenseLogo from "../../assets/brands/Hisense.webp";

const Brands = () => {
  const { t } = useTranslation();

  const brands = [
    {
      id: 1,
      name: "Samsung",
      logo: samsungLogo,
      link: "/smart-tvs?brand=Samsung",
    },
    {
      id: 2,
      name: "LG",
      logo: lgLogo,
      link: "/smart-tvs?brand=LG",
    },
    {
      id: 3,
      name: "Sony",
      logo: sonyLogo,
      link: "/smart-tvs?brand=Sony",
    },
    {
      id: 4,
      name: "TCL",
      logo: tclLogo,
      link: "/smart-tvs?brand=TCL",
    },
    {
      id: 5,
      name: "Hisense",
      logo: hisenseLogo,
      link: "/smart-tvs?brand=Hisense",
    },
  ];

  return (
    <section className="brands-section">
      <Container>
        <div className="section-header">
          <h2>{t("brands.title")}</h2>
          <p>{t("brands.description")}</p>
        </div>

        <div className="brands-container">
          {brands.map((brand) => (
            <a key={brand.id} href={brand.link} className="brand-item">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.svg";
                }}
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Brands;
