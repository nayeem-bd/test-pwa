<template>
  <RouteInitialLoading />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useColorMode } from '@vueuse/core';
import RouteInitialLoading from './components/RouteIntialLoading.vue';
useColorMode();
</script>
