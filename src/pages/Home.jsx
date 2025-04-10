import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchCars } from '../services/api';
import CarCard from '../components/CarCard';
import FilterSection from '../components/FilterSection';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import CarDetailsModal from '../components/CarDetailsModal';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    fuelType: '',
    minPrice: '',
    maxPrice: '',
    seats: '',
    sort: '',
    page: 1
  });
  
  const [totalPages, setTotalPages] = useState(1);

  // Memoize the filters object to prevent unnecessary changes
  const filtersString = useMemo(() => JSON.stringify(filters), [
    filters.search,
    filters.brand,
    filters.fuelType,
    filters.minPrice,
    filters.maxPrice,
    filters.seats,
    filters.sort,
    filters.page
  ]);

  // Memoize handlers to prevent unnecessary recreations
  const handleSearch = useCallback((searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const handleSortChange = useCallback((sortOption) => {
    setFilters(prev => ({ ...prev, sort: sortOption }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const toggleWishlist = useCallback((car) => {
    setWishlist(prev => {
      const isInWishlist = prev.some(item => item.id === car.id);
      return isInWishlist 
        ? prev.filter(item => item.id !== car.id)
        : [...prev, car];
    });
  }, [setWishlist]);

  const openCarDetails = useCallback((car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  }, []);

  const closeCarDetails = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCar(null);
  }, []);

  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const { cars, totalPages } = await fetchCars(filters);
        setCars(cars);
        setTotalPages(totalPages);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getCars();
  }, [filtersString]); // Now using the memoized filters string

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Car Finder</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="md:w-1/4">
          <FilterSection 
            filters={filters}
            onChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
        
        <div className="md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-10 dark:text-white">
              <p className="text-xl">No cars found matching your criteria.</p>
              <button 
                onClick={() => setFilters({
                  search: '',
                  brand: '',
                  fuelType: '',
                  minPrice: '',
                  maxPrice: '',
                  seats: '',
                  sort: '',
                  page: 1
                })}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <CarCard 
                    key={car.id}
                    car={car}
                    isInWishlist={wishlist.some(item => item.id === car.id)}
                    onToggleWishlist={toggleWishlist}
                    onViewDetails={openCarDetails}
                  />
                ))}
              </div>
              
              <Pagination 
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
      
      {isModalOpen && selectedCar && (
        <CarDetailsModal 
          car={selectedCar}
          isInWishlist={wishlist.some(item => item.id === selectedCar.id)}
          onToggleWishlist={toggleWishlist}
          onClose={closeCarDetails}
        />
      )}
    </div>
  );
};

export default Home;