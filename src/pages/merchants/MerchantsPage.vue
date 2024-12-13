<template>
  <Merchants />
</template>
<script>
import { useMerchantStore } from '@/app/merchants/merchantStore';
import Merchants from './_components/Merchants.vue';

export default {
  components: { Merchants },
  async beforeRouteEnter(to, from, next) {
    const merchantStore = useMerchantStore();
    merchantStore.pagination.page = to.query.page ? parseInt(to.query.page) : 1;
    await merchantStore.fetchMerchants();
    next();
  }
};
</script>
