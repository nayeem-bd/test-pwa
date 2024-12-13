<template>
  <div class="grid grid-cols-6 gap-4">
    <MonthlyOrderAnalysis class="col-span-4 row-span-2" />
    <CodInfo
      :codInfo="dashboardStore.codStats.totalCods"
      class="col-span-2"
    />
    <CodValues
      :last7days="dashboardStore.codStats.lastSevenCods"
      class="col-span-2"
    />
  </div>
</template>

<script setup>
import MonthlyOrderAnalysis from '@/pages/dashboard/_components/MonthlyOrderAnalysis.vue';
import CodInfo from '@/pages/dashboard/_components/CodInfo.vue';
import CodValues from '@/pages/dashboard/_components/CodValues.vue';
import { useDashboardStore } from '@/app/dashboard/dashboardStore.js';
import { onMounted } from 'vue';

const dashboardStore = useDashboardStore();

onMounted(async () => {
  await dashboardStore.fetchCodStats();
});
</script>

<style lang="scss" scoped></style>
