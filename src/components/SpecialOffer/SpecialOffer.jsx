import { Row, Col } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import "./SpecialOffer.css";
import { useTranslation } from "react-i18next";
import { useTVContext } from "../../context/TVContext";
import special_offer_image from "../../assets/special_offer_img.webp";

const SpecialOffer = () => {
  const { t } = useTranslation();
  const { language } = useTVContext();

  return (
    <section className="special-offer-section">
      <div className="special-offer-wrapper">
        <Row className="g-0">
          <Col lg={6} className="offer-image">
            <img
              src={special_offer_image}
              alt={t("specialOffer.title")}
              className="offer-img"
              loading="lazy"
            />
          </Col>
          <Col lg={6} className="offer-content">
            <div className="offer-content-inner">
              <div className="offer-badge">{t("specialOffer.badge")}</div>
              <h2>{t("specialOffer.title")}</h2>
              <p className="offer-description">{t("specialOffer.description")}</p>

              <div className="discount-highlight">
                <span className="discount-value">{t("specialOffer.discount")}</span>
                <span className="discount-period">
                  <FaClock /> {t("specialOffer.endsIn")}
                </span>
              </div>

              <ul className="offer-features">
                {t("specialOffer.features", { returnObjects: true }).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <a href="/smart-tvs" className="shop-offer-btn">
                {t("specialOffer.button")}
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SpecialOffer;
