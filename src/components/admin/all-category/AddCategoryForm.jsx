import React, { useState } from "react";
import { apiRequest, HTTP_METHODS } from "../../../utils/utils";

const AddCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await apiRequest(
        HTTP_METHODS.POST,
        "/api/categories",
        formData
      );

      if (response.code === 0) {
        setMessage("Category added successfully!");
        setFormData({
          name: "",
          description: "",
        });
      } else {
        setError("Failed to add category. Please try again.");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Add New Category</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            required
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
