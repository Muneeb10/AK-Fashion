// src/Components/ProductPage.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import { Filter, X } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductPage = () => {
  const { category } = useParams(); // Read category from URL

  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    colors: [],
    sizes: [],
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all products (for sidebar filters) and category-filtered products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch all products to generate sidebar filters
        const resAll = await axios.get(`${API_BASE_URL}/api/products`);
        const allProducts = resAll.data;

        setFilterOptions({
          categories: [...new Set(allProducts.map((p) => p.category?.name))],
          colors: [...new Set(allProducts.flatMap((p) => p.colors))],
          sizes: [...new Set(allProducts.flatMap((p) => p.sizes))],
        });

        // Fetch products for this page (with category filter)
        let url = `${API_BASE_URL}/api/products`;
        if (category) url += `?category=${category}`;
        const res = await axios.get(url);
        const categoryProducts = res.data;

        // Only products added in last 1 year
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const newProducts = categoryProducts.filter(
          (p) => new Date(p.createdAt) >= oneYearAgo
        );

        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Handle checkbox toggle
  const handleCheckbox = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchPrice = product.currentPrice <= priceRange;
    const matchCategory = selectedCategories.length
      ? selectedCategories.includes(product.category?.name)
      : true;
    const matchColor = selectedColors.length
      ? product.colors.some((c) => selectedColors.includes(c))
      : true;
    const matchSize = selectedSizes.length
      ? product.sizes.some((s) => selectedSizes.includes(s))
      : true;
    return matchPrice && matchCategory && matchColor && matchSize;
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 py-6 bg-gray-50 min-h-screen">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="md:hidden flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg mb-4 w-full"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {/* Sidebar */}
      <div
        className={`${
          showMobileFilters
            ? "block fixed inset-0 z-50 bg-white p-4 overflow-y-auto"
            : "hidden"
        } md:block w-full md:w-1/4 p-6 bg-white shadow-md rounded-lg md:sticky md:top-4 h-fit`}
      >
        {/* Close button for mobile */}
        {showMobileFilters && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filter Products</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Price Slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price: Rs. {priceRange}
          </label>
          <input
            type="range"
            min={0}
            max={10000}
            step={50}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Rs.0</span>
            <span>Rs.{priceRange}</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-100">
            Category
          </h3>
          <div className="space-y-2">
            {filterOptions.categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCheckbox(setSelectedCategories, cat)}
                  className="rounded text-black focus:ring-black h-4 w-4"
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-100">
            Color
          </h3>
          <div className="space-y-2">
            {filterOptions.colors.map((color) => (
              <label
                key={color}
                className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleCheckbox(setSelectedColors, color)}
                  className="rounded text-black focus:ring-black h-4 w-4"
                />
                <span className="capitalize">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-100">
            Size
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {filterOptions.sizes.map((size) => (
              <label key={size} className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleCheckbox(setSelectedSizes, size)}
                  className="hidden peer"
                />
                <div className="w-full py-1.5 text-center text-sm rounded-md border border-gray-300 peer-checked:bg-black peer-checked:text-white peer-checked:border-black cursor-pointer hover:border-gray-500">
                  {size}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Apply button for mobile */}
        {showMobileFilters && (
          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full bg-black text-white py-2 rounded-lg mt-4 flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        )}
      </div>

      {/* Product Display */}
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">
          {category ? category : "New Products"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            <p className="text-gray-500 col-span-full text-center">
              Loading products...
            </p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found {category && `in ${category}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
