import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { Link } from 'react-router-dom';

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1>Product Listing</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListingPage;