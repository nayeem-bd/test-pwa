<template>
  <Card>
    <CardHeader class="p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">Values</h2>
        <div>
          <Icon
            class="text-2xl"
            icon="mdi:currency-bdt"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="p-1">
        <div class="mb-1 flex items-center justify-between">
          <p class="text-md">Order Value</p>
          <p class="text-sm">৳ {{ values?.total }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-md">Delivered Value</p>
          <p class="text-sm">৳ {{ values?.delivered }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-md">Returned Value</p>
          <p class="text-sm">৳ {{ values?.returned }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-md">Pending Value</p>
          <p class="text-sm">৳ {{ values?.pending }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';

const props = defineProps({
  values: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
