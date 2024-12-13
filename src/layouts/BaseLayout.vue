<template>
  <TopRouteProgress />
  <OnlineAndOfflineNotifier />
  <RouterView />
  <Toaster />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { Toaster } from '@/components/ui/sonner';
import TopRouteProgress from '@/components/TopRouteProgress.vue';
import OnlineAndOfflineNotifier from '@/components/OnlineAndOfflineNotifier.vue';
</script>
