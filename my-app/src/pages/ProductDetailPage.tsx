import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchProductById } from '../services/api';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); 
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProductById(Number(productId));
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product', error);
        setError('Error fetching product. Please try again later.');
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <img src={product.images[0]} alt={product.title} />
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;