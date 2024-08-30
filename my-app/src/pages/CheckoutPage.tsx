import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { CartItem } from '../types/types';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateCartItemQuantity(id, quantity);
    }
  };

  const handleCheckout = () => {
    // Here, you can implement actual checkout logic if needed
    setShowSuccess(true);
    clearCart();
    // Redirect to the products page after a short delay
    setTimeout(() => {
      navigate('/products');
    }, 2000); // 2 seconds delay before redirect
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
              <ul>
                {cart.map((item: CartItem) => (
                  <li key={item.id} className="border-b py-2 flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p>Price: ${item.price}</p>
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
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-4 bg-red-500 text-white p-2 rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Total Price: ${calculateTotalPrice()}</h2>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Checkout
            </button>

            {showSuccess && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                <p>Your Order was successful!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;