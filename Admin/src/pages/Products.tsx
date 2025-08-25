import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { NavLink } from "react-router";
import { PencilIcon, TrashBinIcon, FilterIcon } from "../icons";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Product {
  _id: string;
  name: string;
  images: string[];
  stock: number;
  category: { $oid: string; name?: string };
  rating: number;
  currentPrice: number;
  originalPrice?: number;
  colors: string[];
  sizes: string[];
  description?: string;
  createdAt: { $date: { $numberLong: string } } | string;
  updatedAt: { $date: { $numberLong: string } } | string;
  __v: number;
}

interface Filters {
  name: string;
  category: string;
  size: string;
  color: string;
  minStock: string;
  maxStock: string;
  minPrice: string;
  maxPrice: string;
  dateFrom: string;
  dateTo: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [filters, setFilters] = useState<Filters>({
    name: "",
    category: "",
    size: "",
    color: "",
    minStock: "",
    maxStock: "",
    minPrice: "",
    maxPrice: "",
    dateFrom: "",
    dateTo: ""
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(30);

  // Helper to parse MongoDB date
  const parseMongoDate = (dateObj: any): Date => {
    if (typeof dateObj === 'string') return new Date(dateObj);
    if (dateObj?.$date?.$numberLong) return new Date(parseInt(dateObj.$date.$numberLong));
    return new Date();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);

        const transformedProducts = response.data.map((product: Product) => ({
          ...product,
          colors: Array.isArray(product.colors) ? product.colors : [],
          sizes: Array.isArray(product.sizes) ? product.sizes : [],
          createdAt: parseMongoDate(product.createdAt).toISOString(),
          category: {
            _id: product.category.$oid,
            name: product.category.name || "Uncategorized"
          }
        }));

        setProducts(transformedProducts);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // reset to first page on filter change
  };

  const filteredProducts = products.filter(product => {
    const productDate = parseMongoDate(product.createdAt);
    const price = product.currentPrice;
    const categoryName = product.category?.name || "";

    return (
      (filters.name === "" || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.category === "" || categoryName === filters.category) &&
      (filters.size === "" || product.sizes.includes(filters.size)) &&
      (filters.color === "" || product.colors.some(c => c.toLowerCase().includes(filters.color.toLowerCase()))) &&
      (filters.minStock === "" || product.stock >= Number(filters.minStock)) &&
      (filters.maxStock === "" || product.stock <= Number(filters.maxStock)) &&
      (filters.minPrice === "" || price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" || price <= Number(filters.maxPrice)) &&
      (filters.dateFrom === "" || productDate >= new Date(filters.dateFrom)) &&
      (filters.dateTo === "" || productDate <= new Date(filters.dateTo))
    );
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      console.log("Delete response:", res.data);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert("Delete failed: " + (axios.isAxiosError(err) ? err.response?.data?.message || err.message : "Unknown error"));
    }
  };

  const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];
  const sizes = [...new Set(products.flatMap(p => p.sizes).filter(Boolean))];
  const colors = [...new Set(products.flatMap(p => p.colors).filter(Boolean))];

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <PageMeta title="AK Fashion | Products" description="Products table page" />
      <PageBreadcrumb pageTitle="Products" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg transition"
            >
              <FilterIcon className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          <NavLink
            to="/products/addproducts"
            className="text-sm text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-lg transition w-full md:w-auto text-center"
          >
            + Add Product
          </NavLink>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text" name="name" value={filters.name} onChange={handleFilterChange}
                  placeholder="Search by name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select name="category" value={filters.category} onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
                <select name="size" value={filters.size} onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Sizes</option>
                  {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                <select name="color" value={filters.color} onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Colors</option>
                  {colors.map(color => <option key={color} value={color}>{color}</option>)}
                </select>
              </div>

              {/* Stock Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Range</label>
                <div className="flex gap-2">
                  <input type="number" name="minStock" value={filters.minStock} onChange={handleFilterChange} placeholder="Min"
                    className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                  <input type="number" name="maxStock" value={filters.maxStock} onChange={handleFilterChange} placeholder="Max"
                    className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range ($)</label>
                <div className="flex gap-2">
                  <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min"
                    className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                  <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max"
                    className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                <div className="flex gap-2">
                  <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange}
                    className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                  <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange}
                    className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                </div>
              </div>

              {/* Reset Filters */}
              <div className="flex items-end">
                <button onClick={() => setFilters({
                  name: "", category: "", size: "", color: "",
                  minStock: "", maxStock: "", minPrice: "", maxPrice: "", dateFrom: "", dateTo: ""
                })} 
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <tr key={product._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3">
                    {product.images?.length > 0 ? (
                      <img src={`${API_BASE_URL}${product.images[0]}`} alt={product.name} className="h-12 w-12 object-cover rounded"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder-product.png'; e.currentTarget.onerror = null; }} />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.category?.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.sizes.join(', ') || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.colors.join(', ') || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">${product.currentPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.stock}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.rating.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex justify-end space-x-2">
                      <NavLink to={`/products/updateproducts/${product._id}`} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                        <PencilIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />
                      </NavLink>
                      <button onClick={() => handleDelete(product._id)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition" aria-label={`Delete ${product.name}`}>
                        <TrashBinIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of{" "}
            <span className="font-medium">{filteredProducts.length}</span> products
          </div>
          <div className="flex space-x-2">
            <button onClick={handlePrevPage} disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
