import { createContext, useState, useContext, useEffect } from "react"
import smartTVs from "../TV_Data/data"

// Create context
const TVContext = createContext()

// Custom hook to use the TV context
export const useTVContext = () => useContext(TVContext)

export const TVProvider = ({ children }) => {
  // State for products
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  // State for filters
  const [filters, setFilters] = useState({
    brand: [],
    category: [],
    size: [],
    priceRange: { min: 0, max: 1500000 },
  })

  // State for sorting
  const [sortOption, setSortOption] = useState("featured")

  // State for loading
  const [loading, setLoading] = useState(true)

  // Initialize products
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(smartTVs)
      setFilteredProducts(smartTVs)
      setLoading(false)
    }, 500)
  }, [])

  // Get unique values for filter options
  const getBrands = () => [...new Set(products.map((product) => product.brand))]
  const getCategories = () => [...new Set(products.map((product) => product.category))]
  const getSizes = () => [...new Set(products.map((product) => product.size))]

  // Get price range
  const getPriceRange = () => {
    if (products.length === 0) return { min: 0, max: 0 }
    const prices = products.map((product) => product.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }

  // Apply filters
  const applyFilters = () => {
    let result = [...products]

    // Filter by brand
    if (filters.brand.length > 0) {
      result = result.filter((product) => filters.brand.includes(product.brand))
    }

    // Filter by category
    if (filters.category.length > 0) {
      result = result.filter((product) => filters.category.includes(product.category))
    }

    // Filter by size
    if (filters.size.length > 0) {
      result = result.filter((product) => filters.size.includes(product.size))
    }

    // Filter by price range
    result = result.filter(
      (product) => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max,
    )

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // For demo purposes, we'll use ID as a proxy for "newest"
        result.sort((a, b) => b.id - a.id)
        break
      case "featured":
      default:
        // Featured items first, then sort by rating
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return b.rating - a.rating
        })
    }

    setFilteredProducts(result)
  }

  // Update filters when they change
  useEffect(() => {
    applyFilters()
  }, [filters, sortOption, products])

  // Update a specific filter
  const updateFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Toggle a filter value (for checkboxes)
  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = [...prev[filterType]]
      const index = currentValues.indexOf(value)

      if (index === -1) {
        // Add the value
        currentValues.push(value)
      } else {
        // Remove the value
        currentValues.splice(index, 1)
      }

      return {
        ...prev,
        [filterType]: currentValues,
      }
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      brand: [],
      category: [],
      size: [],
      priceRange: getPriceRange(),
    })
  }

  // Format price for display (CFA)
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " CFA"
  }

  // Context value
  const value = {
    products,
    filteredProducts,
    loading,
    filters,
    sortOption,
    setSortOption,
    updateFilter,
    toggleFilter,
    clearFilters,
    getBrands,
    getCategories,
    getSizes,
    getPriceRange,
    formatPrice,
  }

  return <TVContext.Provider value={value}>{children}</TVContext.Provider>
}

export default TVContext














