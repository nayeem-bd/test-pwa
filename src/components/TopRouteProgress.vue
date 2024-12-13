<template>
  <div class="sr-only">Top Progress</div>
</template>

<script setup>
import topbar from 'topbar';
import router from '@/routers';

topbar.config({
  barThickness: 3,
  barColors: {
    0: '#3cc5ff'
  },
  shadowBlur: 10,
  shadowColor: 'rgba(0, 0, 0, .5)'
});

router.beforeEach((to, from, next) => {
  topbar.show(150);
  next();
});

router.afterEach(() => {
  topbar.hide();
});
</script>
