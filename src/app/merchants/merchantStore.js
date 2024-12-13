import { defineStore } from 'pinia';
import { getMerchantsQuery } from './merchantApi';
import { AxiosError } from 'axios';

export const useMerchantStore = defineStore('merchantStore', {
  state: () => ({
    merchants: [],
    pagination: {
      page: 1,
      limit: 50,
      total: 0
    },
    currentMerchant: null,
    isMerchantsFetching: false
  }),
  actions: {
    setPage(page) {
      this.pagination.page = page;
      this.router.push({ query: { page: page } });
      this.fetchMerchants();
    },
    async fetchMerchants() {
      try {
        this.isMerchantsFetching = true;
        const result = await getMerchantsQuery({
          page: this.pagination.page,
          limit: this.limit
        });
        this.pagination.total = result.data.data?.total ?? 1;
        this.merchants = result.data?.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isMerchantsFetching = false;
      }
    }
  }
});
