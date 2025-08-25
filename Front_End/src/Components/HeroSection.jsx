import React from 'react';
import banner_1 from "../assets/banner_images/banner_1.webp";
import banner_2 from "../assets/banner_images/banner_2.webp";

const HeroSection = () => {
 
  return (
    <div className="mx-4 my-4 rounded-xl overflow-hidden">
      <section className="relative w-full h-[70vh] sm:h-[70vh] md:h-[80vh]">
        <div className="w-full h-full overflow-hidden group">
          <img 
            src={banner_2} 
            alt="Banner for Small Screens" 
            className="block md:hidden w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
          />
          <img 
            src={banner_1} 
            alt="Banner for Large Screens" 
            className="hidden md:block w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
