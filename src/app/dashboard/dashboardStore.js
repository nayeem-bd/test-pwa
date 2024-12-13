import { defineStore } from 'pinia';
import { getCodStats, getMonthlyOrders, getOrderStats } from './dashboardApi.js';
import { AxiosError } from 'axios';

export const useDashboardStore = defineStore('dashboardStore', {
  state: () => ({
    orderStats: {},
    isOrderStatsFetching: false,
    monthlyOrders: {},
    isMonthlyOrdersFetching: false,
    codStats: {
      totalCods: {
        last_cod_date: new Date(),
        last_cod: 0,
        pending_cod: 0,
        total_delivery_charge: 0
      },
      lastSevenCods: {
        1: 0
      }
    },
    isCodStatsFetching: false
  }),
  actions: {
    async fetchOrderStats() {
      try {
        this.isOrderStatsFetching = true;
        const result = await getOrderStats();
        this.orderStats = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isOrderStatsFetching = false;
      }
    },
    async fetchMonthlyOrders() {
      try {
        this.isMonthlyOrdersFetching = true;
        const result = await getMonthlyOrders();
        this.monthlyOrders = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isMonthlyOrdersFetching = false;
      }
    },
    async fetchCodStats() {
      try {
        this.isCodStatsFetching = true;
        const result = await getCodStats();
        this.codStats = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isCodStatsFetching = false;
      }
    }
  }
});
