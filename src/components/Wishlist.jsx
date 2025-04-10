const Wishlist = ({ items, removeFromWishlist }) => (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Wishlist ❤️</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {items.map((car) => (
          <div key={car.id} className="bg-white p-3 rounded shadow">
            <p>{car.name} ({car.brand})</p>
            <button
              onClick={() => removeFromWishlist(car.id)}
              className="text-sm mt-1 bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  export default Wishlist;
  