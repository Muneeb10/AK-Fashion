import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartSlice/CartSlice.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product._id || product.id,
        img: product.img || product.image,
        title: product.title,
        price: product.price,
        newPrice: product.newPrice || product.price,
        prevPrice: product.prevPrice || null,
        company: product.company || "",
        category: product.category || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        selectedColor: product.colors?.[0] || "",
        selectedSize: product.sizes?.[0] || "",
        selectedDressSize: "S",
        quantity: 1,
        rating: product.rating || 4,
        reviews: product.reviews || 0,
        description: product.description || "",
      })
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 hover:border-gray-200 cursor-pointer"
    >
      <div className="relative w-full aspect-square sm:aspect-[3/4] lg:aspect-square xl:aspect-[3/4] rounded-t-lg overflow-hidden">
        <img
           src={`${API_BASE_URL}${product.images?.[0] || product.img || product.image}`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-1 sm:mb-2">
          <h3 className="text-sm sm:text-base font-medium line-clamp-2 flex-1">
            {product.name}
          </h3>
        
        </div>

        {product.originalPrice && (
          <div className="text-xs sm:text-sm text-gray-400 line-through mb-2 sm:mb-3">
            ${product.originalPrice.toFixed(2)}
          </div>
        )}

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < (product.rating || 4)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  } w-3 h-3 sm:w-4 sm:h-4`}
                  strokeWidth={i < (product.rating || 4) ? 1.5 : 1}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating || 0})
            </span>
          </div>

           <span className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
            RS. {Number(product.currentPrice ?? product.currentPrice ?? 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;