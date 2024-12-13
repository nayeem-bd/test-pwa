import { defineStore } from 'pinia';
import { getPricePlan } from './pricePlanApi.js';
import { AxiosError } from 'axios';

export const usePricePlanStore = defineStore('pricePlanStore', {
  state: () => ({
    pricePlan: {
      price: 60,
      cod_percentage: 0.01,
      total_price: 60,
      discount: 0
    },
    isPricePlanFetching: false
  }),
  actions: {
    async fetchPricePlan(payload) {
      try {
        this.isPricePlanFetching = true;
        const result = await getPricePlan(payload);
        this.pricePlan = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isPricePlanFetching = false;
      }
    }
  }
});
