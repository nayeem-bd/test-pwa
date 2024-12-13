<template>
  <Card class="flex items-center justify-center">
    <CardContent class="w-full px-5 py-2">
      <div class="grid grid-cols-3 gap-1">
        <div class="col-span-2 block">
          <h2 class="text-2xl">{{ totalDelivered }}</h2>
          <h4 class="text-md">Orders Delivered</h4>
        </div>
        <div class="col-span-1 flex items-center justify-end">
          <Icon
            class="text-4xl"
            icon="fluent:vehicle-truck-profile-20-regular"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';
const props = defineProps({
  totalDelivered: {
    type: Number,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
