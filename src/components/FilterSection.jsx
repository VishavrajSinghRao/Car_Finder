const FilterSection = ({ filters, onChange, onSortChange }) => {
    const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Tesla', 'Hyundai', 'Kia', 'Nissan'];
    const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
    const seatingOptions = [2, 4, 5, 6, 7];
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      onChange({ [name]: value });
    };
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Filters</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Type</label>
            <select
              name="fuelType"
              value={filters.fuelType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Seats</label>
            <select
              name="seats"
              value={filters.seats}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Any</option>
              {seatingOptions.map(seats => (
                <option key={seats} value={seats}>{seats}+ seats</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          
          <button
            onClick={() => onChange({
              brand: '',
              fuelType: '',
              minPrice: '',
              maxPrice: '',
              seats: '',
              sort: '',
              page: 1
            })}
            className="w-full py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  };
  
  export default FilterSection;