import React from 'react';
import { Link } from 'react-router-dom';

// Sample blog data - replace with your actual content or API calls
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Summer Fashion Trends for 2024",
    excerpt: "Discover the must-have styles for this season that will keep you looking fresh all summer long.",
    category: "Fashion",
    date: "June 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Sustainable Materials: The Future of Eco-Friendly Products",
    excerpt: "Learn how our new product line uses innovative materials to reduce environmental impact.",
    category: "Sustainability",
    date: "June 8, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Home Organization Tips from Professional Organizers",
    excerpt: "Transform your living space with these expert-approved organization hacks.",
    category: "Lifestyle",
    date: "May 30, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "How to Choose the Perfect Running Shoes",
    excerpt: "Our comprehensive guide helps you find footwear that matches your running style.",
    category: "Fitness",
    date: "May 22, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  }
];

const BlogNews = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section - Centered */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & News</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the latest trends, tips, and company updates from our team of experts.
        </p>
      </div>

      {/* Main Content - Centered */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Featured Post - Centered */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Featured post"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                    Featured
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    The Ultimate Guide to Seasonal Wardrobe Transitions
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Learn how to seamlessly transition your wardrobe between seasons while maximizing your existing pieces.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>June 20, 2024</span>
                    <span className="mx-2">•</span>
                    <span>10 min read</span>
                  </div>
                  <Link
                    to="/blog/ultimate-guide-seasonal-wardrobe-transitions"
                    className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid - Centered */}
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  className="w-full h-48 object-cover"
                  src={post.image}
                  alt={post.title}
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    <Link to={`/blog/${post.id}`} className="hover:text-indigo-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination - Centered */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md bg-black text-white">
                1
              </button>
              <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100">
                3
              </button>
              <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100">
                Next →
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNews;