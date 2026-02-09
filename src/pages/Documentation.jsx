import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/documentation.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://api-wilayah-indonesia-backend.vercel.app";

const ENDPOINTS = [
  {
    id: "provinces",
    name: "Get All Provinces",
    description:
      "Mengambil daftar semua provinsi di Indonesia. Data di-cache selama 1 jam untuk performa optimal.",
    method: "GET",
    url: "/api/v1/provinces",
    params: [],
    requestBody: null,
    responseExample: {
      data: [
        { prov_id: 1, prov_name: "ACEH" },
        { prov_id: 12, prov_name: "JAWA BARAT" },
        { prov_id: 13, prov_name: "JAWA TENGAH" },
      ],
      meta: { count: 38, timestamp: "2024-01-01T00:00:00.000Z" },
      error: null,
    },
    codeExamples: {
      curl: `curl -X GET "${API_BASE}/api/v1/provinces" \\
  -H "Content-Type: application/json"`,
      javascript: `fetch("${API_BASE}/api/v1/provinces")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${API_BASE}/api/v1/provinces");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);`,
      nodejs: `const axios = require('axios');

axios.get('${API_BASE}/api/v1/provinces')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });`,
      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${API_BASE}/api/v1/provinces"))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      golang: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, err := http.Get("${API_BASE}/api/v1/provinces")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      python: `import requests

response = requests.get("${API_BASE}/api/v1/provinces")
data = response.json()
print(data)`,
    },
  },
  {
    id: "cities",
    name: "Get Cities by Province",
    description:
      "Mengambil daftar kota/kabupaten dalam provinsi tertentu berdasarkan Province ID.",
    method: "GET",
    url: "/api/v1/provinces/:provId/cities",
    params: [
      {
        name: "provId",
        type: "integer",
        required: true,
        description: "ID provinsi (contoh: 12 untuk Jawa Barat)",
      },
    ],
    requestBody: null,
    responseExample: {
      data: [
        { city_id: 161, city_name: "BANDUNG" },
        { city_id: 172, city_name: "BEKASI" },
        { city_id: 171, city_name: "BOGOR" },
      ],
      meta: { count: 27, provId: 12, timestamp: "2024-01-01T00:00:00.000Z" },
      error: null,
    },
    codeExamples: {
      curl: `curl -X GET "${API_BASE}/api/v1/provinces/12/cities" \\
  -H "Content-Type: application/json"`,
      javascript: `const provId = 12; // Jawa Barat

fetch(\`${API_BASE}/api/v1/provinces/\${provId}/cities\`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`,
      php: `<?php
$provId = 12; // Jawa Barat

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${API_BASE}/api/v1/provinces/{$provId}/cities");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);`,
      nodejs: `const axios = require('axios');

const provId = 12; // Jawa Barat

axios.get(\`${API_BASE}/api/v1/provinces/\${provId}/cities\`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });`,
      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

int provId = 12; // Jawa Barat

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${API_BASE}/api/v1/provinces/" + provId + "/cities"))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      golang: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    provId := 12 // Jawa Barat
    url := fmt.Sprintf("${API_BASE}/api/v1/provinces/%d/cities", provId)

    resp, err := http.Get(url)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      python: `import requests

prov_id = 12  # Jawa Barat
response = requests.get(f"${API_BASE}/api/v1/provinces/{prov_id}/cities")
data = response.json()
print(data)`,
    },
  },
  {
    id: "districts",
    name: "Get Districts by City",
    description:
      "Mengambil daftar kecamatan dalam kota/kabupaten tertentu berdasarkan City ID.",
    method: "GET",
    url: "/api/v1/cities/:cityId/districts",
    params: [
      {
        name: "cityId",
        type: "integer",
        required: true,
        description: "ID kota/kabupaten (contoh: 161 untuk Bandung)",
      },
    ],
    requestBody: null,
    responseExample: {
      data: [
        { dis_id: 2460, dis_name: "COBLONG" },
        { dis_id: 2179, dis_name: "SUKASARI" },
        { dis_id: 2180, dis_name: "CIDADAP" },
      ],
      meta: { count: 30, cityId: 161, timestamp: "2024-01-01T00:00:00.000Z" },
      error: null,
    },
    codeExamples: {
      curl: `curl -X GET "${API_BASE}/api/v1/cities/161/districts" \\
  -H "Content-Type: application/json"`,
      javascript: `const cityId = 161; // Bandung

fetch(\`${API_BASE}/api/v1/cities/\${cityId}/districts\`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`,
      php: `<?php
$cityId = 161; // Bandung

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${API_BASE}/api/v1/cities/{$cityId}/districts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);`,
      nodejs: `const axios = require('axios');

const cityId = 161; // Bandung

axios.get(\`${API_BASE}/api/v1/cities/\${cityId}/districts\`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });`,
      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

int cityId = 161; // Bandung

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${API_BASE}/api/v1/cities/" + cityId + "/districts"))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      golang: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    cityId := 161 // Bandung
    url := fmt.Sprintf("${API_BASE}/api/v1/cities/%d/districts", cityId)

    resp, err := http.Get(url)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      python: `import requests

city_id = 161  # Bandung
response = requests.get(f"${API_BASE}/api/v1/cities/{city_id}/districts")
data = response.json()
print(data)`,
    },
  },
  {
    id: "subdistricts",
    name: "Get Subdistricts by District",
    description:
      "Mengambil daftar kelurahan/desa dalam kecamatan tertentu berdasarkan District ID.",
    method: "GET",
    url: "/api/v1/districts/:disId/subdistricts",
    params: [
      {
        name: "disId",
        type: "integer",
        required: true,
        description: "ID kecamatan (contoh: 2460 untuk Coblong)",
      },
    ],
    requestBody: null,
    responseExample: {
      data: [
        { subdis_id: 26917, subdis_name: "DAGO" },
        { subdis_id: 30589, subdis_name: "LEBAK SILIWANGI" },
        { subdis_id: 30590, subdis_name: "SEKELOA" },
      ],
      meta: { count: 6, disId: 2460, timestamp: "2024-01-01T00:00:00.000Z" },
      error: null,
    },
    codeExamples: {
      curl: `curl -X GET "${API_BASE}/api/v1/districts/2460/subdistricts" \\
  -H "Content-Type: application/json"`,
      javascript: `const disId = 2460; // Coblong

fetch(\`${API_BASE}/api/v1/districts/\${disId}/subdistricts\`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`,
      php: `<?php
$disId = 2460; // Coblong

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${API_BASE}/api/v1/districts/{$disId}/subdistricts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);`,
      nodejs: `const axios = require('axios');

const disId = 2460; // Coblong

axios.get(\`${API_BASE}/api/v1/districts/\${disId}/subdistricts\`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });`,
      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

int disId = 2460; // Coblong

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${API_BASE}/api/v1/districts/" + disId + "/subdistricts"))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      golang: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    disId := 2460 // Coblong
    url := fmt.Sprintf("${API_BASE}/api/v1/districts/%d/subdistricts", disId)

    resp, err := http.Get(url)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      python: `import requests

dis_id = 2460  # Coblong
response = requests.get(f"${API_BASE}/api/v1/districts/{dis_id}/subdistricts")
data = response.json()
print(data)`,
    },
  },
  {
    id: "postalcodes",
    name: "Get Postal Codes by Subdistrict",
    description:
      "Mengambil daftar kode pos dalam kelurahan/desa tertentu berdasarkan Subdistrict ID.",
    method: "GET",
    url: "/api/v1/subdistricts/:subdisId/postal-codes",
    params: [
      {
        name: "subdisId",
        type: "integer",
        required: true,
        description: "ID kelurahan/desa (contoh: 26917 untuk Dago)",
      },
    ],
    requestBody: null,
    responseExample: {
      data: [{ postal_code: "40135" }],
      meta: {
        count: 1,
        subdisId: 26917,
        timestamp: "2024-01-01T00:00:00.000Z",
      },
      error: null,
    },
    codeExamples: {
      curl: `curl -X GET "${API_BASE}/api/v1/subdistricts/26917/postal-codes" \\
  -H "Content-Type: application/json"`,
      javascript: `const subdisId = 26917; // Dago

fetch(\`${API_BASE}/api/v1/subdistricts/\${subdisId}/postal-codes\`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`,
      php: `<?php
$subdisId = 26917; // Dago

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${API_BASE}/api/v1/subdistricts/{$subdisId}/postal-codes");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);`,
      nodejs: `const axios = require('axios');

const subdisId = 26917; // Dago

axios.get(\`${API_BASE}/api/v1/subdistricts/\${subdisId}/postal-codes\`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });`,
      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

int subdisId = 26917; // Dago

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${API_BASE}/api/v1/subdistricts/" + subdisId + "/postal-codes"))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      golang: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    subdisId := 26917 // Dago
    url := fmt.Sprintf("${API_BASE}/api/v1/subdistricts/%d/postal-codes", subdisId)

    resp, err := http.Get(url)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      python: `import requests

subdis_id = 26917  # Dago
response = requests.get(f"${API_BASE}/api/v1/subdistricts/{subdis_id}/postal-codes")
data = response.json()
print(data)`,
    },
  },
  {
    id: "search",
    name: "Search Locations",
    description:
      "Mencari wilayah berdasarkan nama daerah atau kode pos. Mendukung pagination dan mengembalikan data lengkap dari provinsi hingga kode pos.",
    method: "GET",
    url: "/api/v1/search",
    params: [
      {
        name: "q",
        type: "string",
        required: true,
        description: "Query pencarian (minimal 2 karakter)",
      },
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Nomor halaman (default: 1)",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Jumlah hasil per halaman (default: 20, max: 100)",
      },
    ],
    requestBody: null,
    responseExample: {
      data: [
        {
          prov_id: 12,
          prov_name: "JAWA BARAT",
          city_id: 161,
          city_name: "BANDUNG",
          dis_id: 2460,
          dis_name: "COBLONG",
          subdis_id: 26917,
          subdis_name: "DAGO",
          postal_code: "40135",
        },
      ],
      meta: {
        total: 15,
        page: 1,
        limit: 20,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
        timestamp: "2024-01-01T00:00:00.000Z",
      },
      error: null,
    },
    codeExamples: {
      curl: `curl -X GET "${API_BASE}/api/v1/search?q=dago&limit=10&page=1" \\
  -H "Content-Type: application/json"`,
      javascript: `const params = new URLSearchParams({
  q: "dago",
  limit: 10,
  page: 1
});

fetch(\`${API_BASE}/api/v1/search?\${params}\`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`,
      php: `<?php
$params = http_build_query([
    'q' => 'dago',
    'limit' => 10,
    'page' => 1
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${API_BASE}/api/v1/search?" . $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);`,
      nodejs: `const axios = require('axios');

axios.get('${API_BASE}/api/v1/search', {
  params: {
    q: 'dago',
    limit: 10,
    page: 1
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error.message);
});`,
      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

String query = URLEncoder.encode("dago", StandardCharsets.UTF_8);
String url = "${API_BASE}/api/v1/search?q=" + query + "&limit=10&page=1";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      golang: `package main

import (
    "fmt"
    "io"
    "net/http"
    "net/url"
)

func main() {
    baseURL := "${API_BASE}/api/v1/search"
    params := url.Values{}
    params.Add("q", "dago")
    params.Add("limit", "10")
    params.Add("page", "1")

    resp, err := http.Get(baseURL + "?" + params.Encode())
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      python: `import requests

params = {
    "q": "dago",
    "limit": 10,
    "page": 1
}
response = requests.get("${API_BASE}/api/v1/search", params=params)
data = response.json()
print(data)`,
    },
  },
  {
    id: "health",
    name: "Health Check",
    description:
      "Mengecek status kesehatan API. Gunakan endpoint ini untuk monitoring uptime dan status server.",
    method: "GET",
    url: "/api/v1/health",
    params: [],
    requestBody: null,
    responseExample: {
      data: {
        status: "healthy",
        uptime: 3600.123,
        timestamp: "2024-01-01T00:00:00.000Z",
      },
      meta: {},
      error: null,
    },
    codeExamples: {
      curl: `curl -X GET "${API_BASE}/api/v1/health"`,
      javascript: `fetch("${API_BASE}/api/v1/health")
  .then(response => response.json())
  .then(data => console.log(data.data.status))
  .catch(error => console.error("Error:", error));`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${API_BASE}/api/v1/health");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
echo "Status: " . $data['data']['status'];`,
      nodejs: `const axios = require('axios');

axios.get('${API_BASE}/api/v1/health')
  .then(response => {
    console.log('Status:', response.data.data.status);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });`,
      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${API_BASE}/api/v1/health"))
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      golang: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, err := http.Get("${API_BASE}/api/v1/health")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
      python: `import requests

response = requests.get("${API_BASE}/api/v1/health")
data = response.json()
print(f"Status: {data['data']['status']}")`,
    },
  },
];

