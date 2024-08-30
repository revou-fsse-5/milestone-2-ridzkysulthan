import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';

interface CategoryFilterProps {
  selectedCategory: number | undefined;
  onCategoryChange: (categoryId: number | undefined) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState<any[]>([]);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor="category-select" className="block mb-2">Select Category:</label>
      <select
        id="category-select"
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(Number(e.target.value))}
        className="border p-2 rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;