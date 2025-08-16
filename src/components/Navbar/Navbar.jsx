import { useState, useEffect } from "react"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { Container, Nav, Navbar, Form, FormControl } from "react-bootstrap"
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa"
import { useTranslation } from "react-i18next" 
import { useTVContext } from "../../context/TVContext"
import "./Navbar.css"
import logo from "../../assets/smartview-pro-logo-2.png"
import LanguageToggle from "../LanguageToggle/LanguageToggle"
import { scrollToTop } from "../../utils/scrollToTop"

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { language, languageLoading, switchLanguageWithLoading } = useTVContext()
  const { t, i18n } = useTranslation(undefined, { useSuspense: false })

  // Sync i18next language with global language from context
  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsTablet(window.innerWidth <= 991 && window.innerWidth > 768)
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Prevent body scrolling when menu is open
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden"
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = "auto"
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      closeMobileMenu()
    }
  }

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      closeMobileMenu()
    }
  }

  // Handle language change
  const handleLanguageChange = (lang) => {
    if (lang !== language && !languageLoading) {
      localStorage.setItem("preferredLanguage", lang)
      switchLanguageWithLoading(lang)
      
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
        document.body.style.overflow = 'unset'
      }

      // Use setTimeout to ensure scrolling happens after state updates
      setTimeout(() => {
        scrollToTop()
      }, 100)
    }
  }

  return (
    <>
      <Navbar expand="lg" className="main-navbar py-2">
        <Container className="custom-container">
          {/* Logo - always visible */}
            <Navbar.Brand 
              as={Link} 
              to="/" 
              className="brand-logo"
              onClick={() => {
                if (location.pathname === '/') {
                  scrollToTop();
                }
              }}
            >
              <img src={logo || "/placeholder.svg"} alt="SmartView Tele Logo" className="logo-img" />
              <span className="brand-text">
                Smart<span className="view-text">View</span>
                <span className="tele-text">Télé</span>
              </span>
            </Navbar.Brand>

          {/* Tablet Search Bar - Only visible on tablet */}
          {isTablet && (
            <Form className="d-flex tablet-search-form" onSubmit={handleSearch}>
              <div className="search-wrapper">
                <FormControl
                  type="search"
                  placeholder={t("navigation.search") + "..."}
                  aria-label={t("navigation.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i
                  className="fas fa-search tablet-search-icon"
                  role="button"
                  tabIndex="0"
                  onClick={handleSearchIconClick}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchIconClick()}
                ></i>
              </div>
            </Form>
          )}

          {/* Mobile Menu Toggle - Only visible on mobile */}
          {isMobile && (
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}

          {/* Desktop Menu - Only visible on desktop */}
          <Navbar.Collapse id="main-navbar-nav" className={isMobile ? "d-none" : ""}>
            <Nav className={`${isTablet ? "tablet-nav-links" : "mx-auto nav-links"}`}>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                {t("navigation.shop")}
              </NavLink>
              <NavLink to="/smart-tvs" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                {t("navigation.smartTVs")}
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                {t("navigation.about")}
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                {t("navigation.contact")}
              </NavLink>
              <NavLink to="/faqs" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                {t("navigation.faqs")}
              </NavLink>
            </Nav>

            {/* Desktop Search Form - Only visible on desktop */}
            {!isTablet && !isMobile && (
              <Form className="d-flex search-form" onSubmit={handleSearch}>
                <FormControl
                  type="search"
                  placeholder={`${t("navigation.search")} ${t("navigation.smartTVs")}...`}
                  className="me-5"
                  aria-label={t("navigation.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i
                  className="fas fa-search search-icon"
                  role="button"
                  tabIndex="0"
                  onClick={handleSearchIconClick}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchIconClick()}
                ></i>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Search Bar - Only visible on mobile and not on search page */}
      {isMobile && !location.pathname.includes('/search') && (
        <div className="mobile-search-container">
          <Form className="d-flex mobile-search-form" onSubmit={handleSearch}>
            <div className="search-wrapper">
              <FormControl
                type="search"
                placeholder={t("navigation.search") + "..."}
                aria-label={t("navigation.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i
                className="fas fa-search mobile-search-icon"
                role="button"
                tabIndex="0"
                onClick={handleSearchIconClick}
                onKeyDown={(e) => e.key === "Enter" && handleSearchIconClick()}
              ></i>
            </div>
          </Form>
        </div>
      )}

      {/* Mobile Menu - Only for mobile */}
      {isMobile && (
        <>
          <div 
            className={`mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`} 
            onClick={closeMobileMenu}> 
          </div>
          <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`} id="mobile-menu">
            <div className="mobile-menu-header">
              <div className="mobile-brand">
                {/* Logo in Mobile Menu Header */}
                <Link to="/" onClick={closeMobileMenu} className="mobile-logo-link">
                  <div className="mobile-logo-wrapper">
                    <img src={logo || "/placeholder.svg"} alt="SmartView Télé Logo" className="mobile-logo-img" />
                    <span className="brand-text">
                      Smart<span className="view-text">View</span>
                      <span className="tele-text">Télé</span>
                    </span>
                  </div>
                </Link>
              </div>
              <button className="mobile-menu-close" onClick={closeMobileMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="mobile-menu-content">
              {/* Mobile Search Form in Menu */}
              <div className="mobile-menu-search">
                <Form onSubmit={handleSearch}>
                  <div className="search-wrapper">
                    <FormControl
                      type="search"
                      placeholder={t("navigation.search") + "..."}
                      aria-label={t("navigation.search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="mobile-menu-search-btn">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </Form>
              </div>

              {/* Main Navigation Links with Arrows */}
              <div className="mobile-nav-section">
                <NavLink to="/" className="mobile-nav-item" onClick={closeMobileMenu}>
                  {t("navigation.shop").toUpperCase()}
                  <i className="fas fa-chevron-right"></i>
                </NavLink>
                <NavLink to="/smart-tvs" className="mobile-nav-item" onClick={closeMobileMenu}>
                  {t("navigation.smartTVs").toUpperCase()}
                  <i className="fas fa-chevron-right"></i>
                </NavLink>
                <NavLink to="/about" className="mobile-nav-item" onClick={closeMobileMenu}>
                  {t("navigation.about").toUpperCase()} 
                  <i className="fas fa-chevron-right"></i>
                </NavLink>
                <NavLink to="/contact" className="mobile-nav-item" onClick={closeMobileMenu}>
                  {t("navigation.contact").toUpperCase()}
                  <i className="fas fa-chevron-right"></i>
                </NavLink>
                <NavLink to="/faqs" className="mobile-nav-item" onClick={closeMobileMenu}>
                  {t("navigation.faqs").toUpperCase()}
                  <i className="fas fa-chevron-right"></i>
                </NavLink>
              </div>

              {/* Info Section */}
              <div className="mobile-section">
                <h3 className="mobile-section-title">Info</h3>
                <div className="mobile-section-links">
                  <NavLink to="/search" className="mobile-section-link" onClick={closeMobileMenu}>
                    {t("navigation.search")}
                  </NavLink>
                  <NavLink to="/about" className="mobile-section-link" onClick={closeMobileMenu}>
                    {t("navigation.about")} 
                  </NavLink>
                  <NavLink to="/contact" className="mobile-section-link" onClick={closeMobileMenu}>
                    {t("navigation.contact")} 
                  </NavLink>
                  <NavLink to="/faqs" className="mobile-section-link" onClick={closeMobileMenu}>
                    {t("navigation.faqs")}
                  </NavLink>
                </div>
              </div>

              {/* Get in touch Section */}
              <div className="mobile-section">
                <h3 className="mobile-section-title">Get in touch</h3>
                <div className="mobile-section-links">
                  <a href="tel:+2250575965968" className="mobile-section-link">
                    <i className="fas fa-phone-alt me-2"></i> +225 05 7596 5968
                  </a>
                  <div className="mobile-social-links">
                    <a
                      href="https://www.facebook.com/share/18RmyzRPdq/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="https://www.instagram.com/tele_adjame_isreal?igsh=MWdobG9ydzF4eHZueQ%3D%3D&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://www.tiktok.com/@isrealokey6?_t=ZM-8wESJbNhVLy&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                    >
                      <FaTiktok />
                    </a>
                  </div>
                </div>
              </div>

              {/* Language Toggle in Mobile Menu */}
              <div className="mobile-language-toggle">
                <LanguageToggle onLanguageChange={handleLanguageChange} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navigation
