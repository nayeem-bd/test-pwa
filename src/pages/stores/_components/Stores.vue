<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Stores</h2>
        <p class="text-muted-foreground">Below is a curated list of stores for your convenience.</p>
      </div>
      <div class="flex">
        <RouterLink to="/stores/create">
          <Button> ADD NEW STORES </Button>
        </RouterLink>
      </div>
    </div>
    <div>
      <StoreList />
    </div>
  </div>
</template>

//
<script setup>
import StoreList from './StoreList.vue';
import { Button } from '@/components/ui/button';
</script>
