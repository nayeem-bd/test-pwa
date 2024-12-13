import { api } from '@/lib/api.js';

// merchants: @GET
export function getCities() {
  return api.get(`/v1/cities`);
}

export function getZones(city_id = null) {
  let url = `/v1/zones`;
  if (city_id) {
    url += `?city_id=${city_id}`;
  }
  return api.get(url);
}

export function getAreas(zone_id = null) {
  let url = `/v1/areas`;
  if (zone_id) {
    url += `?zone_id=${zone_id}`;
  }
  return api.get(url);
}