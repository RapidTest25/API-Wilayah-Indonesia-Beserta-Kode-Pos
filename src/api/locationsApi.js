import client from "./client";

/**
 * Locations API methods
 */
export const locationsApi = {
  /**
   * Get all provinces
   */
  getProvinces: async () => {
    const response = await client.get("/provinces");
    return response.data;
  },

  /**
   * Get cities by province ID
   */
  getCitiesByProvince: async (provId) => {
    const response = await client.get(`/provinces/${provId}/cities`);
    return response.data;
  },

  /**
   * Get districts by city ID
   */
  getDistrictsByCity: async (cityId) => {
    const response = await client.get(`/cities/${cityId}/districts`);
    return response.data;
  },

  /**
   * Get subdistricts by district ID
   */
  getSubdistrictsByDistrict: async (disId) => {
    const response = await client.get(`/districts/${disId}/subdistricts`);
    return response.data;
  },

  /**
   * Get postal codes by subdistrict ID
   */
  getPostalCodesBySubdistrict: async (subdisId) => {
    const response = await client.get(`/subdistricts/${subdisId}/postal-codes`);
    return response.data;
  },

  /**
   * Search locations
   */
  search: async (query, page = 1, limit = 20) => {
    const response = await client.get("/search", {
      params: { q: query, page, limit },
    });
    return response.data;
  },

  /**
   * Health check
   */
  health: async () => {
    const response = await client.get("/health");
    return response.data;
  },
};

export default locationsApi;
