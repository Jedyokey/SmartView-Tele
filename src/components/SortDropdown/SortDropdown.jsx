import { Dropdown } from "react-bootstrap"
import { SortDown } from "react-bootstrap-icons"
import "./SortDropdown.css"
import { useTVContext } from "../../context/TVContext"

const SortDropdown = () => {
  const { sortOption, setSortOption } = useTVContext()

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest Arrivals" },
  ]

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortOption)
    return option ? option.label : "Sort By"
  }

  return (
    <Dropdown className="sort-dropdown">
      <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
        <SortDown className="sort-icon" /> {getCurrentSortLabel()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sortOptions.map((option) => (
          <Dropdown.Item
            key={option.value}
            active={sortOption === option.value}
            onClick={() => setSortOption(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SortDropdown
