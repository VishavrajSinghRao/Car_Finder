import { useLocalStorage } from '../hooks/useLocalStorage';
import CarCard from '../components/CarCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  
  const removeFromWishlist = (carId) => {
    setWishlist(prev => prev.filter(car => car.id !== carId));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-10 dark:text-white">
          <p className="text-xl">Your wishlist is empty.</p>
          <p>Start adding cars to your wishlist from the home page!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(car => (
            <CarCard 
              key={car.id}
              car={car}
              isInWishlist={true}
              onToggleWishlist={() => removeFromWishlist(car.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;