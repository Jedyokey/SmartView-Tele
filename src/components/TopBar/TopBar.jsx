import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
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
            <a 
              href="https://www.facebook.com/share/18RmyzRPdq/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mx-2"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.instagram.com/tele_adjame_isreal?igsh=MWdobG9ydzF4eHZueQ%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mx-2"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.tiktok.com/@isrealokey6?_t=ZM-8wESJbNhVLy&_r=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mx-2"
            >
              <SiTiktok />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
