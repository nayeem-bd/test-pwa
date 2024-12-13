<template>
  <Customers />
</template>
<script>
import { useCustomerStore } from '@/app/customers/customerStore.js';
import Customers from './_components/Customers.vue';

export default {
  components: { Customers },
  async beforeRouteEnter(to, from, next) {
    const customerStore = useCustomerStore();
    await customerStore.fetchCustomers();
    next();
  }
};
</script>
