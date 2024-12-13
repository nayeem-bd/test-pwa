import { api } from '@/lib/api';

// merchants: @GET
export function getCustomersQuery({ page = 1, per_page = 20 }) {
  return api.get(`/v1/customers?page=${page}&per_page=${per_page}`);
}

export function getCustomerDetails(id) {
  return api.get(`/v1/customers/${id}`);
}

export function getCustomerOrders(query) {
  query.page = query.page || 1;
  query.per_page = query.per_page || 20;
  return api.get(`/v1/customers/${query.id}/orders?page=${query.page}&per_page=${query.per_page}`);
}
