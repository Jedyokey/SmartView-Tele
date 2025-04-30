import { useState, useEffect } from "react"
import { Container, Row, Col, Breadcrumb, Alert, Spinner, Pagination, Form } from "react-bootstrap"
import ProductCard from "../../components/ProductCard/ProductCard"
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar"
import SortDropdown from "../../components/SortDropdown/SortDropdown"
import { useTVContext } from "../../context/TVContext"
import "./CollectionPage.css"

const CollectionPage = () => {
  const { filteredProducts, loading } = useTVContext()
  const [showFilters, setShowFilters] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Update pagination when filtered products change
  useEffect(() => {
    if (!loading) {
      // Calculate total pages
      const total = Math.ceil(filteredProducts.length / itemsPerPage)
      setTotalPages(total)

      // Reset to page 1 if current page is out of bounds
      if (currentPage > total) {
        setCurrentPage(1)
      }

      // Get current products
      const indexOfLastItem = currentPage * itemsPerPage
      const indexOfFirstItem = indexOfLastItem - itemsPerPage
      setPaginatedProducts(filteredProducts.slice(indexOfFirstItem, indexOfLastItem))
    }
  }, [filteredProducts, currentPage, itemsPerPage, loading])

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top of products
    window.scrollTo({
      top: document.querySelector(".collection-toolbar").offsetTop - 100,
      behavior: "smooth",
    })
  }

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1) // Reset to first page
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []

    // Always show first page
    items.push(
      <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageChange(1)}>
        1
      </Pagination.Item>,
    )

    // If there are many pages, add ellipsis
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis1" disabled />)
    }

    // Show pages around current page
    for (let number = Math.max(2, currentPage - 1); number <= Math.min(totalPages - 1, currentPage + 1); number++) {
      if (number === 1 || number === totalPages) continue // Skip first and last page as they're always shown

      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>,
      )
    }

    // If there are many pages, add ellipsis
    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis2" disabled />)
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>,
      )
    }

    return items
  }

  return (
    <div className="collection-page">
      <div className="collection-header">
        <Container>
          <h1>Smart TVs Collection</h1>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Smart TVs</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      <Container className="collection-container">
        <Row>
          {/* Desktop filter sidebar */}
          <Col lg={3} md={4} className="filter-column d-none d-md-block">
            <FilterSidebar showFilters={false} toggleFilters={() => {}} isDesktop={true} />
          </Col>

          <Col lg={9} md={8} xs={12}>
            <div className="collection-toolbar">
              <div className="results-count">
                {loading ? (
                  <span>Loading products...</span>
                ) : (
                  <span>
                    Showing {paginatedProducts.length} of {filteredProducts.length} products
                  </span>
                )}
              </div>

              <div className="toolbar-actions">
                <SortDropdown />
              </div>
            </div>

            {loading ? (
              <div className="loading-container">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <Alert variant="info">
                No products match your selected filters. Try adjusting your filters or clearing them.
              </Alert>
            ) : (
              <>
                <Row className="products-grid">
                  {paginatedProducts.map((product) => (
                    <Col key={product.id} className="product-col">
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <div className="pagination-controls">
                      <Pagination>
                        <Pagination.Prev
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        {renderPaginationItems()}
                        <Pagination.Next
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </div>

                    <div className="items-per-page">
                      <Form.Select
                        size="sm"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        aria-label="Items per page"
                      >
                        <option value={9}>9 per page</option>
                        <option value={18}>18 per page</option>
                        <option value={27}>27 per page</option>
                        <option value={36}>36 per page</option>
                      </Form.Select>
                    </div>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {/* Mobile filter sidebar - only rendered for mobile */}
      <div className="d-md-none">
        <FilterSidebar showFilters={showFilters} toggleFilters={toggleFilters} isDesktop={false} />
      </div>
    </div>
  )
}

export default CollectionPage
