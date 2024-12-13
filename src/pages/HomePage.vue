<template>
  <div class="flex items-center justify-center">
    <Card
      class="w-full p-8 text-center shadow-sm max-sm:border-none max-sm:bg-transparent sm:mt-24 sm:max-w-xl sm:rounded-lg"
    >
      <h1 class="mb-4 text-4xl font-bold text-primary">Welcome to Merchant Panel</h1>
      <!-- <p class="mb-6 text-muted-foreground">
        This is the admin panel for the courier delivery management system, combining the
        functionalities of merchants, clients, and staff members.
      </p>
      <p class="text-muted-foreground">
        Only company staff and registered users can access this panel.
      </p> -->
    </Card>
  </div>
</template>

<script>
import { Card } from '@/components/ui/card';
export default {
  components: {
    Card
  }
};
</script>
