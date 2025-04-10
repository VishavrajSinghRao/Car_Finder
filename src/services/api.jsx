// Mock API service
export const fetchCars = async (params = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Tesla', 'Hyundai', 'Kia', 'Nissan'];
    const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
    
    const mockCars = Array.from({ length: 50 }, (_, i) => {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
      const price = Math.floor(Math.random() * 90000) + 10000;
      const seats = Math.floor(Math.random() * 6) + 2;
      
      return {
        id: i + 1,
        name: `${brand} Model ${String.fromCharCode(65 + (i % 26))}`,
        brand,
        price,
        fuelType,
        seats,
        imageUrl: `https://source.unsplash.com/random/300x200/?car,${brand.replace(/\s+/g, '')},${i}`,
        description: `This is a ${brand} car with ${fuelType.toLowerCase()} engine and ${seats} seats.`
      };
    });
  
    // Apply filters
    let filteredCars = [...mockCars];
    
    if (params.brand) {
      filteredCars = filteredCars.filter(car => car.brand === params.brand);
    }
    
    if (params.fuelType) {
      filteredCars = filteredCars.filter(car => car.fuelType === params.fuelType);
    }
    
    if (params.minPrice) {
      filteredCars = filteredCars.filter(car => car.price >= params.minPrice);
    }
    
    if (params.maxPrice) {
      filteredCars = filteredCars.filter(car => car.price <= params.maxPrice);
    }
    
    if (params.seats) {
      filteredCars = filteredCars.filter(car => car.seats >= params.seats);
    }
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredCars = filteredCars.filter(car => 
        car.name.toLowerCase().includes(searchTerm) || 
        car.brand.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (params.sort) {
      if (params.sort === 'price-asc') {
        filteredCars.sort((a, b) => a.price - b.price);
      } else if (params.sort === 'price-desc') {
        filteredCars.sort((a, b) => b.price - a.price);
      }
    }
    
    // Pagination
    const page = params.page || 1;
    const perPage = 10;
    const totalPages = Math.ceil(filteredCars.length / perPage);
    const paginatedCars = filteredCars.slice((page - 1) * perPage, page * perPage);
    
    return {
      cars: paginatedCars,
      total: filteredCars.length,
      totalPages
    };
  };