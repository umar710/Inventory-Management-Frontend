import React, { useState, useEffect } from "react";
import { productsAPI } from "../services/api";

const InventoryHistory = ({ product, isOpen, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      fetchHistory();
    }
  }, [product, isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getHistory(product.id);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("Error loading inventory history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getChangeType = (oldQty, newQty) => {
    if (newQty > oldQty) {
      return { type: "increase", text: "Stock Increased" };
    } else if (newQty < oldQty) {
      return { type: "decrease", text: "Stock Decreased" };
    }
    return { type: "no-change", text: "No Change" };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Inventory History - {product?.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No inventory history available for this product.
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((record) => {
                const changeType = getChangeType(
                  record.old_quantity,
                  record.new_quantity
                );
                return (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            changeType.type === "increase"
                              ? "bg-green-500"
                              : changeType.type === "decrease"
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {changeType.text}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        From {record.old_quantity} to {record.new_quantity}{" "}
                        units
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(record.change_date)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryHistory;
