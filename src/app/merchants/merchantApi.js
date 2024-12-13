import { api } from '@/lib/api';

// merchants: @GET
export function getMerchantsQuery({ page = 1, limit = 20 }) {
  return api.get(`/merchants?page=${page}&limit=${limit}`);
}
