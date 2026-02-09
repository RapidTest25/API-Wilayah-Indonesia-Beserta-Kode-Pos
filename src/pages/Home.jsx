import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationPicker from "../components/LocationPicker";
import SearchBox from "../components/SearchBox";
import { ResultCard, SearchResultCard } from "../components/ResultCard";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ENDPOINTS = [
  { method: "GET", path: "/api/v1/provinces", desc: "Daftar semua provinsi" },
  {
    method: "GET",
    path: "/api/v1/provinces/:id/cities",
    desc: "Kota dalam provinsi",
  },
  {
    method: "GET",
    path: "/api/v1/cities/:id/districts",
    desc: "Kecamatan dalam kota",
  },
  {
    method: "GET",
    path: "/api/v1/districts/:id/subdistricts",
    desc: "Kelurahan dalam kecamatan",
  },
  {
    method: "GET",
    path: "/api/v1/subdistricts/:id/postal-codes",
    desc: "Kode pos dalam kelurahan",
  },
  {
    method: "GET",
    path: "/api/v1/search?q=nama",
    desc: "Cari wilayah dengan keyword",
  },
];

export function Home() {
  const [dropdownSelection, setDropdownSelection] = useState(null);
  const [searchSelection, setSearchSelection] = useState(null);
  const [stats, setStats] = useState({
    provinces: 38,
    cities: 514,
    districts: 7277,
    subdistricts: 83931,
    postalCodes: 81250,
  });

  const handleDropdownComplete = useCallback((selection) => {
    setDropdownSelection(selection);
  }, []);

  const handleSearchSelect = useCallback((result) => {
    setSearchSelection(result);
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-badge">
          <span className="dot"></span>
          API Online • v1.0.0
        </div>
        <h1>🇮🇩 API Wilayah Indonesia</h1>
        <p className="header-subtitle">
          REST API lengkap untuk data wilayah Indonesia dari Provinsi hingga
          Kode Pos dengan Redis caching dan Clean Architecture
        </p>
      </header>

      {/* Stats Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏛️</div>
          <div className="stat-value">{stats.provinces}</div>
          <div className="stat-label">Provinsi</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏙️</div>
          <div className="stat-value">{stats.cities}</div>
          <div className="stat-label">Kota/Kabupaten</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏘️</div>
          <div className="stat-value">{stats.districts.toLocaleString()}</div>
          <div className="stat-label">Kecamatan</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-value">
            {stats.subdistricts.toLocaleString()}
          </div>
          <div className="stat-label">Kelurahan/Desa</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📮</div>
          <div className="stat-value">{stats.postalCodes.toLocaleString()}</div>
          <div className="stat-label">Data Kode Pos</div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Dropdown Picker Card */}
        <section className="card">
          <div className="card-header">
            <div className="card-icon">📋</div>
            <div>
              <h2 className="card-title">Pilih Wilayah</h2>
              <p className="card-subtitle">
                Navigasi bertingkat dari Provinsi ke Kode Pos
              </p>
            </div>
          </div>
          <LocationPicker onSelectionComplete={handleDropdownComplete} />
          {dropdownSelection && <ResultCard selection={dropdownSelection} />}
        </section>

        {/* Search Card */}
        <section className="card">
          <div className="card-header">
            <div className="card-icon">🔍</div>
            <div>
              <h2 className="card-title">Cari Wilayah</h2>
              <p className="card-subtitle">
                Pencarian cepat dengan full-text search
              </p>
            </div>
          </div>
          <SearchBox onResultSelect={handleSearchSelect} />
          {searchSelection && <SearchResultCard result={searchSelection} />}
        </section>
      </div>

      {/* API Endpoints Section */}
      <section className="card full-width">
        <div className="card-header">
          <div className="card-icon">⚡</div>
          <div>
            <h2 className="card-title">API Endpoints</h2>
            <p className="card-subtitle">
              Semua endpoint yang tersedia untuk integrasi
            </p>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="feature-tags">
          <span className="feature-tag">✓ RESTful API</span>
          <span className="feature-tag">✓ Redis Caching</span>
          <span className="feature-tag">✓ Rate Limiting</span>
          <span className="feature-tag">✓ Pagination</span>
          <span className="feature-tag">✓ Clean Architecture</span>
          <span className="feature-tag">✓ OpenAPI/Swagger</span>
        </div>

        <div className="api-info-grid">
          {ENDPOINTS.map((ep, idx) => (
            <div className="endpoint-card" key={idx}>
              <span className="endpoint-method">{ep.method}</span>
              <div className="endpoint-path">{ep.path}</div>
              <p className="endpoint-desc">{ep.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dokumentasi API Section */}
      <section className="card full-width">
        <div className="docs-section">
          <div className="card-header" style={{ justifyContent: "center" }}>
            <div className="card-icon">📚</div>
            <div>
              <h2 className="card-title">Dokumentasi API Lengkap</h2>
              <p className="card-subtitle">
                Panduan lengkap dengan contoh kode
              </p>
            </div>
          </div>
          <p>
            Akses dokumentasi lengkap dengan contoh request/response dalam
            berbagai bahasa pemrograman (cURL, JavaScript, Python)
          </p>
          <Link to="/docs" className="docs-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Lihat Dokumentasi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>API Wilayah Indonesia — RapidTest</p>
        <div className="footer-links">
          <Link to="/docs">API Docs</Link>
          <a
            href={`${API_BASE}/docs/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Swagger UI
          </a>
          <a
            href={`${API_BASE}/api-docs.json`}
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAPI JSON
          </a>
          <a
            href={`${API_BASE}/api/v1/health`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Health Check
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
