import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaInfoCircle } from "react-icons/fa"
import "./NotFound.css" // You can reuse the existing styles

const NotFound = () => {
  return (
    <Container className="not-found-container">
      <div className="not-found-content">
        <FaInfoCircle size={50} />
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="back-btn">
          Back to Home
        </Link>
      </div>
    </Container>
  )
}

export default NotFound
