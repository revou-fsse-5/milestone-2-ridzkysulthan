import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { Product, CartItem } from '../types/types';

const ProductCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProductsByCategory(Number(categoryId), offset, 30);
        const data: Product[] = response.data; 

        const uniqueProducts = Array.from(new Map(data.map((product: Product) => [product.id, product])).values());

        setHasMore(data.length > 0);
        setProducts(prevProducts => [...prevProducts, ...uniqueProducts]);
        setError(null);
      } catch (error) {
        console.error('Failed to load products', error);
        setError('Failed to load products. Please try again later.');
      }
    };

    loadProducts();
  }, [categoryId, offset]);

  const handleLoadMore = () => {
    if (hasMore) {
      setOffset(prevOffset => prevOffset + 30);
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      imageUrl: product.images[0],
      quantity: 1
    };
    addToCart(cartItem);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              imageUrl={product.images[0]}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryPage;