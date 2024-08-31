import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import ProductCategoryPage from './pages/ProductCategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCart from './pages/ShoppingCart';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; 
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
            <Route path="/categories/:categoryId" element={<ProtectedRoute element={<ProductCategoryPage />} />} />
            <Route path="/products/:productId" element={<ProtectedRoute element={<ProductDetailPage />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<ShoppingCart />} />} />
            <Route path="/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;