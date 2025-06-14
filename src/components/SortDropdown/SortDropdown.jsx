import { Dropdown } from "react-bootstrap";
import { SortDown } from "react-bootstrap-icons";
import "./SortDropdown.css";
import { useTVContext } from "../../context/TVContext";

const SortDropdown = () => {
  const { sortOption, setSortOption, translations } = useTVContext();

  const t = translations.sort;

  const sortOptions = [
    { value: "featured", label: t.featured },
    { value: "price-low", label: t.priceLowToHigh },
    { value: "price-high", label: t.priceHighToLow },
    { value: "rating", label: t.rating },
    { value: "newest", label: t.newest }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortOption);
    return option ? option.label : t.sortBy;
  };

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
  );
};

export default SortDropdown;
