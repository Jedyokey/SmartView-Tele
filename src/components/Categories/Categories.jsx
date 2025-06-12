import { Container, Row, Col } from "react-bootstrap";
import "./Categories.css";
import { useTranslation } from "react-i18next";
import { useTVContext } from "../../context/TVContext"; 

const Categories = () => {
  const { t } = useTranslation();
  const { language } = useTVContext(); 
  
  const categories = [
    {
      id: 1,
      key: "oled",
      image:
        "https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1748735531/LG_OLED_evo_C3_65_4K_Smart_TV_ra0omw.png",
      link: "/smart-tvs?category=OLED",
    },
    {
      id: 2,
      key: "qled",
      image:
        "https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1748920450/TCL_43_Q_Class_4K_UHD_HDR_QLED_Smart_TV__brr6ys.png",
      link: "/smart-tvs?category=QLED",
    },
    {
      id: 3,
      key: "led",
      image:
        "https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1748740995/Sony_Bravia_3_50_4K_HDR_Google_TV_45_zzagyp.png",
      link: "/smart-tvs?category=LED",
    },
    {
      id: 4,
      key: "smart",
      image:
        "https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749090753/Hisense_65_U8K_Mini-LED_ULED_4K_Smart_TV_aqlh9u.png",
      link: "/smart-tvs",
    },
  ];

  return (
    <section className="categories-section">
      <Container>
        <div className="section-header">
          <h2>{t("categories.title")}</h2>
          <p>{t("categories.subtitle")}</p>
        </div>

        <Row>
          {categories.map((category) => (
            <Col key={category.id} lg={3} md={6} sm={6} xs={12}>
              <a href={category.link} className="category-card">
                <div className="category-image">
                  <img
                    src={category.image}
                    alt={t(`categories.items.${category.key}.name`)}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="category-content">
                  <h3>{t(`categories.items.${category.key}.name`)}</h3>
                  <p>{t(`categories.items.${category.key}.desc`)}</p>
                  <span className="explore-btn">{t("categories.explore")}</span>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Categories;
