import React, { useState, useEffect } from "react";
import { productsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext"; // ADD THIS IMPORT
import SearchFilter from "../components/SearchFilter";
import ImportExport from "../components/ImportExport";
import ProductTable from "../components/ProductTable";
import InventoryHistory from "../components/InventoryHistory";
import AddProductModal from "../components/AddProductModal"; // ADD THIS IMPORT

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); //

  const { user, logout } = useAuth(); // logout

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, categoryFilter, pagination.current, pagination.limit]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        category: categoryFilter,
        page: pagination.current,
        limit: pagination.limit,
      };

      const response = await productsAPI.getAll(params);
      setProducts(response.data.products);
      setPagination((prev) => ({
        ...prev,
        ...response.data.pagination,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleFilter = (category) => {
    setCategoryFilter(category);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current: newPage }));
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
    setSelectedProduct(null);
  };

  // ADD THESE FUNCTIONS:
  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleProductAdded = () => {
    fetchProducts(); // Refresh the product list
    // The modal will be closed by the AddProductModal component
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/*
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your product inventory efficiently
          </p>
        </div>
        */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Inventory Management
            </h1>
            <p className="mt-2 text-gray-600">Welcome, {user?.username}!</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        {/* Import/Export Section */}
        <ImportExport onImportComplete={fetchProducts} />

        {/* Search and Filter Section */}
        <SearchFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          onAddProduct={handleAddProduct} // UPDATE THIS PROP
        />

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <ProductTable
                products={products}
                onProductUpdate={fetchProducts}
                onProductDelete={fetchProducts}
                onSelectProduct={handleSelectProduct}
              />

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t">
                  <div className="text-sm text-gray-700">
                    Showing {(pagination.current - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.current * pagination.limit,
                      pagination.total
                    )}{" "}
                    of {pagination.total} results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.current - 1)}
                      disabled={pagination.current === 1}
                      className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    {Array.from(
                      { length: pagination.pages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded-md text-sm font-medium ${
                          pagination.current === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(pagination.current + 1)}
                      disabled={pagination.current === pagination.pages}
                      className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Inventory History Sidebar */}
      <InventoryHistory
        product={selectedProduct}
        isOpen={showHistory}
        onClose={handleCloseHistory}
      />

      {/* Add Product Modal - ADD THIS COMPONENT */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={handleCloseAddModal}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default ProductsPage;
