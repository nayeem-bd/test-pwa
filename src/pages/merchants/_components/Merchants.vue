<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Merchants</h2>
        <p class="text-muted-foreground">
          Below is a curated list of merchants for your convenience.
        </p>
      </div>
      <div class="flex">
        <RouterLink to="/merchants/create">
          <Button> ADD NEW MERCHANTS </Button>
        </RouterLink>
      </div>
    </div>
    <div>
      <MerchantList :merchants="merchantStore.merchants" />
    </div>
  </div>
</template>

//
<script setup>
import MerchantList from './MerchantList.vue';
import { Button } from '@/components/ui/button';
import { useMerchantStore } from '@/app/merchants/merchantStore';
const merchantStore = useMerchantStore();
</script>
