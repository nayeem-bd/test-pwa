import { api } from '@/lib/api';

// merchants: @GET
export function getPricePlan(query) {
  return api.post(`/v1/price-plan`, query);
}
