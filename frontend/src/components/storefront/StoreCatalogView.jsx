import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Filter, X } from 'lucide-react';

export default function StoreCatalogView() {
  const {
    storefrontProducts,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    setSearchQuery
  } = useApp();

  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'

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
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Title & Sorting Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Curated Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {filteredProducts.length} certified direct-from-factory essentials
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/80 text-xs transition">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
        {categories.map((cat, idx) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap transition ${
                isSelected
                  ? 'bg-slate-950 text-white shadow-2xs font-bold'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Search Term Pill */}
      {searchQuery && (
        <div className="my-3 inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs text-slate-700">
          <span>Results for <strong>"{searchQuery}"</strong></span>
          <button
            onClick={() => setSearchQuery('')}
            className="hover:text-slate-950 text-slate-400 p-0.5"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/70 p-8 max-w-md mx-auto">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No items found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search keywords or switching categories.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
