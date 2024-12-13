import { defineStore } from 'pinia';
import { getStores, postStores } from './storeApi.js';
import { AxiosError } from 'axios';
import { handleApiMutationError } from '@/lib/error.js';

export const useStoreStore = defineStore('storeStore', {
  state: () => ({
    stores: [],
    isStoresFetching: false,
    store: {},
    isStoreCreating: false
  }),
  actions: {
    async fetchStores() {
      try {
        this.isStoresFetching = true;
        const result = await getStores();
        this.stores = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isStoresFetching = false;
      }
    },
    async createStore(payload, form) {
      try {
        this.isStoreCreating = true;
        const result = await postStores(payload);
        this.store = result.data?.data;
      } catch (err) {
        handleApiMutationError(err, form);
        throw err;
      } finally {
        this.isStoreCreating = false;
      }
    }
  }
});
