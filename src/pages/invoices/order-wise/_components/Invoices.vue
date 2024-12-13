<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Order Wise Payments</h2>
        <p class="text-muted-foreground">
          Below is a curated list of payments for your convenience.
        </p>
      </div>
      <div class="flex"></div>
    </div>
    <div>
      <InvoiceList :merchants="merchantStore.merchants" />
    </div>
  </div>
</template>

//
<script setup>
import InvoiceList from './InvoiceList.vue';
import { Button } from '@/components/ui/button';
import { useMerchantStore } from '@/app/merchants/merchantStore';
const merchantStore = useMerchantStore();
</script>
