import { useState, useCallback } from "react";
import locationsApi from "../api/locationsApi";

export function SearchBox({ onResultSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useCallback(
    async (page = 1) => {
      if (query.trim().length < 2) {
        setError("Masukkan minimal 2 karakter untuk pencarian");
        return;
      }

      setLoading(true);
      setError(null);
      setCurrentPage(page);

      try {
        const result = await locationsApi.search(query.trim(), page, 10);
        setResults(result.data);
        setMeta(result.meta);
      } catch (err) {
        setError(err.message);
        setResults([]);
        setMeta(null);
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(1);
  };

  const handleResultClick = (result) => {
    onResultSelect?.(result);
  };

  const handleNextPage = () => {
    if (meta?.hasNextPage) {
      handleSearch(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (meta?.hasPrevPage) {
      handleSearch(currentPage - 1);
    }
  };

  const clearResults = () => {
    setResults([]);
    setMeta(null);
    setQuery("");
    setError(null);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-box">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Cari nama daerah, kelurahan, atau kode pos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || query.trim().length < 2}>
          {loading ? "Mencari..." : "Cari"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {results.length > 0 && (
        <div className="search-results">
          <div className="search-results-header">
            <h4>Hasil Pencarian</h4>
            <span>
              {meta?.total || 0} hasil ditemukan
              <button className="clear-btn" onClick={clearResults}>
                Hapus
              </button>
            </span>
          </div>

          {results.map((result, index) => (
            <div
              key={`${result.subdis_id}-${result.postal_code}-${index}`}
              className="search-result-item"
              onClick={() => handleResultClick(result)}
            >
              <h5>{result.subdis_name}</h5>
              <p className="path-text">
                {result.prov_name} → {result.city_name} → {result.dis_name}
              </p>
              <span className="postal">{result.postal_code}</span>
            </div>
          ))}

          {meta && meta.totalPages > 1 && (
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={!meta.hasPrevPage || loading}>
                ← Sebelumnya
              </button>
              <span>Halaman {meta.page} dari {meta.totalPages}</span>
              <button onClick={handleNextPage} disabled={!meta.hasNextPage || loading}>
                Selanjutnya →
              </button>
            </div>
          )}
        </div>
      )}

      {loading && <div className="loading-spinner"></div>}
    </div>
  );
}

export default SearchBox;
