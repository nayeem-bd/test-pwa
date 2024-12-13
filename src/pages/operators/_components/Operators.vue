<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Operators</h2>
        <p class="text-muted-foreground">
          Below is a curated list of operators for your convenience.
        </p>
      </div>
      <div class="flex">
        <RouterLink to="/operators/create">
          <Button> ADD NEW OPERATOR </Button>
        </RouterLink>
      </div>
    </div>
    <div>
      <OperatorList />
    </div>
  </div>
</template>

//
<script setup>
import OperatorList from './OperatorList.vue';
import { Button } from '@/components/ui/button';
</script>
