import { defineStore } from 'pinia';
import { getOperatorDetails, getOperators, postOperator } from './operatorApi.js';
import { AxiosError } from 'axios';
import { handleApiMutationError } from '@/lib/error.js';

export const useOperatorStore = defineStore('operatorStore', {
  state: () => ({
    operators: [],
    isOperatorsFetching: false,
    operator: {},
    isOperatorFetching: false,
    isOperatorCreating: false
  }),
  actions: {
    async fetchOperators() {
      try {
        this.isOperatorsFetching = true;
        const result = await getOperators();
        this.operators = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isOperatorsFetching = false;
      }
    },
    async fetchOperator(id) {
      try {
        this.isOperatorFetching = true;
        const result = await getOperatorDetails(id);
        this.operator = result.data?.data;
      } catch (error) {
        // handle error
      } finally {
        this.isOperatorFetching = false;
      }
    },
    async createOperator(payload, form) {
      try {
        this.isOperatorCreating = true;
        const result = await postOperator(payload);
        this.operator = result.data?.data;
      } catch (error) {
        handleApiMutationError(error, form);
        throw error;
      } finally {
        this.isOperatorCreating = false;
      }
    }
  }
});
