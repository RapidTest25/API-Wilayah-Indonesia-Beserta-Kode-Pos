# 🇮🇩 API Wilayah Indonesia

REST API lengkap untuk data wilayah administratif Indonesia mulai dari **Provinsi → Kota/Kabupaten → Kecamatan → Kelurahan/Desa → Kode Pos**.

---

## 📸 Screenshots

![Homepage](public/img/1.png)

![API Documentation](public/img/2.png)

---

## 📊 Data Statistics

| Data           | Jumlah |
| -------------- | ------ |
| Provinsi       | 38     |
| Kota/Kabupaten | 514    |
| Kecamatan      | 7,277  |
| Kelurahan/Desa | 83,931 |
| Kode Pos       | 81,250 |

---

## 📡 API Endpoints

### Base URL

```
https://your-api-domain.com/api/v1
```

### Endpoints Overview

| Method | Endpoint                               | Deskripsi                      |
| ------ | -------------------------------------- | ------------------------------ |
| GET    | `/provinces`                           | Daftar semua provinsi          |
| GET    | `/provinces/:provId/cities`            | Kota/Kabupaten dalam provinsi  |
| GET    | `/cities/:cityId/districts`            | Kecamatan dalam kota           |
| GET    | `/districts/:disId/subdistricts`       | Kelurahan/Desa dalam kecamatan |
| GET    | `/subdistricts/:subdisId/postal-codes` | Kode pos dalam kelurahan       |
| GET    | `/search?q=<query>`                    | Pencarian wilayah              |
| GET    | `/health`                              | Status API                     |

---

## 📖 Dokumentasi API Lengkap

### 1. Get All Provinces

Mengambil daftar semua provinsi di Indonesia.

**Request:**

```
GET /api/v1/provinces
```

**Response:**

```json
{
  "data": [
    { "prov_id": 1, "prov_name": "ACEH" },
    { "prov_id": 12, "prov_name": "JAWA BARAT" },
    { "prov_id": 13, "prov_name": "JAWA TENGAH" }
  ],
  "meta": {
    "count": 38,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

<details>
<summary><b>📝 Contoh Kode</b></summary>

**cURL:**

```bash
curl -X GET "https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces" \
  -H "Content-Type: application/json"
```

**JavaScript (Fetch):**

```javascript
fetch("https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

**Node.js (Axios):**

```javascript
const axios = require("axios");

axios
  .get("https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

**PHP:**

```php
<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);
```

**Python:**

```python
import requests

