<template>
  <div class="grid grid-cols-6 gap-3">
    <NumberOfOrders :total-orders="dashboardStore.orderStats.totalOrders" />
    <OrderValues
      :values="dashboardStore.orderStats.values"
      class="col-span-2 col-start-2 row-span-2"
    />
    <NumberOfReturnOrderDelivered :total-returned="dashboardStore.orderStats.totalReturned" />
    <TodaysOrderSummary
      :todays-order="dashboardStore.orderStats.todaysOrder"
      class="col-span-2 row-span-2"
    />
    <NumberOfDeliveredOrders :totalDelivered="dashboardStore.orderStats.totalDelivered" />
    <NumberOfDeliveryAndReturnProcessOrders :in-process="dashboardStore.orderStats.inProcess" />
  </div>
</template>

<script setup>
import NumberOfOrders from '@/pages/dashboard/_components/NumberOfOrders.vue';
import NumberOfDeliveredOrders from '@/pages/dashboard/_components/NumberOfDeliveredOrders.vue';
import OrderValues from '@/pages/dashboard/_components/OrderValues.vue';
import NumberOfReturnOrderDelivered from '@/pages/dashboard/_components/NumberOfReturnOrderDelivered.vue';
import NumberOfDeliveryAndReturnProcessOrders from '@/pages/dashboard/_components/NumberOfDeliveryAndReturnProcessOrders.vue';
import TodaysOrderSummary from '@/pages/dashboard/_components/TodayOrderSummary.vue';
import { useDashboardStore } from '@/app/dashboard/dashboardStore.js';
import { onMounted } from 'vue';

const dashboardStore = useDashboardStore();

onMounted(async () => {
  await dashboardStore.fetchOrderStats();
});
</script>

<style lang="scss" scoped></style>
