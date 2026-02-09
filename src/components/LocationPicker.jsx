import { useState, useEffect } from "react";
import locationsApi from "../api/locationsApi";

const STEPS = [
  { key: "province", label: "Provinsi" },
  { key: "city", label: "Kota" },
  { key: "district", label: "Kecamatan" },
  { key: "subdistrict", label: "Kelurahan" },
  { key: "postal", label: "Kode Pos" },
];

export function LocationPicker({ onSelectionComplete }) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [postalCodes, setPostalCodes] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(null);
  const [selectedPostalCode, setSelectedPostalCode] = useState(null);

  const [loading, setLoading] = useState({
    provinces: false,
    cities: false,
    districts: false,
    subdistricts: false,
    postalCodes: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    loadProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince && selectedCity && selectedDistrict && selectedSubdistrict && selectedPostalCode) {
      onSelectionComplete?.({
        province: selectedProvince,
        city: selectedCity,
        district: selectedDistrict,
        subdistrict: selectedSubdistrict,
        postalCode: selectedPostalCode,
      });
    }
  }, [selectedProvince, selectedCity, selectedDistrict, selectedSubdistrict, selectedPostalCode]);

  const getCurrentStep = () => {
    if (!selectedProvince) return 0;
    if (!selectedCity) return 1;
    if (!selectedDistrict) return 2;
    if (!selectedSubdistrict) return 3;
    if (!selectedPostalCode) return 4;
    return 5;
  };

  const loadProvinces = async () => {
    setLoading((prev) => ({ ...prev, provinces: true }));
    setError(null);
    try {
      const result = await locationsApi.getProvinces();
      setProvinces(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, provinces: false }));
    }
  };

  const loadCities = async (provId) => {
    setLoading((prev) => ({ ...prev, cities: true }));
    try {
      const result = await locationsApi.getCitiesByProvince(provId);
      setCities(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, cities: false }));
    }
  };

  const loadDistricts = async (cityId) => {
    setLoading((prev) => ({ ...prev, districts: true }));
    try {
      const result = await locationsApi.getDistrictsByCity(cityId);
      setDistricts(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, districts: false }));
    }
  };

  const loadSubdistricts = async (disId) => {
    setLoading((prev) => ({ ...prev, subdistricts: true }));
    try {
      const result = await locationsApi.getSubdistrictsByDistrict(disId);
      setSubdistricts(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, subdistricts: false }));
    }
  };

  const loadPostalCodes = async (subdisId) => {
    setLoading((prev) => ({ ...prev, postalCodes: true }));
    try {
      const result = await locationsApi.getPostalCodesBySubdistrict(subdisId);
      setPostalCodes(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, postalCodes: false }));
    }
  };

  const handleProvinceChange = (e) => {
    const provId = parseInt(e.target.value, 10);
    const province = provinces.find((p) => p.prov_id === provId);
    setSelectedProvince(province || null);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);
    setSelectedPostalCode(null);
    setCities([]);
    setDistricts([]);
    setSubdistricts([]);
    setPostalCodes([]);
    if (provId) loadCities(provId);
  };

  const handleCityChange = (e) => {
    const cityId = parseInt(e.target.value, 10);
    const city = cities.find((c) => c.city_id === cityId);
    setSelectedCity(city || null);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);
    setSelectedPostalCode(null);
    setDistricts([]);
    setSubdistricts([]);
    setPostalCodes([]);
    if (cityId) loadDistricts(cityId);
  };

  const handleDistrictChange = (e) => {
    const disId = parseInt(e.target.value, 10);
    const district = districts.find((d) => d.dis_id === disId);
    setSelectedDistrict(district || null);
    setSelectedSubdistrict(null);
    setSelectedPostalCode(null);
    setSubdistricts([]);
    setPostalCodes([]);
    if (disId) loadSubdistricts(disId);
  };

  const handleSubdistrictChange = (e) => {
    const subdisId = parseInt(e.target.value, 10);
    const subdistrict = subdistricts.find((s) => s.subdis_id === subdisId);
    setSelectedSubdistrict(subdistrict || null);
    setSelectedPostalCode(null);
    setPostalCodes([]);
    if (subdisId) loadPostalCodes(subdisId);
  };

  const handlePostalCodeChange = (e) => {
    setSelectedPostalCode(e.target.value || null);
  };

  const currentStep = getCurrentStep();

  return (
    <div>
      {/* Progress Tracker */}
      <div className="progress-tracker">
        {STEPS.map((step, idx) => (
          <div
            key={step.key}
            className={`progress-step ${idx < currentStep ? "completed" : ""} ${idx === currentStep ? "active" : ""}`}
          >
            <div className="step-circle">
              {idx < currentStep ? "✓" : idx + 1}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dropdowns">
        {/* Province */}
        <div className="dropdown-group">
          <label className={`dropdown-label ${selectedProvince ? "completed" : ""}`}>
            <span className="step">1</span>
            Provinsi
          </label>
          <select
            value={selectedProvince?.prov_id || ""}
            onChange={handleProvinceChange}
            disabled={loading.provinces}
            className={loading.provinces ? "loading" : ""}
          >
            <option value="">
              {loading.provinces ? "Memuat..." : "-- Pilih Provinsi --"}
            </option>
            {provinces.map((p) => (
              <option key={p.prov_id} value={p.prov_id}>
                {p.prov_name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="dropdown-group">
          <label className={`dropdown-label ${selectedCity ? "completed" : ""}`}>
            <span className="step">2</span>
            Kota/Kabupaten
          </label>
          <select
            value={selectedCity?.city_id || ""}
            onChange={handleCityChange}
            disabled={!selectedProvince || loading.cities}
            className={loading.cities ? "loading" : ""}
          >
            <option value="">
              {loading.cities ? "Memuat..." : selectedProvince ? "-- Pilih Kota/Kabupaten --" : "Pilih provinsi dulu"}
            </option>
            {cities.map((c) => (
              <option key={c.city_id} value={c.city_id}>
                {c.city_name}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="dropdown-group">
          <label className={`dropdown-label ${selectedDistrict ? "completed" : ""}`}>
            <span className="step">3</span>
            Kecamatan
          </label>
          <select
            value={selectedDistrict?.dis_id || ""}
            onChange={handleDistrictChange}
            disabled={!selectedCity || loading.districts}
            className={loading.districts ? "loading" : ""}
          >
            <option value="">
              {loading.districts ? "Memuat..." : selectedCity ? "-- Pilih Kecamatan --" : "Pilih kota dulu"}
            </option>
            {districts.map((d) => (
              <option key={d.dis_id} value={d.dis_id}>
                {d.dis_name}
              </option>
            ))}
          </select>
        </div>

        {/* Subdistrict */}
        <div className="dropdown-group">
          <label className={`dropdown-label ${selectedSubdistrict ? "completed" : ""}`}>
            <span className="step">4</span>
            Kelurahan/Desa
          </label>
          <select
            value={selectedSubdistrict?.subdis_id || ""}
            onChange={handleSubdistrictChange}
            disabled={!selectedDistrict || loading.subdistricts}
            className={loading.subdistricts ? "loading" : ""}
          >
            <option value="">
              {loading.subdistricts ? "Memuat..." : selectedDistrict ? "-- Pilih Kelurahan --" : "Pilih kecamatan dulu"}
            </option>
            {subdistricts.map((s) => (
              <option key={s.subdis_id} value={s.subdis_id}>
                {s.subdis_name}
              </option>
            ))}
          </select>
        </div>

        {/* Postal Code */}
        <div className="dropdown-group">
          <label className={`dropdown-label ${selectedPostalCode ? "completed" : ""}`}>
            <span className="step">5</span>
            Kode Pos
          </label>
          <select
            value={selectedPostalCode || ""}
            onChange={handlePostalCodeChange}
            disabled={!selectedSubdistrict || loading.postalCodes}
            className={loading.postalCodes ? "loading" : ""}
          >
            <option value="">
              {loading.postalCodes ? "Memuat..." : selectedSubdistrict ? "-- Pilih Kode Pos --" : "Pilih kelurahan dulu"}
            </option>
            {postalCodes.map((pc, idx) => (
              <option key={`${pc.postal_code}-${idx}`} value={pc.postal_code}>
                {pc.postal_code}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default LocationPicker;
