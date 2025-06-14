import { useState } from "react"
import { Form, Button, Accordion } from "react-bootstrap"
import { Sliders, XCircle } from "react-bootstrap-icons"
import "./FilterSidebar.css"
import { useTVContext } from "../../context/TVContext"

const FilterSidebar = ({ showFilters, toggleFilters, isDesktop = false }) => {
  const {
    filters,
    toggleFilter,
    updateFilter,
    clearFilters,
    getBrands,
    getCategories,
    getSizes,
    getPriceRange,
    formatPrice,
    translations,
    language,
  } = useTVContext()

  const t = translations.filterSidebar

  const [priceRange, setPriceRange] = useState(filters.priceRange)

  // Handle price range change
  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number.parseInt(value),
    }))
  }

  // Apply price range filter
  const applyPriceRange = () => {
    updateFilter("priceRange", priceRange)
  }

  // Get localized sizes - temporary fix until context is updated
  const getLocalizedSizes = () => {
    const sizes = getSizes()
    if (sizes.length === 0) {
      // Fallback: extract sizes from products directly
      const products = JSON.parse(localStorage.getItem("products")) || []
      const uniqueSizes = new Set()

      products.forEach((product) => {
        const sizeField = language === "fr" ? "size_fr" : "size_en"
        const size = product[sizeField] || product.size_en || product.size
        if (size) {
          uniqueSizes.add(size)
        }
      })

      return Array.from(uniqueSizes).sort()
    }
    return sizes
  }

  return (
    <>
      <div className={`filter-sidebar ${!isDesktop && showFilters ? "show" : ""} ${isDesktop ? "desktop" : "mobile"}`}>
        <div className="filter-header">
          <h5>{t.filters}</h5>
          {!isDesktop && (
            <Button variant="link" className="close-filters" onClick={toggleFilters}>
              <XCircle size={24} />
            </Button>
          )}
        </div>

        <div className="filter-actions">
          <Button variant="outline-secondary" size="sm" onClick={clearFilters} className="clear-btn">
            {t.clearAll}
          </Button>
        </div>

        <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t.brand}</Accordion.Header>
            <Accordion.Body>
              <Form>
                {getBrands().map((brand) => (
                  <Form.Check
                    key={brand}
                    type="checkbox"
                    id={`brand-${brand}-${isDesktop ? "desktop" : "mobile"}`}
                    label={brand}
                    checked={filters.brand.includes(brand)}
                    onChange={() => toggleFilter("brand", brand)}
                    className="filter-checkbox"
                  />
                ))}
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>{t.category}</Accordion.Header>
            <Accordion.Body>
              <Form>
                {getCategories().map((category) => (
                  <Form.Check
                    key={category}
                    type="checkbox"
                    id={`category-${category}-${isDesktop ? "desktop" : "mobile"}`}
                    label={category}
                    checked={filters.category.includes(category)}
                    onChange={() => toggleFilter("category", category)}
                    className="filter-checkbox"
                  />
                ))}
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>{t.screenSize}</Accordion.Header>
            <Accordion.Body>
              <Form>
                {getLocalizedSizes().map((size) => (
                  <Form.Check
                    key={size}
                    type="checkbox"
                    id={`size-${size}-${isDesktop ? "desktop" : "mobile"}`}
                    label={size}
                    checked={filters.size.includes(size)}
                    onChange={() => toggleFilter("size", size)}
                    className="filter-checkbox"
                  />
                ))}
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>{t.priceRange}</Accordion.Header>
            <Accordion.Body>
              <div className="price-range-inputs">
                <Form.Group>
                  <Form.Label>{t.minPrice}</Form.Label>
                  <Form.Control
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    min={getPriceRange().min}
                    max={getPriceRange().max}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>{t.maxPrice}</Form.Label>
                  <Form.Control
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    min={getPriceRange().min}
                    max={getPriceRange().max}
                  />
                </Form.Group>
              </div>

              <div className="price-labels">
                <span>{formatPrice(priceRange.min)}</span>
                <span>{formatPrice(priceRange.max)}</span>
              </div>

              <Form.Range
                min={getPriceRange().min}
                max={getPriceRange().max}
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Number.parseInt(e.target.value),
                  }))
                }
                className="price-slider"
              />

              <Button variant="primary" size="sm" onClick={applyPriceRange} className="apply-price-btn">
                {t.apply}
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      {!isDesktop && showFilters && <div className="filter-backdrop" onClick={toggleFilters}></div>}

      {!isDesktop && (
        <Button variant="primary" className="filter-toggle-btn d-md-none" onClick={toggleFilters}>
          <Sliders /> {t.filters}
        </Button>
      )}
    </>
  )
}

export default FilterSidebar
