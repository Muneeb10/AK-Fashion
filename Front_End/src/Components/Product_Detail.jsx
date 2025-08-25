import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../CartSlice/CartSlice.jsx";
import FilterProducts from "./Product.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(id);
  

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedDressSize, setSelectedDressSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  // fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`)
        setProduct(res.data);
        setSelectedColor(res.data.colors?.[0] || "");
        setSelectedSize(res.data.sizes?.[0] || "");
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4">Loading product...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!product) return <div className="p-4">No product found.</div>;

 const handleAddToCart = () => {
  dispatch(
    addToCart({
      id: product._id || product.id,  // ensure unique ID
      img: product.img || product.image || product.images?.[0],
      title: product.title || product.name, // use title (slice expects this)
      price: product.price || product.currentPrice, 
      newPrice: product.newPrice || product.currentPrice,
      prevPrice: product.prevPrice || product.originalPrice || null,
      reviews: product.reviews || product.rating || 0,
      selectedColor,
      selectedSize,
      selectedDressSize,
      quantity,
    })
  );
  navigate("/cart");
};



  const buyNow = () => {
    const item = {
      ...product,
      selectedColor,
      selectedSize,
      selectedDressSize,
      quantity,
      newPrice: product.newPrice || product.price,
      img: product.img || product.image,
    };
    navigate("/checkout", { state: { buyNowItem: item } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* product image */}
        <div>
          <img
             src={`${API_BASE_URL}${product.images?.[0] || product.img || product.image}`}
            alt={product.title}
            className="w-full h-[500px] rounded-xl shadow-md object-cover"
          />
        </div>

        {/* product details */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

          <div className="flex items-center gap-2">
            <p className="text-2xl text-green-600 font-semibold">
               Rs. {Number(product.currentPrice ?? product.currentPrice ?? 0).toFixed(2)}
            </p>
            {product.prevPrice && (
              <p className="text-gray-500 line-through">
                Rs.{product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < (product.rating || 4)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.rating || 0} reviews)
            </span>
          </div>

          {/* colors */}
          {product.colors?.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700">Color</h4>
              <div className="flex space-x-3 mt-1">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700">Size</h4>
              <div className="flex space-x-3 mt-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-md border ${
                      selectedSize === size
                        ? "bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* quantity */}
          <div>
            <h4 className="font-medium text-gray-700">Quantity</h4>
            <div className="flex items-center space-x-3 mt-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="w-8 h-8 border border-gray-300 rounded-md text-lg font-semibold hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-md font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 border border-gray-300 rounded-md text-lg font-semibold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stock: {product.stock}</h3>
          
          {/* buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
           
          </div>
              </div>
              </div>

          {/* Product Description Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
            <div className="prose max-w-none text-gray-700">
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <p>No description available for this product.</p>
              )}
              
              {/* Additional product details if available */}
              {product.details && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Details:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.details.split('\n').map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

      <FilterProducts />
    </div>
  );
};

export default ProductDetail;