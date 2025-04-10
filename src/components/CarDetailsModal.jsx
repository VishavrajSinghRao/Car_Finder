// components/CarDetailsModal.jsx
const CarDetailsModal = ({ car, isInWishlist, onToggleWishlist, onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
              </div>
            )}
            <img 
              src={car.imageUrl.replace('600x400', '800x500')} 
              alt={car.name}
              className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-800 hover:text-red-500 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* ... rest of your modal content */}
        </div>
      </div>
    );
  };
  
  export default CarDetailsModal;