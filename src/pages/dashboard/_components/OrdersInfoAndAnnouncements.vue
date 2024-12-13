<template>
  <div class="grid grid-cols-6 gap-4">
    <OrdersInfo class="col-span-4" />
    <Announcement class="col-span-2" />
  </div>
</template>

<script setup>
import OrdersInfo from '@/pages/dashboard/_components/OrdersInfo.vue';
import Announcement from '@/pages/dashboard/_components/Announcement.vue';
</script>

<style lang="scss" scoped></style>
