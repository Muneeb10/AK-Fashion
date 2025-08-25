import React from 'react';
import image_1 from '../assets/image_1.jpg'
import image_2 from '../assets/image_2.jpg'
import image_3 from '../assets/image_3.jpg'

const SimpleImageDisplay = () => {
  const images = [
    {
      id: 1,
      src: image_1,
      alt: 'Image 1'
    },
    {
      id: 2,
      src: image_2,
      alt: 'Image 2'
    },
    {
      id: 3,
      src: image_3,
      alt: 'Image 3'
    }
  ];

  return (
    <div className=" min-h-screen p-4">
      <div className="w-full p-10 ">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          />
        ))}
      </div>

<div className="text-center mt-12">
          <button className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
            Shop Now
           
          </button>
        </div>

    </div>
  );
};

export default SimpleImageDisplay;