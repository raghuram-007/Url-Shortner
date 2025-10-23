import { useState, useEffect } from "react";
import axios from "axios";
import URLForm from "./components/URLForm";
import URLCard from "./components/URLCard";
import ErrorMessage from "./components/ErrorMessage";

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [shortUrls, setShortUrls] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const fetchUrls = async (pageNum = page) => {
    try {
      const skip = (pageNum - 1) * limit;
      const res = await axios.get(`${API_BASE}/urls?skip=${skip}&limit=${limit}`);
      setShortUrls(res.data);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [page]);

  const handleShorten = async (originalUrl) => {
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/shorten`, { original_url: originalUrl });
      setShortUrls((prev) => [res.data, ...prev]);
    } catch (err) {
      setError("Failed to shorten URL");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            URL Shortener
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform long URLs into short, shareable links instantly
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <URLForm onSubmit={handleShorten} />
          {error && <ErrorMessage message={error} />}
        </div>

        {/* URLs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {shortUrls.map((url) => (
            <URLCard key={url.id} shortUrl={url} />
          ))}
        </div>

        {/* Pagination Section */}
        {shortUrls.length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              className="px-6 py-3 bg-white text-blue-600 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              ← Previous
            </button>

            <div className="bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-200">
              <span className="text-lg font-semibold text-gray-700">
                Page <span className="text-blue-600">{page}</span>
              </span>
            </div>

            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={shortUrls.length < limit}
            >
              Next →
            </button>
          </div>
        )}

        {/* Empty State */}
        {shortUrls.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-gray-100">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No URLs Yet</h3>
              <p className="text-gray-500">Shorten your first URL to get started!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;