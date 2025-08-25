import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo_black.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from "lucide-react";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const [isDressesDropdownOpen, setIsDressesDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [mobileMenDropdownOpen, setMobileMenDropdownOpen] = useState(false);
  const [mobileDressesDropdownOpen, setMobileDressesDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const moreMenuRef = useRef(null);
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMoreMenuOpen(false);
  };
  const toggleMenDropdown = () => setIsMenDropdownOpen((prev) => !prev);
  const toggleDressesDropdown = () => setIsDressesDropdownOpen((prev) => !prev);
  const toggleCartDropdown = () => setIsCartDropdownOpen((prev) => !prev);
  const toggleMobileMenDropdown = () => setMobileMenDropdownOpen((prev) => !prev);
  const toggleMobileDressesDropdown = () => setMobileDressesDropdownOpen((prev) => !prev);
  const toggleMoreMenu = () => setIsMoreMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMenDropdownOpen(false);
        setIsDressesDropdownOpen(false);
        setIsCartDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Logout function
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsDropdownOpen(false);
    setIsMoreMenuOpen(false);
    navigate("/auth/form");
  };

  const navItems = [
    { label: "New Arrivals", path: "/new_arrivals" },
    { label: "Home", path: "/" },
    { label: "Men", path: "/men", hasDropdown: true },
    { label: "Dresses", path: "/dresses", hasDropdown: true },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const menSubItems = [
    { label: "Cotton Dresses", path: "/men/Cotton Dresses" },
    { label: "Lawn Dresses", path: "/men/Lawn Dresses" },
    { label: "Khaddar Dresses", path: "/men/Khaddar Dresses" },
    { label: "Shalwar Kameez", path: "/men/Shalwar Kameez" },
    { label: "Bridal Dresses", path: "/men/Bridal Dresses" },
    { label: "Party Wear Dresses", path: "/men/Party Wear Dresses" },
  ];

  const dressesSubItems = [
    { label: "Summer Dresses", path: "/men/Summer Dresses" },
    { label: "Winter Dresses", path: "/men/Winter Dresses" },
    { label: "Festive Wear", path: "/men/Festive Wear" },
    { label: "Casual Dresses", path: "/men/Casual Dresses" },
    { label: "Formal Dresses", path: "/men/Formal Dresses" },
    { label: "Party Dresses", path: "/men/Party Dresses" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#a9575a] text-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-center sm:text-left gap-2">
          <div className="text-white flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>0346-1709871</span>
            </div>
           
          </div>
          <div className="text-white font-semibold w-full sm:w-auto">
            <a href="/sale" className="hover:underline">
              Summer Sale: Up to 50% OFF - Shop Now!
            </a>
          </div>
          <div className="flex gap-3 text-white w-full sm:w-auto justify-center sm:justify-end">
            <a href="#"><Facebook className="w-4 h-4 hover:text-blue-600" /></a>
            <a href="#"><Instagram className="w-4 h-4 hover:text-pink-500" /></a>
            <a href="#"><Twitter className="w-4 h-4 hover:text-blue-400" /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Mobile Menu Toggle (Left) */}
          <button onClick={toggleMenu} className="sm:hidden text-gray-700">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo (Left on desktop, centered on mobile) */}
          <div className="flex items-center gap-3 sm:flex-none justify-center sm:justify-start">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl sm:text-2xl font-bold text-gray-800 sm:block text-xl">
              Inner Elegance
            </h1>
          </div>

          {/* Desktop Navigation (Centered) */}
          <nav className="hidden sm:flex gap-6 relative mx-auto">
            {navItems.map(({ label, path, hasDropdown }) => {
              if (label === "Men") {
                return (
                  <div key={label} className="relative group">
                    <button className="text-[15px] font-medium px-3 py-1 rounded-lg transition-colors hover:bg-gray-100 hover:text-black">
                      {label}
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-[700px] bg-white shadow-lg border border-gray-200 rounded-md z-30 p-6 grid grid-cols-3 gap-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div>
                        <h4 className="text-md font-semibold mb-2 text-gray-800">Dresses by Fabric</h4>
                        <ul className="space-y-1">
                          {menSubItems.slice(0, 3).map((item) => (
                            <li key={item.path}>
                              <NavLink to={item.path} className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">
                                {item.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold mb-2 text-gray-800">Dresses by Style</h4>
                        <ul className="space-y-1">
                          {menSubItems.slice(3).map((item) => (
                            <li key={item.path}>
                              <NavLink to={item.path} className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">
                                {item.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold mb-2 text-gray-800">Accessories</h4>
                        <ul className="space-y-1">
                          <li><NavLink to="/men/perfumes" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Perfumes</NavLink></li>
                          <li><NavLink to="/men/wallets" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Wallets</NavLink></li>
                          <li><NavLink to="/men/watches" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Feminine Care</NavLink></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              }

              if (label === "Dresses") {
                return (
                  <div key={label} className="relative group">
                    <button className="text-[15px] font-medium px-3 py-1 rounded-lg transition-colors hover:bg-gray-100 hover:text-black">
                      {label}
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-md z-30 py-6 px-4 space-y-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {dressesSubItems.map((item) => (
                        <NavLink 
                          key={item.path}
                          to={item.path}
                          className="block text-sm text-gray-700 hover:text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={label}
                  to={path}
                  className={({ isActive }) =>
                    `text-[15px] font-medium px-3 py-1 rounded-lg transition-colors ${
                      isActive ? "text-black bg-gray-100 font-semibold" : "hover:bg-gray-100 hover:text-black"
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {/* Search Icon (hidden on mobile, shown in more menu) */}
            <button onClick={toggleSearch} className="hidden sm:block">
              <Search className="w-5 h-5 text-gray-600 hover:text-[#8f5e2e]" />
            </button>

            {/* Cart Icon with Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleCartDropdown}
                className="relative p-1"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-[#8f5e2e]" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartQuantity}
                  </span>
                )}
              </button>
              {isCartDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-30 p-4">
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">Your Cart ({cartQuantity} {cartQuantity === 1 ? 'item' : 'items'})</h4>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                  ) : (
                    <>
                      <ul className="space-y-3 max-h-60 overflow-y-auto">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex gap-3 items-center text-sm text-gray-700">
                            <img 
                             src={`${API_BASE_URL}${item.img}`}
                              alt={item.title || item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium truncate">{item.title || item.name}</p>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Qty: {item.quantity}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Subtotal:</span>
                          <span className="font-medium">
                            ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <NavLink 
                          to="/cart" 
                          className="block text-center w-full text-sm py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                          onClick={() => setIsCartDropdownOpen(false)}
                        >
                          View Cart & Checkout
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* User dropdown (desktop) */}
            <div className="relative hidden sm:block">
              <User 
                onClick={toggleDropdown} 
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-[#8f5e2e]" 
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {!userInfo ? (
                    <NavLink 
                      to="/auth/form" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Login
                    </NavLink>
                  ) : (
                    <>
                      <p className="px-4 py-2 text-sm text-gray-600 border-b">Hi, {userInfo.name || "User"}</p>
                      <NavLink 
                        to="/track-order" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Track Order
                      </NavLink>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* More menu (three dots) for mobile */}
            <div className="relative sm:hidden" ref={moreMenuRef}>
              <button onClick={toggleMoreMenu}>
                <MoreVertical className="w-6 h-6 text-gray-700" />
              </button>
              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <button 
                    onClick={toggleSearch}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </button>
                  {!userInfo ? (
                    <NavLink 
                      to="/auth/form" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </NavLink>
                  ) : (
                    <>
                      <p className="px-4 py-2 text-sm text-gray-600 border-b">Hi, {userInfo.name || "User"}</p>
                      <NavLink 
                        to="/track-order" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Track Order
                      </NavLink>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setIsMoreMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-3">
              <ul className="space-y-2">
                {navItems.map(({ label, path, hasDropdown }) => {
                  if (label === "Men") {
                    return (
                      <li key={label} className="border-b border-gray-100 pb-2">
                        <button 
                          onClick={toggleMobileMenDropdown}
                          className="flex justify-between items-center w-full text-left py-2 font-medium"
                        >
                          <span>{label}</span>
                          {mobileMenDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {mobileMenDropdownOpen && (
                          <ul className="pl-4 space-y-2 mt-2">
                            {menSubItems.map((item) => (
                              <li key={item.path}>
                                <NavLink 
                                  to={item.path}
                                  className="block py-1 text-gray-600 hover:text-black"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {item.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  if (label === "Dresses") {
                    return (
                      <li key={label} className="border-b border-gray-100 pb-2">
                        <button 
                          onClick={toggleMobileDressesDropdown}
                          className="flex justify-between items-center w-full text-left py-2 font-medium"
                        >
                          <span>{label}</span>
                          {mobileDressesDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {mobileDressesDropdownOpen && (
                          <ul className="pl-4 space-y-2 mt-2">
                            {dressesSubItems.map((item) => (
                              <li key={item.path}>
                                <NavLink 
                                  to={item.path}
                                  className="block py-1 text-gray-600 hover:text-black"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {item.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={label} className="border-b border-gray-100">
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `block py-2 font-medium ${
                            isActive ? "text-black" : "text-gray-600 hover:text-black"
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile User Actions */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                {!userInfo ? (
                  <NavLink
                    to="/auth/form"
                    className="block py-2 text-center font-medium text-gray-600 hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                ) : (
                  <>
                    <p className="py-2 text-gray-600">Hi, {userInfo.name || "User"}</p>
                    <NavLink
                      to="/track-order"
                      className="block py-2 text-gray-600 hover:text-black"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Track Order
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left py-2 text-gray-600 hover:text-black"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#8f5e2e]"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
