import { useState } from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car, isInWishlist, onToggleWishlist, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="w-full h-48 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(car);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-300 ${isInWishlist ? 'text-red-500 bg-white' : 'text-gray-500 bg-white hover:text-red-500'}`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill={isInWishlist ? "currentColor" : "none"} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{car.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-300">Brand: {car.brand}</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">${car.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{car.fuelType}</span>
          <span>{car.seats} seats</span>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => onViewDetails(car)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            View Details
          </button>
          <Link 
            to={`/wishlist`}
            className={`px-4 py-2 rounded transition ${isInWishlist ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            {isInWishlist ? 'In Wishlist' : 'Wishlist'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;