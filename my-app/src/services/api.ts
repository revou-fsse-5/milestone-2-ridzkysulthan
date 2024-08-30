import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1';

// Authentication APIs
export const login = (credentials: { email: string, password: string }) =>
  axios.post(`${API_URL}/auth/login`, credentials);

export const register = (user: { email: string, password: string }) =>
  axios.post(`${API_URL}/auth/register`, user);

// Product APIs
export const fetchProducts = (
  offset: number = 40,
  limit: number = 20,
  title?: string,
  price_min?: number,
  price_max?: number,
  categoryId?: number
) => {
  // Build query parameters
  let queryParams = `offset=${offset}&limit=${limit}`;
  if (title) queryParams += `&title=${title}`;
  if (price_min !== undefined) queryParams += `&price_min=${price_min}`;
  if (price_max !== undefined) queryParams += `&price_max=${price_max}`;
  if (categoryId !== undefined) queryParams += `&categoryId=${categoryId}`;

  return axios.get(`${API_URL}/products?${queryParams}`);
};

export const fetchProductById = (id: number) =>
  axios.get(`${API_URL}/products/${id}`);

// Fetch All Products without Pagination
export const fetchAllProducts = () =>
  axios.get(`${API_URL}/products`);

// Fetch Categories (if you have categories)
export const fetchCategories = () =>
  axios.get(`${API_URL}/categories`);

// Fetch Products by Category
export const fetchProductsByCategory = (categoryId: number, offset: number = 0, limit: number = 10) =>
  axios.get(`${API_URL}/products?categoryId=${categoryId}&offset=${offset}&limit=${limit}`);