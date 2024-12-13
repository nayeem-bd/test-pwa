import { defineStore } from 'pinia';
import { getCustomerDetails, getCustomerOrders, getCustomersQuery } from './customerApi.js';
import { AxiosError } from 'axios';

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    customers: [],
    isCustomersFetching: false,
    pagination: {
      page: 1,
      per_page: 50,
      total: 0
    },
    customer: {},
    isCustomerFetching: false,
    customerOrders: [],
    isCustomerOrdersFetching: false
  }),
  actions: {
    // setPage(page) {
    //   this.pagination.page = page;
    //   this.router.push({ query: { page: page } });
    //   this.fetchCustomers();
    // },
    async setPagination(pagination) {
      if (pagination.page) {
        this.pagination.page = pagination.page;
      }
      if (pagination.per_page) {
        this.pagination.per_page = pagination.per_page;
      }
      await this.fetchCustomers();
    },
    async fetchCustomers() {
      try {
        this.isCustomersFetching = true;
        const result = await getCustomersQuery({
          page: this.pagination.page,
          per_page: this.pagination.per_page
        });
        this.pagination.total = result.data.data?.total ?? 1;
        this.customers = result.data?.data;
        // console.log(this.customers, this.pagination);
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isCustomersFetching = false;
      }
    },
    async fetchCustomer(id) {
      try {
        this.isCustomersFetching = true;
        const result = await getCustomerDetails(id);
        this.customer = result.data?.data;
      } catch (error) {
        // handle error
      } finally {
        this.isCustomersFetching = false;
      }
    },
    async fetchCustomerOrders(id) {
      try {
        this.isCustomerOrdersFetching = true;
        const result = await getCustomerOrders({
          id,
          page: this.pagination.page,
          per_page: this.pagination.per_page
        });
        this.customerOrders = result.data?.data;
        this.pagination.total = result.data.data?.total ?? 1;
      } catch (error) {
        // handle error
      } finally {
        this.isCustomerOrdersFetching = false;
      }
    },
    async setCustomerOrdersPagination(id, pagination){
      if (pagination.page) {
        this.pagination.page = pagination.page;
      }
      if (pagination.per_page) {
        this.pagination.per_page = pagination.per_page;
      }
      await this.fetchCustomerOrders(id);
    }
  }
});
