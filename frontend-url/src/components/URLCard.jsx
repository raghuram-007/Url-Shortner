const BACKEND_BASE = "http://127.0.0.1:8000";

export default function URLCard({ shortUrl }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${BACKEND_BASE}/${shortUrl.short_url}`);
    alert("Copied to clipboard!");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const id = shortUrl.id || Math.random();
  const clicks = shortUrl.clicks ?? 0;
  const created_at = shortUrl.created_at || new Date().toISOString();
  const last_accessed = shortUrl.last_accessed || null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 transform hover:-translate-y-1 w-96 max-w-full">
      {/* Header with gradient border */}
      <div className="border-b border-gradient-to-r from-blue-50 to-purple-50 pb-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Short URL Created
        </h3>
      </div>

      {/* Short URL section - Fixed to show full URL */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2 font-medium">Your Short URL</p>
        <div className="flex flex-col gap-3">
          {/* Full URL display with copy functionality */}
          <div className="relative group">
            <div className="bg-gray-50 rounded-lg p-3 pr-20 border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <a
                href={`${BACKEND_BASE}/${shortUrl.short_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all block hover:underline"
              >
                {`${BACKEND_BASE}/${shortUrl.short_url}`}
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center gap-2 text-xs"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Only Clicks now */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow duration-200">
          <div className="text-2xl font-bold text-blue-600">{clicks}</div>
          <div className="text-sm text-gray-600 font-medium">Total Clicks</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <span className="text-gray-600 font-medium">Created</span>
          <span className="text-gray-800 font-semibold text-xs">{formatDate(created_at)}</span>
        </div>
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <span className="text-gray-600 font-medium">Last Accessed</span>
          <span className="text-gray-800 font-semibold text-xs">{formatDate(last_accessed)}</span>
        </div>
      </div>

      {/* Footer - Simplified */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          URL..
        </div>
      </div>
    </div>
  );
}