import React from 'react';
import big_image from '../assets/benefits/big_image_1.jpg';
import small_image from '../assets/benefits/small_image_1.jpg';

const Benefits = ({
  alt = '',
  className = '',
  containerClassName = '',
  height = {
    base: '90%',
    md: '400px',
    lg: '500px',
    xl: '600px'
  },
  objectFit = 'cover'
}) => {
  const getHeight = () => {
    // This will only apply base height. Responsive height would need CSS.
    return typeof height === 'string' ? height : height.base;
  };

  return (
    <div className={`w-full h-[100vh] mt-20 overflow-hidden ${containerClassName}`}>
      <picture>
        {/* Large screen (min-width: 1024px) shows big image */}
        <source srcSet={big_image} media="(min-width: 1024px)" />
        {/* Small screens fallback to small image */}
        <img
          src={small_image}
          alt={alt}
          className={`w-full ${className}`}
          style={{
            height: getHeight(),
            objectFit: objectFit
          }}
        />
      </picture>
    </div>
  );
};

export default Benefits;
