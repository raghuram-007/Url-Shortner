import { useState } from "react";

export default function URLForm({ onSubmit }) {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(originalUrl);
    setOriginalUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl">
      <div className="flex-1">
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg hover:border-gray-300 hover:shadow-md"
          required
        />
      </div>
      <button 
        type="submit" 
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold text-lg whitespace-nowrap"
      >
        Shorten URL
      </button>
    </form>
  );
}