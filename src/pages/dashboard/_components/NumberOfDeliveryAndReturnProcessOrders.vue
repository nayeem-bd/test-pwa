<template>
  <Card class="flex items-center justify-center">
    <CardContent class="w-full px-5 py-2">
      <div class="grid grid-cols-4 gap-1">
        <div class="col-span-2 block">
          <h2 class="text-2xl">{{ inProcess?.delivery }}</h2>
          <h4 class="text-sm">Delivery Process</h4>
        </div>
        <div class="col-span-2 block">
          <h2 class="text-2xl">{{ inProcess?.return }}</h2>
          <h4 class="text-sm">Return Process</h4>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';

const props = defineProps({
  inProcess: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
