<template>
  <Operators />
</template>
<script>
import Operators from './_components/Operators.vue';
import { useOperatorStore } from '@/app/operators/operatorStore.js';

export default {
  components: { Operators },
  async beforeRouteEnter(to, from, next) {
    const operatorStore = useOperatorStore();
    await operatorStore.fetchOperators();
    next();
  }
};
</script>
