import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import CartPopup from '../components/CartPopup';
import { CartItem } from '../types/types';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogoClick = () => {

    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={handleLogoClick} className="flex items-center">
          <img src={logo} alt="EasyShop Logo" className="h-18 w-20" />
        </button>
      </div>
      <div className="flex items-center relative">
        <button onClick={toggleCartPopup} className="relative mr-4 flex items-center">
          <FaShoppingCart className="mr-1" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cart.length}
            </span>
          )}
          <span>Cart</span>
        </button>
        {isCartOpen && <CartPopup cart={cart as CartItem[]} />}
        <Link to="/products" className="mr-4 flex items-center">
          Products
        </Link>
        {isAuthenticated ? (
          <>
            <button onClick={logout} className="bg-red-500 p-2 rounded flex items-center">
              <FaUser className="mr-1" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 flex items-center">
              <FaUser className="mr-1" />
              Login
            </Link>
            <Link to="/register" className="flex items-center">
              <FaUser className="mr-1" />
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;