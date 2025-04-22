import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar bg-light py-2 border-bottom">
      <Container fluid className="px-3 px-md-4">
        <Row className="align-items-center">
          <Col xs={6} className="d-flex justify-content-start">
            <LanguageToggle />
          </Col>
          <Col xs={6} className="d-flex justify-content-end top-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <i className="fab fa-instagram"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
