import { useState, useEffect } from "react"
import { Container, Row, Col, Form, InputGroup, Button, Alert, Badge } from "react-bootstrap"
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import ProductCard from "../../components/ProductCard/ProductCard"
import smartTVs from "../../TV_Data/data"
import "./Search.css"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const initialQuery = queryParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [noResults, setNoResults] = useState(false)

  // Filters
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 })

  // Get unique values for filters
  const brands = [...new Set(smartTVs?.map((tv) => tv.brand) || [])]
  const categories = [...new Set(smartTVs?.map((tv) => tv.category) || [])]
  const sizes = [...new Set(smartTVs?.map((tv) => tv.size) || [])]

  // Format price for display
  const formatPrice = (price) => {
    return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " CFA" || "0 CFA"
  }

  // Perform search when component mounts or query/filters change
  useEffect(() => {
    performSearch(initialQuery)
  }, [initialQuery, selectedBrands, selectedCategories, selectedSizes, priceRange])

  const performSearch = (query) => {
    setLoading(true)
    setNoResults(false)

    setTimeout(() => {
      try {
        if (!Array.isArray(smartTVs)) {
          throw new Error("Invalid products data")
        }

        let results = []
        
        // If no query and no filters, show all products
        if (!query.trim() && !hasActiveFilters()) {
          results = [...smartTVs]
        } else {
          const lowerCaseQuery = query.toLowerCase().trim()

          results = smartTVs.filter((product) => {
            // Apply filters first
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
            const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size)
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

            // If no query, just apply filters
            if (!lowerCaseQuery) {
              return matchesBrand && matchesCategory && matchesSize && matchesPrice
            }

            // Check if query matches any field
            const nameMatch = product.name?.toLowerCase().includes(lowerCaseQuery)
            const brandMatch = product.brand?.toLowerCase().includes(lowerCaseQuery)
            const categoryMatch = product.category?.toLowerCase().includes(lowerCaseQuery)
            const descriptionMatch = product.description?.toLowerCase().includes(lowerCaseQuery)
            const tagMatch = product.tags?.some((tag) => tag?.toLowerCase().includes(lowerCaseQuery))
            const featureMatch = product.features?.some((feature) => feature?.toLowerCase().includes(lowerCaseQuery))
            const resolutionMatch = product.resolution?.toLowerCase().includes(lowerCaseQuery)
            const sizeMatch = product.size?.toLowerCase().includes(lowerCaseQuery)

            // Check price-related queries
            let priceMatch = false
            if (lowerCaseQuery.includes("under") || lowerCaseQuery.includes("less than")) {
              const priceThreshold = parseInt(lowerCaseQuery.replace(/\D/g, ""))
              if (!isNaN(priceThreshold)) {
                priceMatch = product.price < priceThreshold
              }
            }

            if (lowerCaseQuery.includes("-")) {
              const [minStr, maxStr] = lowerCaseQuery.split("-")
              const min = parseInt(minStr.replace(/\D/g, ""))
              const max = parseInt(maxStr.replace(/\D/g, ""))
              if (!isNaN(min) && !isNaN(max)) {
                priceMatch = product.price >= min && product.price <= max
              }
            }

            return (
              (nameMatch || brandMatch || categoryMatch || descriptionMatch || 
               tagMatch || featureMatch || resolutionMatch || sizeMatch || priceMatch) &&
              matchesBrand && matchesCategory && matchesSize && matchesPrice
            )
          })
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
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const handlePriceMinChange = (e) => {
    setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))
  }

  const handlePriceMaxChange = (e) => {
    setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 2000000 }))
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedSizes([])
    setPriceRange({ min: 0, max: 2000000 })
  }

  const hasActiveFilters = () => {
    return (
      selectedBrands.length > 0 ||
      selectedCategories.length > 0 ||
      selectedSizes.length > 0 ||
      priceRange.min > 0 ||
      priceRange.max < 2000000
    )
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <Container>
          <h1>Search Smart TVs</h1>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup className="search-input-group">
              <Form.Control
                type="text"
                placeholder="Search for Smart TVs, brands, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <Button variant="primary" type="submit">
                <FaSearch /> Search
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </div>

      <Container className="search-results-container">
        <Row>
          {/* Filters Column */}
          <Col lg={3} className={`filters-column ${showFilters ? "show-mobile" : ""}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              {hasActiveFilters() && (
                <Button variant="link" className="clear-all-btn" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
              <Button variant="link" className="close-filters-btn d-lg-none" onClick={toggleFilters}>
                <FaTimes />
              </Button>
            </div>

            {/* Brand Filter */}
            <div className="filter-section">
              <h4>Brand</h4>
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
              <h4>Category</h4>
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

            {/* Size Filter */}
            <div className="filter-section">
              <h4>Size</h4>
              {sizes.map((size) => (
                <Form.Check
                  key={size}
                  type="checkbox"
                  id={`size-${size}`}
                  label={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="filter-checkbox"
                />
              ))}
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <Form.Group>
                  <Form.Label>Min</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={handlePriceMinChange}
                  />
                </Form.Group>
                <span className="price-separator">-</span>
                <Form.Group>
                  <Form.Label>Max</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max"
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
                  <span>Searching...</span>
                ) : searchResults.length > 0 ? (
                  <span>Found {searchResults.length} products</span>
                ) : null}
              </div>

              <Button variant="outline-secondary" className="filter-toggle-btn d-lg-none" onClick={toggleFilters}>
                <FaFilter /> Filters
              </Button>
            </div>

            {/* Active Filters */}
            {hasActiveFilters() && (
              <div className="active-filters">
                <span className="active-filters-label">Active Filters:</span>
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
                {selectedSizes.map((size) => (
                  <Badge key={`badge-size-${size}`} className="filter-badge">
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
                <p>Searching products...</p>
              </div>
            ) : (
              <>
                {initialQuery && (
                  <div className="search-summary">
                    {noResults ? (
                      <h2>No results found for "{initialQuery}"</h2>
                    ) : (
                      <h2>
                        Search results for "{initialQuery}" ({searchResults.length} products)
                      </h2>
                    )}
                  </div>
                )}

                {noResults ? (
                  <Alert variant="info" className="no-results-alert">
                    <Alert.Heading>No products found</Alert.Heading>
                    <p>
                      We couldn't find any products matching your search criteria. Please try different keywords or
                      adjust your filters.
                    </p>
                    <hr />
                    <p className="mb-0">
                      <Button variant="outline-primary" href="/smart-tvs">
                        Browse All Products
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

                {!initialQuery && !hasActiveFilters() && (
                  <div className="search-suggestions">
                    <h3>Popular Searches</h3>
                    <div className="suggestion-tags">
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("OLED")
                          navigate("/search?q=OLED")
                        }}
                      >
                        OLED TVs
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("Samsung")
                          navigate("/search?q=Samsung")
                        }}
                      >
                        Samsung
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("4K")
                          navigate("/search?q=4K")
                        }}
                      >
                        4K Resolution
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setSearchQuery("65 inches")
                          navigate("/search?q=65 inches")
                        }}
                      >
                        65" TVs
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
