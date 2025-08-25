// src/Components/FilterProducts.jsx
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import ProductCard from "./ProductCard";
import HeaderTitle from './Utilitices/HeaderTitle/HeaderTitle.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FilterProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const visibleProducts = products.slice(currentIndex, currentIndex + 4);

  const scroll = (direction) => {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (direction === "right" && currentIndex < products.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex flex-col align-center py-20 mx-auto bg-white px-4">
      <div className="flex items-center justify-center w-full mb-8 text-center">
        <HeaderTitle title="Best Selling Products" />
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        <div ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Arrows - Hidden on small screens */}
        <div className="hidden sm:block">
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md ${
              currentIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={currentIndex >= products.length - 4}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md ${
              currentIndex >= products.length - 4
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Arrows - Visible only on small screens */}
        <div className="sm:hidden flex justify-center gap-4 mt-6">
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full shadow-md ${
              currentIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={currentIndex >= products.length - 4}
            className={`p-3 rounded-full shadow-md ${
              currentIndex >= products.length - 4
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
