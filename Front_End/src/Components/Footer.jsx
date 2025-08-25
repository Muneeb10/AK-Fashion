import React from "react";
import { NavLink } from 'react-router-dom';
import image_1 from '../assets/Footer_images/image_1.jpeg';
import image_2 from '../assets/Footer_images/image_2.jpeg';
import logo from '../assets/logo_black.jpg';
import WhatsAppIcon from "./Whatsapp_Icon";
import BackToTopButton from "./BackToTopButton.jsx"

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    image: image_1,
    title: "Summer Trends 2025",
    desc: "Discover the hottest fashion picks this summer.",
  },
  {
    id: 2,
    image: image_2,
    title: "Men's Wardrobe Essentials",
    desc: "Top 5 items every man should have in his closet.",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        
        {/* Company Info - Centered on mobile */}
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start space-x-0 sm:space-x-3 mb-4">
            <div className="flex justify-center sm:block">
              <img src={logo} alt="ShopMate Logo" className="h-10 w-10 rounded-full object-cover mx-auto sm:mx-0" />
            </div>
            <h2 className="text-2xl font-bold mt-2 sm:mt-0" style={{ fontFamily: "'Mitr'" }}>
              AK Fashion
            </h2>
          </div>
          <p className="text-gray-400 text-sm mb-4 mx-auto sm:mx-0 max-w-xs">
            Your one-stop shop for the latest fashion trends and accessories.
          </p>
          <div className="flex justify-center sm:justify-start space-x-4">
            <Facebook className="h-5 w-5 hover:text-blue-500 cursor-pointer transition-colors" />
            <Instagram className="h-5 w-5 hover:text-pink-500 cursor-pointer transition-colors" />
            <Twitter className="h-5 w-5 hover:text-blue-400 cursor-pointer transition-colors" />
            <Linkedin className="h-5 w-5 hover:text-blue-700 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links - Centered on mobile */}
        <div className="md:col-span-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
           <li><NavLink to="/" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Home</NavLink></li>
           <li><NavLink to="/men/shirts" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Shop</NavLink></li>
           <li><NavLink to="/about" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>About</NavLink></li>
           <li><NavLink to="/contact" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Contact</NavLink></li>
          </ul>
        </div>

        {/* Customer Service - Centered on mobile */}
        <div className="md:col-span-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
           <li><NavLink to="/faqs" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>FAQs</NavLink></li>
           <li><NavLink to="/shipping-policy" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Shipping</NavLink></li>
           <li><NavLink to="/return-policy" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Returns</NavLink></li>
           <li><NavLink to="/privacy-policy" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Privacy Policy</NavLink></li>
          </ul>
        </div>

        {/* Additional - Centered on mobile */}
        <div className="md:col-span-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-3">Additional</h3>
          <ul className="text-gray-400 text-sm space-y-2">
        
            <li><NavLink to="/about" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Our Story</NavLink></li>
            <li><NavLink to="/who we are" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Who we are</NavLink></li>
            <li><NavLink to="/our-process" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Our Process</NavLink></li>
           <li><NavLink to="/blog" className={({ isActive }) => `hover:text-white transition-colors block ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>Blog & News</NavLink></li>
          </ul>
        </div>

        {/* Latest Blogs - Left aligned on all screens */}
<div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
  <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">Latest Blogs</h3>
  <div className="space-y-4">
    {blogPosts.map((post) => (
      <NavLink 
        // to={`/blog/${post.id}`} // Dynamic route (adjust based on your routing)
        to={`/blog`} // Dynamic route (adjust based on your routing)
        key={post.id} 
        className="flex gap-3 hover:bg-gray-100/10 transition p-1 rounded" // Optional hover effect
        onClick={() => window.scrollTo(0, 0)} // Scroll to top on click (optional)
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-20 h-20 rounded object-cover flex-shrink-0"
        />
        <div>
          <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{post.desc}</p>
        </div>
      </NavLink>
    ))}
  </div>
</div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} AK Fashion. All rights reserved.</p>
      </div>

      {/* WhatsApp Icon */}
      <WhatsAppIcon />
        <BackToTopButton />
    </footer>
  );
};

export default Footer;