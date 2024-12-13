<script setup>
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/vue';

defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <div class="relative">
    <Input
      class="pr-10"
      v-bind="$attrs"
    />
    <span
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-l-none text-foreground/50 hover:text-foreground/70"
      ><Icon
        icon="radix-icons:magnifying-glass"
        class="text-xl"
    /></span>
  </div>
</template>
