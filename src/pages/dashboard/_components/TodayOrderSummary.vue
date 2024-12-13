<template>
  <Card>
    <CardHeader class="p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">Today's Details</h2>
        <div>
          <Icon
            class="text-2xl"
            icon="line-md:calendar"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="p-1">
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Today's Order</p>
          <p class="text-sm">{{ todaysOrder?.total }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Today's Delivered Order</p>
          <p class="text-sm">{{ todaysOrder?.delivered }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Today's Returned Order</p>
          <p class="text-sm">{{ todaysOrder?.returned }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Today's Pending Order</p>
          <p class="text-sm">{{ todaysOrder?.pending }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';

const props = defineProps({
  todaysOrder: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
