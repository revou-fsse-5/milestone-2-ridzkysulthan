import React from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-md">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">${price.toFixed(2)}</p>
      <button onClick={onAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;