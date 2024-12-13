<template>
  <SideBarMenu
    class="pb-4"
    :collapsed="sidebarCollapsed"
  >
    <SideBarMenuItems :menuItems="filteredMenuItems" />
  </SideBarMenu>
</template>

<script setup>
import { SideBarMenu, SideBarMenuItems } from '@/components/ui/sidebar-menu';
import useSideMenu from '@/composables/useSideMenu';
import { useAuthStore } from '@/app/auth/authStore.js';
import { onMounted, ref } from 'vue';

defineProps({
  sidebarCollapsed: { type: Boolean, required: true }
});

const authStore = useAuthStore();

const { menuItems } = useSideMenu();

const filteredMenuItems = ref(menuItems.value);

onMounted(() => {
  if (false) {
    filteredMenuItems.value = filteredMenuItems.value.filter((item) => item.key !== 'invoices');
  }
});
</script>