const ERROR_CODES = [
  { code: 200, status: "OK", description: "Request berhasil" },
  {
    code: 400,
    status: "Bad Request",
    description: "Parameter tidak valid atau query terlalu pendek",
  },
  { code: 404, status: "Not Found", description: "Data tidak ditemukan" },
  {
    code: 429,
    status: "Too Many Requests",
    description: "Rate limit terlampaui. Tunggu beberapa saat.",
  },
  {
    code: 500,
    status: "Internal Server Error",
    description: "Kesalahan server internal",
  },
];

export function Documentation() {
  const [activeEndpoint, setActiveEndpoint] = useState("provinces");
  const [activeCodeLang, setActiveCodeLang] = useState("curl");
  const [copiedCode, setCopiedCode] = useState(false);

  const currentEndpoint = ENDPOINTS.find((e) => e.id === activeEndpoint);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="docs-page">
      {/* Sidebar */}
      <aside className="docs-sidebar">
        <div className="docs-sidebar-header">
          <a href="/" className="docs-logo">
            🇮🇩 API Wilayah
          </a>
          <span className="docs-version">v1.0.0</span>
        </div>

        <nav className="docs-nav">
          <div className="docs-nav-section">
            <h3>Getting Started</h3>
            <a href="#introduction" className="docs-nav-link">
              Introduction
            </a>
            <a href="#base-url" className="docs-nav-link">
              Base URL
            </a>
            <a href="#authentication" className="docs-nav-link">
              Authentication
            </a>
            <a href="#rate-limiting" className="docs-nav-link">
              Rate Limiting
            </a>
          </div>

          <div className="docs-nav-section">
            <h3>Endpoints</h3>
            {ENDPOINTS.map((ep) => (
              <button
                key={ep.id}
                className={`docs-nav-link ${activeEndpoint === ep.id ? "active" : ""}`}
                onClick={() => setActiveEndpoint(ep.id)}
              >
                <span
                  className={`method-badge method-${ep.method.toLowerCase()}`}
                >
                  {ep.method}
                </span>
                {ep.name}
              </button>
            ))}
          </div>

          <div className="docs-nav-section">
            <h3>Reference</h3>
            <a href="#error-codes" className="docs-nav-link">
              Error Codes
            </a>
            <a href="#data-structure" className="docs-nav-link">
              Data Structure
            </a>
          </div>
        </nav>

        <div className="docs-sidebar-footer">
          <Link to="/" className="back-to-app">
            ← Kembali ke App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="docs-main">
        {/* Introduction Section */}
        <section id="introduction" className="docs-section">
          <h1>API Wilayah Indonesia</h1>
          <p className="docs-intro">
            REST API lengkap untuk data wilayah administratif Indonesia.
            Menyediakan akses ke data Provinsi, Kota/Kabupaten, Kecamatan,
            Kelurahan/Desa, dan Kode Pos.
          </p>

          <div className="docs-stats-grid">
            <div className="docs-stat">
              <span className="docs-stat-value">38</span>
              <span className="docs-stat-label">Provinsi</span>
            </div>
            <div className="docs-stat">
              <span className="docs-stat-value">514</span>
              <span className="docs-stat-label">Kota/Kab</span>
            </div>
            <div className="docs-stat">
              <span className="docs-stat-value">7,277</span>
              <span className="docs-stat-label">Kecamatan</span>
            </div>
            <div className="docs-stat">
              <span className="docs-stat-value">83,931</span>
              <span className="docs-stat-label">Kelurahan</span>
            </div>
          </div>
        </section>

        {/* Base URL */}
        <section id="base-url" className="docs-section">
          <h2>Base URL</h2>
          <div className="docs-info-box">
            <div className="docs-info-row">
              <span className="docs-info-label">Development</span>
              <code className="docs-info-value">{API_BASE}</code>
            </div>
            <div className="docs-info-row">
              <span className="docs-info-label">Content-Type</span>
              <code className="docs-info-value">application/json</code>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section id="authentication" className="docs-section">
          <h2>Authentication</h2>
          <p>
            API ini bersifat <strong>public</strong> dan tidak memerlukan
            authentication. Semua endpoint dapat diakses langsung tanpa API key.
          </p>
        </section>

        {/* Rate Limiting */}
        <section id="rate-limiting" className="docs-section">
          <h2>Rate Limiting</h2>
          <p>Untuk mencegah penyalahgunaan, API menerapkan rate limiting:</p>
          <div className="docs-info-box">
            <div className="docs-info-row">
              <span className="docs-info-label">General Endpoints</span>
              <code className="docs-info-value">100 requests / 15 menit</code>
            </div>
            <div className="docs-info-row">
              <span className="docs-info-label">Search Endpoint</span>
              <code className="docs-info-value">20 requests / menit</code>
            </div>
          </div>
        </section>

        {/* Current Endpoint Detail */}
        {currentEndpoint && (
          <section
            id={currentEndpoint.id}
            className="docs-section docs-endpoint-detail"
          >
            <div className="docs-endpoint-header">
              <span
                className={`method-badge-lg method-${currentEndpoint.method.toLowerCase()}`}
              >
                {currentEndpoint.method}
              </span>
              <h2>{currentEndpoint.name}</h2>
            </div>

            <p className="docs-endpoint-desc">{currentEndpoint.description}</p>

            {/* API Info Table */}
            <div className="docs-table-wrapper">
              <table className="docs-table">
                <tbody>
                  <tr>
                    <th>API Name</th>
                    <td>{currentEndpoint.name}</td>
                  </tr>
                  <tr>
                    <th>Deskripsi</th>
                    <td>{currentEndpoint.description}</td>
                  </tr>
                  <tr>
                    <th>Request URL</th>
                    <td>
                      <code>
                        {API_BASE}
                        {currentEndpoint.url}
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <th>Method</th>
                    <td>
                      <span
                        className={`method-badge method-${currentEndpoint.method.toLowerCase()}`}
                      >
                        {currentEndpoint.method}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Content-Type</th>
                    <td>
                      <code>application/json</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Parameters */}
            {currentEndpoint.params.length > 0 && (
              <div className="docs-params">
                <h3>Parameters</h3>
                <div className="docs-table-wrapper">
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Tipe</th>
                        <th>Required</th>
                        <th>Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEndpoint.params.map((param) => (
                        <tr key={param.name}>
                          <td>
                            <code>{param.name}</code>
                          </td>
                          <td>
                            <span className="type-badge">{param.type}</span>
                          </td>
                          <td>
                            <span
                              className={`required-badge ${param.required ? "yes" : "no"}`}
                            >
                              {param.required ? "Ya" : "Tidak"}
                            </span>
                          </td>
                          <td>{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Code Examples */}
            <div className="docs-code-section">
              <div className="docs-code-header">
                <h3>Contoh Request</h3>
                <div className="docs-code-tabs">
                  {[
                    "curl",
                    "javascript",
                    "php",
                    "nodejs",
                    "java",
                    "golang",
                    "python",
                  ].map((lang) => (
                    <button
                      key={lang}
                      className={`docs-code-tab ${activeCodeLang === lang ? "active" : ""}`}
                      onClick={() => setActiveCodeLang(lang)}
                    >
                      {
                        {
                          curl: "cURL",
                          javascript: "JavaScript",
                          php: "PHP",
                          nodejs: "Node.js",
                          java: "Java",
                          golang: "Go",
                          python: "Python",
                        }[lang]
                      }
                    </button>
                  ))}
                </div>
              </div>
              <div className="docs-code-block">
                <button
                  className="docs-copy-btn"
                  onClick={() =>
                    copyToClipboard(
                      currentEndpoint.codeExamples[activeCodeLang],
                    )
                  }
                >
                  {copiedCode ? "✓ Copied!" : "Copy"}
                </button>
                <pre>
                  <code>{currentEndpoint.codeExamples[activeCodeLang]}</code>
                </pre>
              </div>
            </div>

            {/* Response */}
            <div className="docs-response-section">
              <h3>Response</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>HTTP Code</th>
                      <th>Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="status-badge success">200</span>
                      </td>
                      <td>Request berhasil</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="status-badge error">404</span>
                      </td>
                      <td>Data tidak ditemukan</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4>Response Body (200 OK)</h4>
              <div className="docs-code-block">
                <button
                  className="docs-copy-btn"
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(currentEndpoint.responseExample, null, 2),
                    )
                  }
                >
                  {copiedCode ? "✓ Copied!" : "Copy"}
                </button>
                <pre>
                  <code>
                    {JSON.stringify(currentEndpoint.responseExample, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* Error Codes */}
        <section id="error-codes" className="docs-section">
          <h2>Error Codes</h2>
          <p>Daftar kode error yang mungkin dikembalikan oleh API:</p>
          <div className="docs-table-wrapper">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>HTTP Code</th>
                  <th>Status</th>
                  <th>Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {ERROR_CODES.map((err) => (
                  <tr key={err.code}>
                    <td>
                      <span
                        className={`status-badge ${err.code < 400 ? "success" : "error"}`}
                      >
                        {err.code}
                      </span>
                    </td>
                    <td>{err.status}</td>
                    <td>{err.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4>Error Response Format</h4>
          <div className="docs-code-block">
            <pre>
              <code>
                {JSON.stringify(
                  {
                    data: null,
                    meta: { timestamp: "2024-01-01T00:00:00.000Z" },
                    error: {
                      message: "Province not found",
                      code: "NOT_FOUND",
                      details: {},
                    },
                  },
                  null,
                  2,
                )}
              </code>
            </pre>
          </div>
        </section>

        {/* Data Structure */}
        <section id="data-structure" className="docs-section">
          <h2>Data Structure</h2>
          <p>Struktur hierarki data wilayah Indonesia:</p>

          <div className="docs-hierarchy">
            <div className="hierarchy-item level-1">
              <span className="hierarchy-icon">🏛️</span>
              <div className="hierarchy-content">
                <strong>Provinsi</strong>
                <code>prov_id, prov_name</code>
              </div>
            </div>
            <div className="hierarchy-item level-2">
              <span className="hierarchy-icon">🏙️</span>
              <div className="hierarchy-content">
                <strong>Kota/Kabupaten</strong>
                <code>city_id, city_name</code>
              </div>
            </div>
            <div className="hierarchy-item level-3">
              <span className="hierarchy-icon">🏘️</span>
              <div className="hierarchy-content">
                <strong>Kecamatan</strong>
                <code>dis_id, dis_name</code>
              </div>
            </div>
            <div className="hierarchy-item level-4">
              <span className="hierarchy-icon">🏠</span>
              <div className="hierarchy-content">
                <strong>Kelurahan/Desa</strong>
                <code>subdis_id, subdis_name</code>
              </div>
            </div>
            <div className="hierarchy-item level-5">
              <span className="hierarchy-icon">📮</span>
              <div className="hierarchy-content">
                <strong>Kode Pos</strong>
                <code>postal_code</code>
              </div>
            </div>
          </div>

          <h4>Standard Response Format</h4>
          <div className="docs-code-block">
            <pre>
              <code>
                {JSON.stringify(
                  {
                    data: "Array atau Object hasil",
                    meta: {
                      count: "Jumlah item",
                      total: "Total item (pagination)",
                      page: "Halaman saat ini",
                      limit: "Item per halaman",
                      totalPages: "Total halaman",
                      hasNextPage: "boolean",
                      hasPrevPage: "boolean",
                      timestamp: "ISO 8601 datetime",
                    },
                    error: "null jika sukses, object jika error",
                  },
                  null,
                  2,
                )}
              </code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Documentation;
