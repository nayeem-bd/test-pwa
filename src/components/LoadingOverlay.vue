<template>
  <div class="">
    <Icon
      v-if="$props.visiable"
      icon="mingcute:loading-line"
      class="animate-spin text-primary duration-700"
    />
  </div>
</template>

<script lang="js" setup>
import { Icon } from '@iconify/vue';

defineProps({
  visiable: Boolean
});
</script>
