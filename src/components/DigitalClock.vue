<template>
  <div class="select-none">
    <span class="flex gap-1 font-mono text-2xl font-bold text-foreground/80 sm:text-3xl">
      <span class="text-primary/80">{{ timeArray[0] }}</span>
      <span>:</span>
      <span class="text-primary/80">{{ timeArray[1] }}</span>
      <span>:</span>
      <span class="text-primary/80">{{ timeArray[2] }}</span>
      <span>{{ timeArray[3] }}</span>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';

const format = `hh mm ss A`;

const currentTime = ref(dayjs().format(format));

const updateClock = () => {
  currentTime.value = dayjs().format(format);
};

const timeArray = computed(() => currentTime.value.split(' '));

onMounted(() => {
  setInterval(updateClock, 1000);
});
</script>
