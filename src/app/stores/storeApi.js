import { api } from '@/lib/api';

// merchants: @GET
export function getStores() {
  return api.get(`/v1/stores`);
}

export function postStores(payload) {
  return api.post(`/v1/stores`, payload);
}
