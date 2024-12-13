<script setup>
import SideBarMenuButton from './SideBarMenuButton.vue';

const props = defineProps({
  icon: String,
  label: String
});

//
</script>

<template>
  <RouterLink
    class="flex flex-col"
    v-slot="{ isActive, isExactActive }"
  >
    <SideBarMenuButton v-bind="{ ...$props, isActive, isExactActive }">
      <slot />
    </SideBarMenuButton>
  </RouterLink>
</template>
