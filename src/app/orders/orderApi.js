import { api } from '@/lib/api.js';

// merchants: @GET
export function getOrders(query = null) {
  let url = '/v1/orders';
  if (query){
    //update query
  }
  return api.get(url);
}

export function getOrderDetails(id) {
  return api.get(`/v1/orders/${id}`);
}

export function postOrder(payload) {
  return api.post(`/v1/orders`, payload);
}
