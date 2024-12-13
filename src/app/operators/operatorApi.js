import { api } from '@/lib/api.js';

// merchants: @GET
export function getOperators() {
  return api.get(`/v1/operators`);
}

export function getOperatorDetails(id) {
  return api.get(`/v1/operators/${id}`);
}

export function postOperator(payload) {
  return api.post(`/v1/operators`, payload);
}
