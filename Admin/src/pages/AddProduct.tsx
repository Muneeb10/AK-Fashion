import { useState, FormEvent, ChangeEvent, DragEvent, useRef, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  stock: number;
  rating: number;
  description: string;
  color: string; // single input, will be sent as array
  sizes: string[];
  image: File | null;
}

export default function AddProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: 0,
    oldPrice: 0,
    stock: 0,
    rating: 0,
    description: "",
    color: "",
    sizes: [],
    image: null,
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

  // Handle input changes
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

  // Handle size selection
  const handleSizeChange = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // Handle file selection
  const handleFile = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFile(e.target.files[0]);
  };

  // Drag & drop
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
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("currentPrice", formData.price.toString()); // match backend field
      data.append("originalPrice", formData.oldPrice.toString());
      data.append("stock", formData.stock.toString());
      data.append("rating", formData.rating.toString());
      data.append("description", formData.description);

      // FIX: send color as array
      data.append("colors", JSON.stringify([formData.color]));

      data.append("sizes", JSON.stringify(formData.sizes));
      if (formData.image) {
        data.append("images", formData.image); // match backend "images" field
      }
      console.log(data);
      
      await axios.post(`${API_BASE_URL}/api/products/addproducts`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      setFormData({
        name: "",
        category: "",
        price: 0,
        oldPrice: 0,
        stock: 0,
        rating: 0,
        description: "",
        color: "",
        sizes: [],
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl"
      >
        {/* Image Upload */}
        <div
          className={`md:col-span-2 w-[200px] flex flex-col items-center justify-center border-2 rounded-lg border-1 p-6 cursor-pointer transition ${
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
          />
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
              required
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Color */}
          <div>
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
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
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}