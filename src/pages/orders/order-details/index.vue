<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h2 class="text-2xl font-bold tracking-tight">
        <span class="text-gray-600 dark:text-gray-300"> {{ consignmentId }} </span> Order details
      </h2>
      <div class="flex gap-x-4">
        <Button v-on:click="goBackToOrders()"> Go Back </Button>
        <!--        <Button v-on:click="updateEditOrderRed(true)"> Edit Order </Button>-->
      </div>
    </div>
    <!--    <orderLogs />-->
    <orderData
      v-if="!orderStore.isOrderFetching"
      class="mt-4"
      ref="editOrderRef"
    />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useOrderStore } from '@/app/orders/orderStore';
// import orderLogs from './orderLogs.vue';
import orderData from './orderData.vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const consignmentId = route.params.consignmentId;
const editOrderRef = ref(false);

onBeforeMount(async () => {
  console.log(route.params.consignmentId);
  await orderStore.fetchOrder(consignmentId);
});

const updateEditOrderRed = (value) => {
  if (editOrderRef.value) {
    editOrderRef.value.setEditingTrue(value);
  }
};

const goBackToOrders = () => {
  router.push({ name: 'Orders' });
};
</script>
