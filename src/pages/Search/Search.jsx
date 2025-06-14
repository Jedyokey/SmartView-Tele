import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Container, Row, Col, Form, InputGroup, Button, Alert, Badge } from "react-bootstrap"
import { FaSearch, FaTimes } from "react-icons/fa"
import { Sliders } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import ProductCard from "../../components/ProductCard/ProductCard"
import smartTVs from "../../TV_Data/data"
import { useTVContext } from "../../context/TVContext"
import "./Search.css"

// Move formatPrice outside component to prevent recreation
const formatPrice = (price) => {
  return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " CFA" || "0 CFA"
}

// Create a cache object outside the component
const searchCache = new Map()

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const initialQuery = queryParams.get("q") || ""
  const filterSidebarRef = useRef(null)

  // Get translations and helper functions from context
  const {
    translations,
    language,
    getLocalizedText,
    getSizeKey,
    isSizeSelected,
    getSelectedSizesForDisplay,
    toggleFilter,
    filters,
  } = useTVContext()
  const t = translations.search

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [noResults, setNoResults] = useState(false)

  // Filters
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 })

  // Memoize unique values for filters
  const { brands, categories, sizes } = useMemo(() => ({
    brands: [...new Set(smartTVs?.map((tv) => tv.brand) || [])],
    categories: [...new Set(smartTVs?.map((tv) => tv.category) || [])],
    sizes: [...new Set(smartTVs?.map((tv) => getLocalizedText(tv, "size", "")).filter((size) => size !== "") || [])].sort()
  }), [getLocalizedText])

  // Memoize hasActiveFilters
  const hasActiveFilters = useMemo(() => {
    return (
      selectedBrands.length > 0 ||
      selectedCategories.length > 0 ||
      getSelectedSizesForDisplay().length > 0 ||
      priceRange.min > 0 ||
      priceRange.max < 2000000
    )
  }, [selectedBrands, selectedCategories, getSelectedSizesForDisplay, priceRange])

  // Memoize search function with caching
  const performSearch = useCallback((query) => {
    setLoading(true)
    setNoResults(false)

    // Create a cache key based on search parameters
    const cacheKey = JSON.stringify({
      query,
      selectedBrands,
      selectedCategories,
      sizeFilters: filters.size,
      priceRange,
      language
    })

    // Check if we have cached results
    if (searchCache.has(cacheKey)) {
      const cachedResults = searchCache.get(cacheKey)
      setSearchResults(cachedResults)
      setNoResults(cachedResults.length === 0)
      setLoading(false)
      return
    }

    const searchTimeout = setTimeout(() => {
      try {
        if (!Array.isArray(smartTVs)) {
          throw new Error("Invalid products data")
        }

        let results = []

        if (!query.trim() && !hasActiveFilters) {
          results = [...smartTVs]
        } else {
          const lowerCaseQuery = query.toLowerCase().trim()

          results = smartTVs.filter((product) => {
            // Apply filters first
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
            const productSize = getLocalizedText(product, "size", "")
            const productSizeKey = getSizeKey(productSize)
            const matchesSize = filters.size.length === 0 || filters.size.includes(productSizeKey)
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

            if (!lowerCaseQuery) {
              return matchesBrand && matchesCategory && matchesSize && matchesPrice
            }

            // Check if query matches any field
            const productName = getLocalizedText(product, "name", "")
            const productDescription = getLocalizedText(product, "description", "")
            const productFeatures = getLocalizedText(product, "features", [])

            const nameMatch = productName.toLowerCase().includes(lowerCaseQuery)
            const brandMatch = product.brand?.toLowerCase().includes(lowerCaseQuery)
            const categoryMatch = product.category?.toLowerCase().includes(lowerCaseQuery)
            const descriptionMatch = productDescription.toLowerCase().includes(lowerCaseQuery)
            const tagMatch = product.tags?.some((tag) => tag?.toLowerCase().includes(lowerCaseQuery))
            const featuresArray = Array.isArray(productFeatures) ? productFeatures : []
            const featureMatch = featuresArray.some((feature) => feature?.toLowerCase().includes(lowerCaseQuery))
            const resolutionMatch = product.resolution?.toLowerCase().includes(lowerCaseQuery)
            const sizeMatch = productSize.toLowerCase().includes(lowerCaseQuery)

            // Check price-related queries
            let priceMatch = false
            if (lowerCaseQuery.includes("under") || lowerCaseQuery.includes("less than")) {
              const priceThreshold = Number.parseInt(lowerCaseQuery.replace(/\D/g, ""))
              if (!isNaN(priceThreshold)) {
                priceMatch = product.price < priceThreshold
              }
            }

            if (lowerCaseQuery.includes("-")) {
              const [minStr, maxStr] = lowerCaseQuery.split("-")
              const min = Number.parseInt(minStr.replace(/\D/g, ""))
              const max = Number.parseInt(maxStr.replace(/\D/g, ""))
              if (!isNaN(min) && !isNaN(max)) {
                priceMatch = product.price >= min && product.price <= max
              }
            }

            return (
              (nameMatch ||
                brandMatch ||
                categoryMatch ||
                descriptionMatch ||
                tagMatch ||
                featureMatch ||
                resolutionMatch ||
                sizeMatch ||
                priceMatch) &&
              matchesBrand &&
              matchesCategory &&
              matchesSize &&
              matchesPrice
            )
          })
        }

        // Cache the results
        searchCache.set(cacheKey, results)

        // Limit cache size to prevent memory issues
        if (searchCache.size > 50) {
          const firstKey = searchCache.keys().next().value
          searchCache.delete(firstKey)
        }

        setSearchResults(results)
        setNoResults(results.length === 0)
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
        setNoResults(true)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(searchTimeout)
  }, [selectedBrands, selectedCategories, filters.size, priceRange, hasActiveFilters, getLocalizedText, getSizeKey, language])

  // Clear cache when filters change
  useEffect(() => {
    searchCache.clear()
  }, [language]) // Clear cache when language changes

  // Perform search when component mounts or query/filters change
  useEffect(() => {
    performSearch(initialQuery)
  }, [initialQuery, performSearch])

  // Add effect to handle body scroll
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showFilters])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && filterSidebarRef.current && !filterSidebarRef.current.contains(event.target)) {
        setShowFilters(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFilters])

  // Memoize handlers
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }, [searchQuery, navigate])

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev)
  }, [])

  const handleBrandChange = useCallback((brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
  }, [])

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])
  }, [])

  const handleSizeChange = useCallback((displaySize) => {
    toggleFilter("size", displaySize)
  }, [toggleFilter])

  const handlePriceMinChange = useCallback((e) => {
    setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))
  }, [])

  const handlePriceMaxChange = useCallback((e) => {
    setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 2000000 }))
  }, [])

  const clearAllFilters = useCallback(() => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange({ min: 0, max: 2000000 })
  }, [])

  return (
    <div className="search-page">
      <div className="search-header">
        <Container>
          <h1>{t.pageTitle}</h1>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup className="search-input-group">
              <Form.Control
                type="text"
                placeholder={t.inputPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <Button variant="primary" type="submit">
                <FaSearch /> {t.searchBtn}
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </div>

      <Container className="search-results-container">
        <Row>
          {/* Filters Column */}
          <Col lg={3} className={`filters-column ${showFilters ? "show-mobile" : ""}`} ref={filterSidebarRef}>
            <div className="filters-header">
              <h3>{t.filters}</h3>
              {hasActiveFilters && (
                <Button variant="link" className="clear-all-btn" onClick={clearAllFilters}>
                  {t.clearAll}
                </Button>
              )}
              <Button variant="link" className="close-filters-btn d-lg-none" onClick={toggleFilters}>
                <FaTimes />
              </Button>
            </div>

            {/* Brand Filter */}
            <div className="filter-section">
              <h4>{t.brand}</h4>
              {brands.map((brand) => (
                <Form.Check
                  key={brand}
                  type="checkbox"
                  id={`brand-${brand}`}
                  label={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="filter-checkbox"
                />
              ))}
            </div>

            {/* Category Filter */}
            <div className="filter-section">
              <h4>{t.category}</h4>
              {categories.map((category) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  id={`category-${category}`}
                  label={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="filter-checkbox"
                />
              ))}
            </div>

            {/* Size Filter - Using context function */}
            <div className="filter-section">
              <h4>{t.size}</h4>
              {sizes.map(
                (size) =>
                  (
                    <Form.Check
                  key={size}
                  type="checkbox"
                  id={`size-${size}`}
                  label={size}
                  checked={isSizeSelected(size)} // Using context function to check if size is selected
                  onChange={() => handleSizeChange(size)}
                  className="filter-checkbox"
                />
                  ),
              )}
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <h4>{t.priceRange}</h4>
              <div className="price-inputs">
                <Form.Group>
                  <Form.Label>{t.min}</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={t.min}
                    value={priceRange.min}
                    onChange={handlePriceMinChange}
                  />
                </Form.Group>
                <span className="price-separator">-</span>
                <Form.Group>
                  <Form.Label>{t.max}</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={t.max}
                    value={priceRange.max}
                    onChange={handlePriceMaxChange}
                  />
                </Form.Group>
              </div>
            </div>
          </Col>

          {/* Results Column */}
          <Col lg={9}>
            <div className="results-header">
              <div className="results-info">
                {loading ? (
                  <span>{t.searching}</span>
                ) : searchResults.length > 0 ? (
                  <span>
                    {t.foundProducts
                      .replace("{count}", searchResults.length)
                      .replace("{productLabel}", searchResults.length === 1 ? t.product : t.products)}
                  </span>
                ) : null}
              </div>

              <Button variant="outline-secondary" className="filter-toggle-btn d-lg-none" onClick={toggleFilters}>
                <Sliders /> {t.filters}
              </Button>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="active-filters">
                <span className="active-filters-label">{t.activeFilters}:</span>
                {selectedBrands.map((brand) => (
                  <Badge key={`badge-brand-${brand}`} className="filter-badge">
                    {brand}
                    <span className="badge-remove" onClick={() => handleBrandChange(brand)}>
                      ×
                    </span>
                  </Badge>
                ))}
                {selectedCategories.map((category) => (
                  <Badge key={`badge-category-${category}`} className="filter-badge">
                    {category}
                    <span className="badge-remove" onClick={() => handleCategoryChange(category)}>
                      ×
                    </span>
                  </Badge>
                ))}
                {getSelectedSizesForDisplay().map((size, index) => (
                  <Badge key={`badge-size-${size}-${index}`} className="filter-badge">
                    {size}
                    <span className="badge-remove" onClick={() => handleSizeChange(size)}>
                      ×
                    </span>
                  </Badge>
                ))}
                {(priceRange.min > 0 || priceRange.max < 2000000) && (
                  <Badge className="filter-badge">
                    {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                    <span className="badge-remove" onClick={() => setPriceRange({ min: 0, max: 2000000 })}>
                      ×
                    </span>
                  </Badge>
                )}
              </div>
            )}

            {loading ? (
              <div className="search-loading">
                <div className="spinner"></div>
                <p>{t.searching}</p>
              </div>
            ) : (
              <>
                {initialQuery && (
                  <div className="search-summary">
                    {noResults ? (
                      <h2>
                        {t.noResultsTitle} "{initialQuery}"
                      </h2>
                    ) : (
                      <h2>
                        {t.searchResultsFor} "{initialQuery}" ({searchResults.length}{" "}
                        {searchResults.length === 1 ? t.product : t.products})
                      </h2>
                    )}
                  </div>
                )}

                {noResults ? (
                  <Alert variant="info" className="no-results-alert">
                    <Alert.Heading>{t.noResultsTitle}</Alert.Heading>
                    <p>{t.noResultsMessage}</p>
                    <hr />
                    <p className="mb-0">
                      <Button variant="outline-primary" href="/smart-tvs">
                        {t.browseAll}
                      </Button>
                    </p>
                  </Alert>
                ) : (
                  <Row className="search-results-grid">
                    {searchResults.map((product) => (
                      <Col key={product.id} lg={4} md={6} sm={6} xs={12} className="search-result-col">
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                )}

                {!initialQuery && !hasActiveFilters && (
                  <div className="search-suggestions">
                    <h3>{t.popularSearches}</h3>
                    <div className="suggestion-tags">
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("OLED")
                          navigate("/search?q=OLED")
                        }}
                      >
                        {t.oled}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("Samsung")
                          navigate("/search?q=Samsung")
                        }}
                      >
                        {t.samsung}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("4K")
                          navigate("/search?q=4K")
                        }}
                      >
                        {t.resolution4k}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("65 inches")
                          navigate("/search?q=65 inches")
                        }}
                      >
                        {t.sixtyFiveInches}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Search
