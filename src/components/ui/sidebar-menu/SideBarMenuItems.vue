<script setup>
import { SideBarMenuItem, SideBarMenuItemGroup } from '@/components/ui/sidebar-menu';

// Recursively render menu items
defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <template
    v-for="(menuItem, index) in menuItems"
    :key="menuItem?.key ?? index"
  >
    <!-- Check if menuItem has children -->
    <template v-if="menuItem?.children && menuItem?.children?.length > 0">
      <SideBarMenuItemGroup
        :label="menuItem?.label"
        :icon="menuItem?.icon"
        :active="menuItem?.active"
        :children="menuItem?.children ?? []"
      >
        <!-- Recursive rendering for children -->
        <SideBarMenuItems :menuItems="menuItem.children" />
      </SideBarMenuItemGroup>
    </template>

    <!-- Render a simple menu item if no children -->
    <SideBarMenuItem
      v-else
      :label="menuItem?.label"
      :icon="menuItem?.icon"
      :to="menuItem?.to"
    />
  </template>
</template>
