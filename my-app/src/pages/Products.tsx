import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import { useCart } from '../context/CartContext';
import { Product, CartItem } from '../types/types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(offset, 40, title, priceMin, priceMax, selectedCategory);
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
  }, [title, priceMin, priceMax, selectedCategory, offset]);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    setOffset(0);
    setProducts([]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setOffset(0);
    setProducts([]);
  };

  const handlePriceMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(event.target.value ? Number(event.target.value) : undefined);
    setOffset(0);
    setProducts([]);
  };

  const handlePriceMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(event.target.value ? Number(event.target.value) : undefined);
    setOffset(0);
    setProducts([]);
  };

  const loadMoreProducts = () => {
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
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="title" className="block mb-2">Product Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="price-min" className="block mb-2">Price Min:</label>
            <input
              id="price-min"
              type="number"
              value={priceMin || ''}
              onChange={handlePriceMinChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="price-max" className="block mb-2">Price Max:</label>
            <input
              id="price-max"
              type="number"
              value={priceMax || ''}
              onChange={handlePriceMaxChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
        </div>
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
            onClick={loadMoreProducts}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;