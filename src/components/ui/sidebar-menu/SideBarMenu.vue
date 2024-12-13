<script setup>
import { cn } from '@/lib/utils';
import { provide, ref, watch } from 'vue';
const props = defineProps({
  collapsed: Boolean
});

const collapsed = ref(props.collapsed);

watch(
  () => props.collapsed,
  (value) => {
    collapsed.value = value;
  }
);

provide('collapsed', collapsed);
</script>

<template>
  <div
    :class="
      cn('flex flex-col px-2 text-foreground/80', {
        [`[&_[data-collapsed='hide']]:hidden`]: collapsed
      })
    "
  >
    <slot />
  </div>
</template>
