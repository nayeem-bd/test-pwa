<template>
  <div class="flex flex-1 transition-all duration-200">
    <Sidebar />
    <div class="flex h-screen flex-1 flex-col">
      <TopBar />
      <ScrollArea class="relative flex flex-1 flex-col bg-sky-50/40 dark:bg-slate-900/20">
        <router-view v-slot="{ Component, route }">
          <transition
            name="fade"
            :key="route"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </ScrollArea>
    </div>
  </div>
</template>
<script setup>
import Sidebar from './_components/SideBar.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import TopBar from './_components/TopBar.vue';
</script>
