import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import big_image_1 from '../assets/ShowCase/big_image_1.jpg';
import big_image_2 from '../assets/ShowCase/big_image_2.jpg';
import big_image_3 from '../assets/ShowCase/big_image_3.jpg';
import small_image_1 from '../assets/ShowCase/small_image_1.jpg';
import small_image_2 from '../assets/ShowCase/small_image_2.jpg';
import small_image_3 from '../assets/ShowCase/small_image_3.jpg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ your backend API

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
    const [productId, setProductId] = useState(null);

    const navigate = useNavigate();

     useEffect(() => {
    const fetchFirstProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        if (res.data && res.data.length > 0) {
          setProductId(res.data[0]._id); // ✅ store first product id
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchFirstProduct();
  }, []);

  // Sample product images
  const images = [
    big_image_1,
    big_image_2,
    big_image_3,
  ];

  // Mini images for the thumbnail slider
  const miniImages = [
   small_image_1,
   small_image_2,
   small_image_3,
  ];

  // Navigation functions
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        goToNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

   const handleBuyNow = () => {
    if (productId) {
      navigate(`/products/${productId}`); // URL will show product id
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-200 rounded-lg shadow-lg mt-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Image Slider */}
        <div className="w-full md:w-1/2">
          <div 
            className="relative h-80 md:h-96 rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Sale Badge - Top Left Corner */}
            <div className="absolute top-2 left-2 z-10 bg-red-600 text-white font-bold text-sm px-3 py-1 rounded-full shadow-md">
              SALE
            </div>
            
            {/* Main Image */}
            <div 
              className="w-full h-full bg-center bg-cover transition-all duration-500 ease-in-out"
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
            ></div>
            
            {/* Navigation Arrows (visible on hover) */}
            {isHovered && (
              <>
                <button 
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Thumbnail Slider */}
          <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
            {miniImages.map((image, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border-2 cursor-pointer ${index === currentIndex ? 'border-[#a9575a]' : 'border-gray-200'}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Section - Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Vagina Tightening Spray 50ml</h1>
          
          <div className="flex items-center mb-4">
            <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              10 sold in last 1 hour
            </span>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Experience new pleasure with Gracia Feminine Magic Spray, the only 100% Organic Vagina Tightening Spray in Pakistan! Why To Use Our Spray This premium-quality Spray, made in Belgium with natural ingredients, tightens the vagina within 20 minutes - no side effects! Get the best price, double your pleasure, and enjoy.
          </p>
          
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-[#a9575a]">Rs. 4,498.00</span>
              <span className="ml-2 text-lg text-gray-500 line-through">Rs. 7,000.00</span>
              <span className="ml-2 text-green-600 font-semibold">35% off</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button onClick={handleBuyNow} className="flex-1 bg-black text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
            {productId ? "Buy Now" : "Loading..."}
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a9575a] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">100% Organic & Natural Ingredients</span>
            </div>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a9575a] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">Made in Belgium</span>
            </div>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a9575a] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">No Side Effects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;