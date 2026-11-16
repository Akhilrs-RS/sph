import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Sparkles, Filter } from 'lucide-react';

export default function StoreCatalogView() {
  const {
    storefrontProducts,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    setSearchQuery
  } = useApp();

  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [maxPrice, setMaxPrice] = useState(150);

  // Extract unique categories
  const categories = ['All', ...new Set(storefrontProducts.map(p => p.category))];

  // Filtering & Sorting logic
  const filteredProducts = storefrontProducts
    .filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tagline && p.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPrice = p.price <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header & Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Curated Dropshipping Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Showing {filteredProducts.length} high-margin trending products with direct supplier tracking
          </p>
        </div>

        {/* Sort and Filters Control */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured / Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {categories.map((cat, idx) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Search Notification */}
      {searchQuery && (
        <div className="mb-4 text-xs text-slate-600 flex items-center justify-between bg-blue-50/70 p-3 rounded-xl border border-blue-100">
          <span>Filtering by search term: <strong className="text-blue-700">"{searchQuery}"</strong></span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-blue-600 hover:underline font-bold"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No products match your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switching categories.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

