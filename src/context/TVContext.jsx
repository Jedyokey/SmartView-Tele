import { createContext, useState, useContext, useEffect } from "react"
import smartTVs from "../TV_Data/data"
import en from "../locales/en/translation.json"
import fr from "../locales/fr/translation.json"
import i18n from "i18next"

// Create context
const TVContext = createContext()

// Custom hook to use the TV context
export const useTVContext = () => useContext(TVContext)

export const TVProvider = ({ children }) => {
  // State for products
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  // State for filters - Updated to store neutral values
  const [filters, setFilters] = useState({
    brand: [],
    category: [],
    size: [], // Now stores neutral size keys instead of localized values
    priceRange: { min: 0, max: 1500000 },
  })

  // State for sorting
  const [sortOption, setSortOption] = useState("featured")

  // State for loading
  const [loading, setLoading] = useState(true)

  // Language states
  const [language, setLanguage] = useState(() => {
    const storedLang = localStorage.getItem("appLanguage") || "en"
    // Initialize i18n with stored language
    i18n.changeLanguage(storedLang)
    return storedLang
  })
  const [languageLoading, setLanguageLoading] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState(null)

  // Size mapping for language-neutral storage
  const [sizeMapping, setSizeMapping] = useState(new Map())

  // Sync language with i18n
  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language)
    }
  }, [language])

  const translations = {
    en,
    fr,
  }

  // Helper function to get localized text
  const getLocalizedText = (product, field, fallback = "") => {
    if (!product) return fallback

    const langField = `${field}_${language}`
    const enField = `${field}_en`
    const frField = `${field}_fr`

    return product[langField] || product[enField] || product[frField] || product[field] || fallback
  }

  // Create size mapping when products are loaded
  const createSizeMapping = () => {
    const mapping = new Map()

    products.forEach((product) => {
      const enSize = product.size_en || product.size || ""
      const frSize = product.size_fr || ""

      if (enSize) {
        // Use English size as the neutral key
        const neutralKey = enSize

        if (!mapping.has(neutralKey)) {
          mapping.set(neutralKey, {
            en: enSize,
            fr: frSize || enSize, // Fallback to English if French not available
            neutral: neutralKey,
          })
        }
      }
    })

    setSizeMapping(mapping)
  }

  // Get neutral size key from localized display value
  const getSizeKey = (localizedSize) => {
    for (const [key, values] of sizeMapping.entries()) {
      if (values[language] === localizedSize) {
        return key
      }
    }
    return localizedSize // Fallback to original value
  }

  // Get localized size from neutral key
  const getLocalizedSizeFromKey = (neutralKey) => {
    const sizeData = sizeMapping.get(neutralKey)
    return sizeData ? sizeData[language] : neutralKey
  }

  // Enhanced language switching with filter conversion
  const switchLanguageWithLoading = async (newLanguage) => {
    if (newLanguage === language || languageLoading) return

    setLanguageLoading(true)
    setTargetLanguage(newLanguage)

    // Simulate content fetching delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update language in both context and i18n
    setLanguage(newLanguage)
    await i18n.changeLanguage(newLanguage)
    localStorage.setItem("appLanguage", newLanguage)

    // Filters are already stored as neutral keys, so they'll work automatically
    // The applyFilters function will use the new language for comparison

    await new Promise((resolve) => setTimeout(resolve, 300))

    setLanguageLoading(false)
    setTargetLanguage(null)
  }

  // Initialize products
  useEffect(() => {
    setTimeout(() => {
      setProducts(smartTVs)
      setFilteredProducts(smartTVs)
      setLoading(false)
    }, 500)
  }, [])

  // Create size mapping when products change
  useEffect(() => {
    if (products.length > 0) {
      createSizeMapping()
    }
  }, [products])

  const reloadProducts = () => {
    setLoading(true)
    setTimeout(() => {
      setProducts(smartTVs)
      setFilteredProducts(smartTVs)
      setLoading(false)
    }, 500)
  }

  // Get unique values for filter options
  const getBrands = () => [...new Set(products.map((product) => product.brand))]
  const getCategories = () => [...new Set(products.map((product) => product.category))]

  // Updated getSizes to return localized display values
  const getSizes = () => {
    const sizes = new Set()
    products.forEach((product) => {
      const size = getLocalizedText(product, "size", "")
      if (size) {
        sizes.add(size)
      }
    })
    return Array.from(sizes).sort()
  }

  // Get available size keys (for internal use)
  const getSizeKeys = () => {
    return Array.from(sizeMapping.keys()).sort()
  }

  // Get price range
  const getPriceRange = () => {
    if (products.length === 0) return { min: 0, max: 0 }
    const prices = products.map((product) => product.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }

  // Apply filters - Updated to handle neutral size keys
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

    // Filter by size - Updated to use neutral keys
    if (filters.size.length > 0) {
      result = result.filter((product) => {
        const productSize = getLocalizedText(product, "size", "")
        const productSizeKey = getSizeKey(productSize)
        return filters.size.includes(productSizeKey)
      })
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
        result.sort((a, b) => b.id - a.id)
        break
      case "featured":
      default:
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
  }, [filters, sortOption, products, language])

  // Update a specific filter
  const updateFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Toggle a filter value - Updated for size handling
  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      let processedValue = value

      // Convert size display value to neutral key
      if (filterType === "size") {
        processedValue = getSizeKey(value)
      }

      const currentValues = [...prev[filterType]]
      const index = currentValues.indexOf(processedValue)

      if (index === -1) {
        currentValues.push(processedValue)
      } else {
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

  // Check if a size is selected (for UI display)
  const isSizeSelected = (displaySize) => {
    const sizeKey = getSizeKey(displaySize)
    return filters.size.includes(sizeKey)
  }

  // Get selected sizes for display (convert neutral keys back to localized values)
  const getSelectedSizesForDisplay = () => {
    return filters.size.map((sizeKey) => getLocalizedSizeFromKey(sizeKey))
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
    language,
    languageLoading,
    targetLanguage,
    setSortOption,
    updateFilter,
    toggleFilter,
    clearFilters,
    getBrands,
    getCategories,
    getSizes,
    getSizeKeys,
    getPriceRange,
    formatPrice,
    setLanguage,
    switchLanguageWithLoading,
    reloadProducts,
    translations: translations[language],
    getLocalizedText,
    getSizeKey,
    getLocalizedSizeFromKey,
    isSizeSelected,
    getSelectedSizesForDisplay,
  }

  return <TVContext.Provider value={value}>{children}</TVContext.Provider>
}

export default TVContext
