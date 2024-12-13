<script setup>
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

const { showPassword = true } = defineProps({
  showPassword: Boolean
});

const isPasswordShow = ref(showPassword);

defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <div class="relative">
    <Input
      :type="!isPasswordShow ? 'text' : 'password'"
      class="pr-10"
      v-bind="$attrs"
    />
    <Button
      type="button"
      variant="none"
      size="xs"
      @click="isPasswordShow = !isPasswordShow"
      class="absolute right-1 top-1/2 -translate-y-1/2 rounded-l-none text-foreground/50 hover:text-foreground/70"
      ><Icon
        :icon="isPasswordShow ? 'mdi:eye-off' : 'mdi:eye'"
        class="text-xl"
    /></Button>
  </div>
</template>
