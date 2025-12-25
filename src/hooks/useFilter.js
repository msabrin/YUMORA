import { useState, useMemo } from 'react';

export const useFilter = (products) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      // Color filter
      const matchesColor = selectedColor === 'All' || product.color === selectedColor;

      // Price filter
      let matchesPrice = true;
      if (priceRange !== 'All') {
        const price = product.price;
        switch (priceRange) {
          case '0-30':
            matchesPrice = price >= 0 && price <= 30;
            break;
          case '31-50':
            matchesPrice = price >= 31 && price <= 50;
            break;
          case '51-80':
            matchesPrice = price >= 51 && price <= 80;
            break;
          case '80+':
            matchesPrice = price > 80;
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesCategory && matchesColor && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, selectedColor, priceRange]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedColor,
    setSelectedColor,
    priceRange,
    setPriceRange,
    filteredProducts
  };
};
