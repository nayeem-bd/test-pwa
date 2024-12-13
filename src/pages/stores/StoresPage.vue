<template>
  <Stores />
</template>
<script>
import Stores from './_components/Stores.vue';
import { useStoreStore } from '@/app/stores/storeStore.js';

export default {
  components: { Stores },
  async beforeRouteEnter(to, from, next) {
    const storeStore = useStoreStore();
    await storeStore.fetchStores();
    next();
  }
};
</script>
