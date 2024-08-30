import React from 'react';
import { CartItem } from '../types/types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartPopupProps {
  cart: CartItem[];
}

const CartPopup: React.FC<CartPopupProps> = ({ cart }) => {
  const { updateCartItemQuantity, removeFromCart } = useCart();
  const navigate = useNavigate(); 

  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartItemQuantity(id, quantity);
  };

  const handleCheckout = () => {
    navigate('/checkout'); 
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
      </div>
      {cart.length === 0 ? (
        <div className="p-4 text-center">Your cart is empty.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cart.map(item => (
            <li key={item.id} className="p-4 flex items-center">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="p-4 border-t">
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPopup;