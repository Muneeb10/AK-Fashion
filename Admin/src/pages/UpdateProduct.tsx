import { useState, FormEvent, ChangeEvent, DragEvent, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  stock: number;
  rating: number;
  description: string;
  colors: string[];
  sizes: string[];
  images: File[];
  existingImages: string[];
}

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: 0,
    oldPrice: 0,
    stock: 0,
    rating: 0,
    description: "",
    colors: [],
    sizes: [],
    images: [],
    existingImages: []
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch product data for edit
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API_BASE_URL}/api/products/updateproducts/${id}`)
      .then((res) => {
        const p = res.data;
        setFormData({
          name: p.name || "",
          category: p.category?._id || "",
          price: p.currentPrice || 0,
          oldPrice: p.originalPrice || 0,
          stock: p.stock || 0,
          rating: p.rating || 0,
          description: p.description || "",
          colors: p.colors || [],
          sizes: p.sizes || [],
          images: [],
          existingImages: p.images || []
        });
        if (p.images?.length > 0) {
          setPreview(`${API_BASE_URL}${p.images[0]}`);
        }
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "oldPrice" || name === "stock" || name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      colors: value.split(',').map(c => c.trim()).filter(Boolean)
    }));
  };

  const handleSizeChange = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleFile = (files: FileList) => {
    const newImages = Array.from(files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    
    // Show preview of the first new image
    if (newImages.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(newImages[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFile(e.target.files);
  };

  const handleRemoveImage = (index: number, isExisting: boolean) => {
  setFormData(prev => {
    // Remove the image from the appropriate array
    const updatedFormData = {
      ...prev,
      [isExisting ? 'existingImages' : 'images']: 
        isExisting 
          ? prev.existingImages.filter((_, i) => i !== index)
          : prev.images.filter((_, i) => i !== index)
    };

    // Update preview if needed
    // let newPreview = preview;
    // if (!isExisting) {
    //   if (index === 0 && prev.images.length > 1) {
    //     // If removing the first new image and there are others, show the next one
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       setPreview(reader.result as string);
    //     };
    //     reader.readAsDataURL(prev.images[1]);
    //   } else if (prev.images.length === 1) {
    //     // If removing the last new image, fall back to existing images
    //     newPreview = updatedFormData.existingImages[0] 
    //       ? `${API_BASE_URL}${updatedFormData.existingImages[0]}`
    //       : null;
    //   }
    // }

    // If we're removing the currently previewed image
    if (preview === (isExisting 
        ? `${API_BASE_URL}${prev.existingImages[index]}`
        : URL.createObjectURL(prev.images[index]))) {
      if (updatedFormData.images.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(updatedFormData.images[0]);
      } else if (updatedFormData.existingImages.length > 0) {
        setPreview(`${API_BASE_URL}${updatedFormData.existingImages[0]}`);
      } else {
        setPreview(null);
      }
    }

    return updatedFormData;
  });
};
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("currentPrice", formData.price.toString());
      data.append("originalPrice", formData.oldPrice.toString());
      data.append("stock", formData.stock.toString());
      data.append("rating", formData.rating.toString());
      data.append("description", formData.description);
      data.append("colors", JSON.stringify(formData.colors));
      data.append("sizes", JSON.stringify(formData.sizes));
      
      // Add new images
      formData.images.forEach(file => {
        data.append("images", file);
      });

      // Add existing images that weren't removed
      data.append("existingImages", JSON.stringify(formData.existingImages));

      await axios.put(`${API_BASE_URL}/api/products/updateproducts/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        Update Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl"
      >
        {/* Image Upload */}
        <div className="md:col-span-2">
          <div
            className={`w-[200px] flex flex-col items-center justify-center border-2 rounded-lg border-1 p-6 cursor-pointer transition ${
              dragActive
                ? "border-blue-600 bg-blue-50 dark:bg-gray-700"
                : "border-gray-300 dark:border-gray-700"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 object-contain rounded-md" />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Drag & drop product image here, or click to select file
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
              multiple
            />
          </div>
          
          {/* Image thumbnails */}
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.existingImages.map((img, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={`${API_BASE_URL}${img}`}
                  alt={`Existing ${index}`}
                  className="h-16 w-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, true)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            {formData.images.map((img, index) => (
              <div key={`new-${index}`} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`New ${index}`}
                  className="h-16 w-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, false)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Left Column */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border px-4 py-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label>Current Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Old Price */}
          <div>
            <label>Original Price ($)</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Stock */}
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Rating */}
          <div>
            <label>Rating (0-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              required
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Color */}
          <div>
            <label>Colors (comma separated)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors.join(', ')}
              onChange={handleColorChange}
              placeholder="e.g. Red, Blue, Green"
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Sizes */}
          <div>
            <label>Sizes</label>
            <div className="flex flex-wrap gap-3">
              {sizeOptions.map((size) => (
                <label
                  key={size}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium ${
                    formData.sizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="hidden"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-center">
          <button type="submit" className="w-[200px] rounded-lg bg-black px-4 py-2 text-white">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
