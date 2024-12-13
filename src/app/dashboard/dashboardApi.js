import { api } from '@/lib/api';

export function getOrderStats() {
  return api.get(`/v1/dashboard/order-stats`);
}

export function getMonthlyOrders() {
  return api.get(`/v1/dashboard/monthly-orders`);
}

export function getCodStats() {
  return api.get(`/v1/dashboard/cod-stats`);
}
