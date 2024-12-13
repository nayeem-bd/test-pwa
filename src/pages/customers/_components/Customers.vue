<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Customers</h2>
        <p class="text-muted-foreground">
          Below is a curated list of customers for your convenience.
        </p>
      </div>
      <div class="flex"></div>
    </div>
    <div>
      <CustomerList />
    </div>
  </div>
</template>

//
<script setup>
import CustomerList from './CustomerList.vue';
import { Button } from '@/components/ui/button';
import { useMerchantStore } from '@/app/merchants/merchantStore';
const merchantStore = useMerchantStore();
</script>
