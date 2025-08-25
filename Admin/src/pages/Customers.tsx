import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { NavLink } from "react-router";
import { EyeIcon, FilterIcon } from "../icons";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  status: string;
  lastOrder: string;
}

export default function Products() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    minOrders: '',
    maxOrders: '',
    startDate: '',
    endDate: ''
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 30;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/customers`)
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredCustomers = customers.filter(customer => {
    const customerCity = customer.location.split(',')[0].trim().toLowerCase();

    return (
      (filters.name === '' || customer.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.email === '' || customer.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.phone === '' || customer.phone.includes(filters.phone)) &&
      (filters.city === '' || customerCity.includes(filters.city.toLowerCase())) &&
      (filters.minOrders === '' || customer.orders >= parseInt(filters.minOrders)) &&
      (filters.maxOrders === '' || customer.orders <= parseInt(filters.maxOrders)) &&
      (filters.startDate === '' || new Date(customer.lastOrder) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(customer.lastOrder) <= new Date(filters.endDate))
    );
  });

  // Pagination calculations
  const indexOfLastProduct = currentPage * customersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      email: '',
      phone: '',
      city: '',
      minOrders: '',
      maxOrders: '',
      startDate: '',
      endDate: ''
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <PageMeta
        title="AK Fashion | Customer"
        description="Customer management page"
      />
      <PageBreadcrumb pageTitle="Customers" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-full">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FilterIcon className="w-4 h-4" />
              {showFilters ? 'Filter' : 'Filter'}
            </button>
          </div>

          {showFilters && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input type="text" name="name" value={filters.name} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Filter by name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="text" name="email" value={filters.email} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Filter by email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input type="text" name="phone" value={filters.phone} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Filter by phone" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input type="text" name="city" value={filters.city} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Filter by city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Orders</label>
                  <input type="number" name="minOrders" value={filters.minOrders} onChange={handleFilterChange} min="0" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Minimum orders" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Orders</label>
                  <input type="number" name="maxOrders" value={filters.maxOrders} onChange={handleFilterChange} min="0" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Maximum orders" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
                  <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
                  <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="flex items-end gap-2">
                  <button onClick={resetFilters} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"> Name </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"> Email </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"> Phone </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"> Location </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"> Orders </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"> Last Order </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"> Actions </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.lastOrder}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-center">
                       <NavLink
  to={`/customers/form/${customer.id}`}
  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
>
  <EyeIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />
</NavLink>
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
              <span className="font-medium">{Math.min(indexOfLastProduct, filteredCustomers.length)}</span> of{" "}
              <span className="font-medium">{filteredCustomers.length}</span> customers
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
