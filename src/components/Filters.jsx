import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    onFilter({ brand, fuel, priceRange: price });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <select onChange={(e) => setBrand(e.target.value)} className="p-2 border">
        <option value="">Brand</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
      </select>
      <select onChange={(e) => setFuel(e.target.value)} className="p-2 border">
        <option value="">Fuel</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
      </select>
      <select onChange={(e) => setPrice(e.target.value)} className="p-2 border">
        <option value="">Price</option>
        <option value="1000000">Up to ₹10L</option>
        <option value="3000000">Up to ₹30L</option>
      </select>
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
        Apply
      </button>
    </div>
  );
};

export default Filters;
