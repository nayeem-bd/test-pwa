<template>
  <div
    class="relative flex h-[var(--top-nav-height)] items-center justify-between gap-3 border-b px-6 md:px-10"
  >
    <div class="flex flex-1 items-center justify-between">
      <div>
        <div class="text-2xl font-medium">{{ authStore.user?.courier_name }}</div>
      </div>
      <!-- <DigitalClock v-if="showClock" /> -->
    </div>
    <UserNav />
  </div>
</template>

<script setup>
import { useMediaQuery } from '@vueuse/core';
import DigitalClock from '@/components/DigitalClock.vue';
import UserNav from './UserNav.vue';
import { useAuthStore } from '@/app/auth/authStore.js';

const showClock = useMediaQuery('(min-width: 768px)');
const authStore = useAuthStore();
</script>
