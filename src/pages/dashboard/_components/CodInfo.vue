<template>
  <Card class="h-48">
    <CardHeader class="p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">Cod Info</h2>
        <div>
          <Icon
            class="text-2xl"
            icon="mdi:currency-bdt"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="p-1 py-1">
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Last COD Date</p>
          <p class="text-sm">{{ moment(codInfo.last_cod_date).format('MMM DD, YYYY') }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Last COD Amount</p>
          <p class="text-sm">৳ {{ codInfo?.last_cod }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Pending COD</p>
          <p class="text-sm">৳ {{ codInfo?.pending_cod }}</p>
        </div>
        <div class="mb-1 flex items-center justify-between">
          <p class="text-sm">Total Delivery Charge</p>
          <p class="text-sm">৳ {{ codInfo?.total_delivery_charge }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';
import moment from 'moment';
const props = defineProps({
  codInfo: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
