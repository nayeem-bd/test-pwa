<template>
  <Card class="flex flex-col items-center justify-between">
    <CardHeader class="h-1/5 w-full p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">Last Month Order Analysis</h2>
        <Badge
          variant="secondary"
          class="text-base"
          >{{ dashboardStore.monthlyOrders.month }}</Badge
        >
        <div>
          <Icon
            class="text-2xl"
            icon="et:piechart"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent class="h-4/5 w-full">
      <div class="flex w-full items-center justify-between p-1 py-4">
        <div class="w-2/3">
          <h4 class="py-2 pb-4 text-center">Order numbers</h4>
          <BarChart
            class="h-56"
            :data="barChartData"
            index="name"
            :categories="['order']"
            :y-formatter="
              (tick, i) => {
                return typeof tick === 'number' ? `${tick}` : '';
              }
            "
          />
        </div>
        <div class="w-1/3">
          <h4 class="py-2 pb-4 text-center">Orders status</h4>
          <DonutChart
            class="h-56 px-4"
            index="name"
            :category="'order'"
            :data="barChartData"
            :type="'pie'"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';
import { DonutChart } from '@/components/ui/chart-donut/index.js';
import { BarChart } from '@/components/ui/chart-bar/index.js';
import { Badge } from '@/components/ui/badge/index.js';
import { useDashboardStore } from '@/app/dashboard/dashboardStore.js';
import { onMounted, ref } from 'vue';

const monthName = 'September';

const barChartData = ref([]);

const dashboardStore = useDashboardStore();

onMounted(async () => {
  await dashboardStore.fetchMonthlyOrders();
  const orders = dashboardStore.monthlyOrders.orders;

  Object.keys(orders).forEach((key) => {
    barChartData.value.push({
      name: key,
      order: orders[key]
    });
  });
});
</script>

<style lang="scss" scoped></style>
