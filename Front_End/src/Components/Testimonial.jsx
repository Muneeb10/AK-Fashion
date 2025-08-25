import React, { useRef, useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import bg_1 from "../assets/Testimonial_images/bg_image_1.jpg";
import bg_2 from "../assets/Testimonial_images/bg_image_2.jpg";
import bg_3 from "../assets/Testimonial_images/bg_image_3.jpg";
import bg_4 from "../assets/Testimonial_images/bg_image_4.jpg";
import bg_5 from "../assets/Testimonial_images/bg_image_5.jpg";
import bg_6 from "../assets/Testimonial_images/bg_image_1.jpg";


const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    {
      name: "John Doe",
      stars: 5,
      description: "This product has completely transformed my workflow. The quality is exceptional and the customer service was outstanding!"
    },
    {
      name: "Jane Smith",
      stars: 4,
      description: "Great value for money. Would definitely recommend to others looking for a reliable solution."
    },
    {
      name: "Robert Johnson",
      stars: 5,
      description: "I've been using this for a month now and it has exceeded all my expectations. Simply amazing!"
    },
    {
      name: "Sarah Williams",
      stars: 5,
      description: "The attention to detail is impressive. It's clear that the team puts a lot of thought into their products."
    },
    {
      name: "Michael Brown",
      stars: 4,
      description: "Solid performance and reliable. It does exactly what it promises without any fuss."
    },
    {
      name: "Emily Davis",
      stars: 5,
      description: "I was skeptical at first, but this has proven to be one of my best purchases this year."
    },
    {
      name: "David Wilson",
      stars: 5,
      description: "Outstanding quality and the delivery was faster than expected. Will buy again!"
    },
    {
      name: "Lisa Miller",
      stars: 4,
      description: "Good product with intuitive features. The learning curve was minimal."
    }
  ];

  const slidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const totalSlides = testimonials.length;
  const visibleSlides = slidesToShow();
  const maxSlide = Math.ceil(totalSlides / visibleSlides) - 1;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === maxSlide ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? maxSlide : currentSlide - 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newMaxSlide = Math.ceil(totalSlides / slidesToShow()) - 1;
      if (currentSlide > newMaxSlide) {
        setCurrentSlide(newMaxSlide);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide, totalSlides]);

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
      
      <div className="relative">
        {/* Slider container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 p-4"
                style={{ width: `${100 / visibleSlides}%` }}
              >
                <div className="bg-white rounded-lg shadow-md p-6 h-full">
                  <div className="flex mb-4">
                    {renderStars(testimonial.stars)}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.description}"</p>
                  <p className="font-semibold text-gray-800">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`mx-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-blue-500 w-8' : 'bg-gray-300 w-3'
            } h-3`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;