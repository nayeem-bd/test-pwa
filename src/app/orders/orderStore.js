import { defineStore } from 'pinia';
import { getOrderDetails, getOrders, postOrder } from "./orderApi.js";
import { AxiosError } from 'axios';
import { handleApiMutationError } from '@/lib/error.js';

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [],
    isOrdersFetching: false,
    order: {},
    isOrderFetching: false,
    isOrderCreating: false
  }),
  actions: {
    async fetchOrders(payload = null) {
      try {
        this.isOrdersFetching = true;
        const result = await getOrders(payload);
        this.orders = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isOrdersFetching = false;
      }
    },
    async fetchOrder(consignmentId) {
      try {
        this.isOrderFetching = true;
        const result = await getOrderDetails(consignmentId);
        this.order = result.data?.data;
      } catch (error) {
        // handle error
      } finally {
        this.isOrderFetching = false;
      }
    },
    async createOrder(payload, form) {
      try {
        this.isOrderCreating = true;
        const result = await postOrder(payload);
        this.order = result.data?.data;
      } catch (error) {
        handleApiMutationError(error, form);
        throw error;
      } finally {
        this.isOrderCreating = false;
      }
    }
  }
});
