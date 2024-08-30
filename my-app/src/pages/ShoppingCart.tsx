import React from 'react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/types';

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();  

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item: CartItem) => (  
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;  