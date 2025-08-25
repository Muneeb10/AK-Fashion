import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { PencilIcon, TrashBinIcon } from "../icons";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Category {
  _id: string;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  // const API_BASE = `${API_BASE_URL}/api/categories`; // adjust if different

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim() }),
      });

      if (!res.ok) throw new Error("Failed to add category");

      await fetchCategories();
      setNewCategory("");
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Edit category
  const handleEditSubmit = async (id: string) => {
    if (!editCategoryName.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editCategoryName.trim() }),
      });

      if (!res.ok) throw new Error("Failed to update category");

      await fetchCategories();
      setEditingCategory(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete category
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");

      await fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <PageMeta
        title="AK Fashion | Categories"
        description="Categories management page"
      />
      <PageBreadcrumb pageTitle="Categories" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Categories
          </h4>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-sm font-medium text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-lg transition w-full md:w-auto text-center"
          >
            {showAddForm ? "Cancel" : "+ Add Category"}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <form
              onSubmit={handleAddSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-grow">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
               
                <th className="px-4 py-3 text-left">Category Name</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {editingCategory === category._id ? (
                      <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        autoFocus
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex justify-end space-x-2">
                      {editingCategory === category._id ? (
                        <>
                          <button
                            onClick={() => handleEditSubmit(category._id)}
                            className="px-2 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCategory(null)}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingCategory(category._id);
                              setEditCategoryName(category.name);
                            }}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                          >
                            <PencilIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                          >
                            <TrashBinIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
