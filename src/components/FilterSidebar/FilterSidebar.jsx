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
  } = useTVContext()

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

  return (
    <>
      <div className={`filter-sidebar ${!isDesktop && showFilters ? "show" : ""} ${isDesktop ? "desktop" : "mobile"}`}>
        <div className="filter-header">
          <h5>Filters</h5>
          {!isDesktop && (
            <Button variant="link" className="close-filters" onClick={toggleFilters}>
              <XCircle size={24} />
            </Button>
          )}
        </div>

        <div className="filter-actions">
          <Button variant="outline-secondary" size="sm" onClick={clearFilters} className="clear-btn">
            Clear All
          </Button>
        </div>

        <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Brand</Accordion.Header>
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
            <Accordion.Header>Category</Accordion.Header>
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
            <Accordion.Header>Screen Size</Accordion.Header>
            <Accordion.Body>
              <Form>
                {getSizes().map((size) => (
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
            <Accordion.Header>Price Range</Accordion.Header>
            <Accordion.Body>
              <div className="price-range-inputs">
                <Form.Group>
                  <Form.Label>Min Price</Form.Label>
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
                  <Form.Label>Max Price</Form.Label>
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
                Apply
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      {!isDesktop && showFilters && <div className="filter-backdrop" onClick={toggleFilters}></div>}

      {!isDesktop && (
        <Button variant="primary" className="filter-toggle-btn d-md-none" onClick={toggleFilters}>
          <Sliders /> Filters
        </Button>
      )}
    </>
  )
}

export default FilterSidebar





