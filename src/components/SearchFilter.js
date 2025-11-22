import React, { useState, useEffect } from "react";
import { productsAPI } from "../services/api";

const SearchFilter = ({ onSearch, onFilter, onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await productsAPI.getCategories();
        console.log("Categories API Response:", response); // Debug log

        // Handle different response structures
        let categoriesData = [];

        if (Array.isArray(response.data)) {
          // Case 1: response.data is already an array
          categoriesData = response.data;
        } else if (response.data && typeof response.data === "object") {
          // Case 2: response.data is an object, try to extract array
          categoriesData = Object.values(response.data);
        } else if (Array.isArray(response)) {
          // Case 3: response itself is an array (unlikely)
          categoriesData = response;
        } else {
          console.warn("Unexpected API response format:", response);
        }

        // Ensure we have an array and filter out any null/undefined values
        categoriesData = Array.isArray(categoriesData)
          ? categoriesData.filter((cat) => cat != null && cat !== "")
          : [];

        console.log("Processed categories:", categoriesData); // Debug log
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        console.error("Error details:", error.response?.data);
        setCategories([]); // Set empty array as fallback
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter(value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    onSearch("");
    onFilter("");
  };

  // Safe rendering of categories
  const renderCategories = () => {
    if (!Array.isArray(categories)) {
      console.error("Categories is not an array:", categories);
      return <option value="">Error loading categories</option>;
    }

    if (categories.length === 0) {
      return <option value="">No categories available</option>;
    }

    return categories.map((category, index) => (
      <option key={category || index} value={category}>
        {category}
      </option>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-48">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              disabled={loadingCategories}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">
                {loadingCategories ? "Loading categories..." : "All Categories"}
              </option>
              {renderCategories()}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory) && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clear
            </button>
          )}
        </div>

        {/* Add Product Button */}
        <div className="md:ml-4">
          <button
            onClick={onAddProduct}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
