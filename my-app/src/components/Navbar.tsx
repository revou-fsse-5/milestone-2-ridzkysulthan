import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import CartPopup from '../components/CartPopup';
import { CartItem } from '../types/types';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
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
        <span className="mx-2 text-gray-400">|</span>
        {isAuthenticated ? (
          <div className="relative flex items-center">
            <button onClick={toggleProfileMenu} className="flex items-center mr-4">
              <img
                src={user.avatar || 'https://via.placeholder.com/50'}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{user.username || 'User'}</span>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-md p-2">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
