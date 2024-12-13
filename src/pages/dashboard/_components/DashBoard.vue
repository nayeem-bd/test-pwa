<template>
  <div class="flex-1 space-y-4 p-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
    </div>
    <OrderStats />
    <SalesAndCodSection />
    <OrdersInfoAndAnnouncements />
  </div>
</template>

<script setup>
import OrderStats from '@/pages/dashboard/_components/OrderStats.vue';
import SalesAndCodSection from '@/pages/dashboard/_components/SalesAndCodSection.vue';
import OrdersInfoAndAnnouncements from '@/pages/dashboard/_components/OrdersInfoAndAnnouncements.vue';
</script>
