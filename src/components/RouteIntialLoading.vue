<template>
  <Transition name="fade">
    <div
      v-if="loading"
      class="absolute z-[1000000] flex h-full w-full items-center justify-center bg-background"
    >
      <LoadingOverlay
        class="text-5xl"
        :visiable="true"
      />
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { ref } from 'vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import router from '@/routers';
import { delay } from '@/lib/utils';

const loading = ref(true);

router.isReady().then(async () => {
  await delay(400);
  loading.value = false;
});

//
</script>
