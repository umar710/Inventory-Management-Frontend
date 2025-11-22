import React, { useRef, useState } from "react";
import { importExportAPI } from "../services/api";

const ImportExport = ({ onImportComplete }) => {
  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await importExportAPI.import(formData);
      setImportResult(response.data);
      onImportComplete();
      alert("Import completed successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Import failed";
      alert("Import failed: " + errorMsg);
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await importExportAPI.export();

      // Create blob and download
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `products_export_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert("Export completed successfully! File downloaded.");
    } catch (error) {
      console.error("Export error:", error);

      let errorMessage = "Export failed: ";
      if (error.response) {
        // Server responded with error status
        errorMessage += `Server error (${error.response.status})`;
        if (error.response.status === 404) {
          errorMessage +=
            " - Export endpoint not found. Please check backend server.";
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage += "No response from server. Check if backend is running.";
      } else {
        // Something else happened
        errorMessage += error.message;
      }

      alert(errorMessage);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Import Section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Import Products
          </h3>
          <div className="flex space-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".csv"
              className="hidden"
            />
            <button
              onClick={handleImportClick}
              disabled={importing}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {importing ? "Importing..." : "Import CSV"}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Upload a CSV file with columns: Name, Unit, Category, Brand, Stock
          </p>
        </div>

        {/* Export Section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Export Products
          </h3>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {exporting ? "Exporting..." : "Export to CSV"}
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Download all products as a CSV file
          </p>
        </div>
      </div>

      {/* Import Results */}
      {importResult && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Import Summary:</h4>
          <p>Total: {importResult.summary.total}</p>
          <p>Added: {importResult.summary.added}</p>
          <p>Skipped: {importResult.summary.skipped}</p>
          {importResult.summary.errors.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold">Errors:</p>
              <ul className="text-sm text-red-600">
                {importResult.summary.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImportExport;