response = requests.get("https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces")
data = response.json()
print(data)
```

**Java:**

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces"))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

**Go:**

```go
package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, err := http.Get("https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```

</details>

---

### 2. Get Cities by Province

Mengambil daftar kota/kabupaten dalam provinsi tertentu.

**Request:**

```
GET /api/v1/provinces/:provId/cities
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| provId | integer | Yes | ID provinsi (contoh: 12 untuk Jawa Barat) |

**Response:**

```json
{
  "data": [
    { "city_id": 161, "city_name": "BANDUNG" },
    { "city_id": 172, "city_name": "BEKASI" },
    { "city_id": 171, "city_name": "BOGOR" }
  ],
  "meta": {
    "count": 27,
    "provId": 12,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

<details>
<summary><b>📝 Contoh Kode</b></summary>

**cURL:**

```bash
curl -X GET "https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces/12/cities" \
  -H "Content-Type: application/json"
```

**JavaScript:**

```javascript
const provId = 12; // Jawa Barat

fetch(`https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces/${provId}/cities`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

**Python:**

```python
import requests

prov_id = 12  # Jawa Barat
response = requests.get(f"https://api-wilayah-indonesia-backend.vercel.app/api/v1/provinces/{prov_id}/cities")
data = response.json()
print(data)
```

</details>

---

### 3. Get Districts by City

Mengambil daftar kecamatan dalam kota/kabupaten tertentu.

**Request:**

```
GET /api/v1/cities/:cityId/districts
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| cityId | integer | Yes | ID kota (contoh: 161 untuk Bandung) |

**Response:**

```json
{
  "data": [
    { "dis_id": 2460, "dis_name": "COBLONG" },
    { "dis_id": 2179, "dis_name": "SUKASARI" },
    { "dis_id": 2180, "dis_name": "CIDADAP" }
  ],
  "meta": {
    "count": 30,
    "cityId": 161,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

<details>
<summary><b>📝 Contoh Kode</b></summary>

**cURL:**

```bash
curl -X GET "https://api-wilayah-indonesia-backend.vercel.app/api/v1/cities/161/districts" \
  -H "Content-Type: application/json"
```

**JavaScript:**

```javascript
const cityId = 161; // Bandung

fetch(`https://api-wilayah-indonesia-backend.vercel.app/api/v1/cities/${cityId}/districts`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

**Python:**

```python
import requests

city_id = 161  # Bandung
response = requests.get(f"https://api-wilayah-indonesia-backend.vercel.app/api/v1/cities/{city_id}/districts")
data = response.json()
print(data)
```

</details>

---

### 4. Get Subdistricts by District

Mengambil daftar kelurahan/desa dalam kecamatan tertentu.

**Request:**

```
GET /api/v1/districts/:disId/subdistricts
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| disId | integer | Yes | ID kecamatan (contoh: 2460 untuk Coblong) |

**Response:**

```json
{
  "data": [
    { "subdis_id": 26609, "subdis_name": "CIPAGANTI" },
    { "subdis_id": 26917, "subdis_name": "DAGO" },
    { "subdis_id": 28203, "subdis_name": "LEBAK GEDE" }
  ],
  "meta": {
    "count": 6,
    "disId": 2460,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

<details>
<summary><b>📝 Contoh Kode</b></summary>

**cURL:**

```bash
curl -X GET "https://api-wilayah-indonesia-backend.vercel.app/api/v1/districts/2460/subdistricts" \
  -H "Content-Type: application/json"
```

**JavaScript:**

```javascript
const disId = 2460; // Coblong

fetch(`https://api-wilayah-indonesia-backend.vercel.app/api/v1/districts/${disId}/subdistricts`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

**Python:**

```python
import requests

dis_id = 2460  # Coblong
response = requests.get(f"https://api-wilayah-indonesia-backend.vercel.app/api/v1/districts/{dis_id}/subdistricts")
data = response.json()
print(data)
```

</details>

---

### 5. Get Postal Codes by Subdistrict

Mengambil daftar kode pos dalam kelurahan/desa tertentu.

**Request:**

```
GET /api/v1/subdistricts/:subdisId/postal-codes
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| subdisId | integer | Yes | ID kelurahan (contoh: 26917 untuk Dago) |

**Response:**

```json
{
  "data": [{ "postal_code": "40135" }],
  "meta": {
    "count": 1,
    "subdisId": 26917,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

<details>
<summary><b>📝 Contoh Kode</b></summary>

**cURL:**

```bash
curl -X GET "https://api-wilayah-indonesia-backend.vercel.app/api/v1/subdistricts/26917/postal-codes" \
  -H "Content-Type: application/json"
```

**JavaScript:**

```javascript
const subdisId = 26917; // Dago

fetch(`https://api-wilayah-indonesia-backend.vercel.app/api/v1/subdistricts/${subdisId}/postal-codes`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

**Python:**

```python
import requests

subdis_id = 26917  # Dago
response = requests.get(f"https://api-wilayah-indonesia-backend.vercel.app/api/v1/subdistricts/{subdis_id}/postal-codes")
data = response.json()
print(data)
```

</details>

---

### 6. Search Locations

Mencari wilayah berdasarkan nama atau kode pos. Mendukung pagination.

**Request:**

```
GET /api/v1/search?q=<query>&page=<page>&limit=<limit>
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Query pencarian (min 2 karakter) |
| page | integer | No | Nomor halaman (default: 1) |
| limit | integer | No | Hasil per halaman (default: 20, max: 100) |

**Response:**

```json
{
  "data": [
    {
      "prov_id": 12,
      "prov_name": "JAWA BARAT",
      "city_id": 161,
      "city_name": "BANDUNG",
      "dis_id": 2460,
      "dis_name": "COBLONG",
      "subdis_id": 26917,
      "subdis_name": "DAGO",
      "postal_code": "40135"
    }
  ],
  "meta": {
    "total": 7,
    "page": 1,
    "limit": 20,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

<details>
<summary><b>📝 Contoh Kode</b></summary>

**cURL:**

```bash
curl -X GET "https://api-wilayah-indonesia-backend.vercel.app/api/v1/search?q=dago&limit=10&page=1" \
  -H "Content-Type: application/json"
```

**JavaScript:**

```javascript
const params = new URLSearchParams({
  q: "dago",
  limit: 10,
  page: 1,
});

fetch(`https://api-wilayah-indonesia-backend.vercel.app/api/v1/search?${params}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

**Python:**

```python
import requests

params = {
    "q": "dago",
    "limit": 10,
    "page": 1
}
response = requests.get("https://api-wilayah-indonesia-backend.vercel.app/api/v1/search", params=params)
data = response.json()
print(data)
```

</details>

---

### 7. Health Check

Mengecek status kesehatan API.

**Request:**

```
GET /api/v1/health
```

**Response:**

```json
{
  "data": {
    "status": "healthy",
    "uptime": 3600.123,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "meta": {},
  "error": null
}
```

---

## 📋 Response Format

Semua response menggunakan format standar:

```json
{
  "data": "Array atau Object hasil",
  "meta": {
    "count": "Jumlah item",
    "total": "Total item (pagination)",
    "page": "Halaman saat ini",
    "limit": "Item per halaman",
    "totalPages": "Total halaman",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean",
    "timestamp": "ISO 8601 datetime"
  },
  "error": "null jika sukses, object jika error"
}
```

---

## ❌ Error Handling

### Error Response Format

```json
{
  "data": null,
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "error": {
    "message": "Province not found",
    "code": "NOT_FOUND",
    "details": {}
  }
}
```

### HTTP Status Codes

| Code | Status                | Deskripsi                |
| ---- | --------------------- | ------------------------ |
| 200  | OK                    | Request berhasil         |
| 400  | Bad Request           | Parameter tidak valid    |
| 404  | Not Found             | Resource tidak ditemukan |
| 429  | Too Many Requests     | Rate limit exceeded      |
| 500  | Internal Server Error | Server error             |

---

## 🔧 Rate Limiting

API memiliki rate limiting untuk mencegah abuse:

- **Endpoint umum**: 100 request per 15 menit
- **Search endpoint**: 20 request per menit

---

## � Hierarki Data

```
📍 Provinsi (38)
 └── 🏙️ Kota/Kabupaten (514)
      └── 🏘️ Kecamatan (7,277)
           └── 🏠 Kelurahan/Desa (83,931)
                └── 📮 Kode Pos (81,250)
```

---

## 📄 License

MIT License - feel free to use this project for any purpose.

---

<p align="center">
  Made with ❤️ for Indonesia
</p>
