<template>
  <Invoices />
</template>
<script>
import { useMerchantStore } from '@/app/merchants/merchantStore';
import Invoices from './_components/Invoices.vue';

export default {
  components: { Invoices },
  async beforeRouteEnter(to, from, next) {
    const merchantStore = useMerchantStore();
    merchantStore.pagination.page = to.query.page ? parseInt(to.query.page) : 1;
    await merchantStore.fetchMerchants();
    next();
  }
};
</script>
