import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaInfoCircle } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import "./NotFound.css"

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Container className="not-found-container">
      <div className="not-found-content">
        <FaInfoCircle size={50} className="not-found-icon" />
        <h2>{t("notFound.title")}</h2>
        <p>{t("notFound.message")}</p>
        <Link to="/" className="back-btn">
          {t("notFound.backToHome")}
        </Link>
      </div>
    </Container>
  )
}

export default NotFound
