import React from 'react';
import image_1 from '../assets/Sliding_image/image_1.jpg'
import image_2 from '../assets/Sliding_image/image_2.jpg'
import image_3 from '../assets/Sliding_image/image_3.jpg'
import image_4 from '../assets/Sliding_image/image_4.jpg'

const HowToUse = () => {
  // Sample data – replace with your actual data if needed
  const items = [
    {
      id: 1,
      name: "Clean",
      image: image_3,
    },
    {
      id: 2,
      name: "Spray",
      image: image_1,
    },
    {
      id: 3,
      name: "Wait",
      image: image_2,
    },
    {
      id: 4,
      name: "Enjoy",
      image: image_4,
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">How to Use</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center">
            {/* Image Container */}
            <div className="w-60 h-40  transform hover:scale-105 transition-transform duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-800">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToUse;
