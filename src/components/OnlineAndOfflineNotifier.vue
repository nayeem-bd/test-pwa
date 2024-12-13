<template>
  <div class="sr-only">Online Offline Notifier</div>
</template>
<script setup>
import { toast } from 'vue-sonner';
import { useEventListener } from '@vueuse/core';

useEventListener(window, 'online', (evt) => {
  toast.success('Online', {
    description: 'Your internet connection was restored.',
    position: 'bottom-left'
  });
});
useEventListener(window, 'offline', (evt) => {
  toast.info('Offline', {
    description: 'You are currently offline.',
    position: 'bottom-left'
  });
});
</script>
