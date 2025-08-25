import React from 'react';
import Why_Choose_Us from './Why_Choose_Us';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">

        
        <div className="container mx-auto px-6 pt-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Why choose us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Cras malesuada dolor sit amet est egestas ullamcorper. Nullam in tortor mi. Maecenas vulputate libero
          </p>
        </div>

<Why_Choose_Us />


      {/* Mission Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Our Team" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At ShopEase, we believe in making online shopping effortless, enjoyable, and accessible to everyone. 
              Our mission is to connect customers with the products they love while providing exceptional service.
            </p>
            <p className="text-gray-600">
              Founded in 2015, we've grown from a small startup to one of the most trusted e-commerce platforms, 
              serving millions of happy customers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">👋</div>
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-gray-600">
                We put our customers at the heart of everything we do, ensuring their satisfaction is our top priority.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3">Quality Matters</h3>
              <p className="text-gray-600">
                We carefully curate our products to ensure only the highest quality items make it to your doorstep.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Growth</h3>
              <p className="text-gray-600">
                We're committed to ethical business practices and reducing our environmental footprint.
              </p>
            </div>
          </div>
        </div>
      </div>

     
      {/* CTA Section */}
      <div className="bg-white text-black py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Shop With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who trust us for their shopping needs.
          </p>
          <NavLink to="/" className="bg-black text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Start Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;