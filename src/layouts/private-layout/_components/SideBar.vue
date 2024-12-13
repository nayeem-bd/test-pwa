<template>
  <div
    :class="
      cn('flex h-screen w-[220px] flex-col gap-3 transition-all duration-200 md:border-r', {
        'w-0 md:w-[60px]': sidebarCollapsed,
        'max-md:border-r': !sidebarCollapsed
      })
    "
  >
    <div class="relative flex h-[var(--top-nav-height)] items-center">
      <h1
        :class="
          cn(
            'w-full overflow-x-hidden pl-5 text-2xl font-bold uppercase transition-all duration-300'
          )
        "
      >
        <span class="text-sky-400">M</span><span v-if="!delaySideBarCollapsed">erchant Panel</span>
      </h1>
      <div class="absolute right-0 z-10 flex translate-x-1/2 max-md:hidden">
        <Button
          size="xs"
          variant="outline"
          class="h-6 w-6 rounded-full p-0"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <Icon
            icon="radix-icons:caret-left"
            :class="
              cn('h-12 w-12 transition-transform', {
                'scale-x-[-1]': sidebarCollapsed
              })
            "
          />
        </Button>
      </div>
      <div class="absolute -right-[70px] top-0 z-10 flex h-full items-center md:hidden">
        <Button
          @click="sidebarCollapsed = !sidebarCollapsed"
          variant="none"
          class="text-primary"
        >
          <Icon
            icon="radix-icons:hamburger-menu"
            :class="
              cn('h-8 w-8 transition-transform', {
                'scale-x-[-1]': sidebarCollapsed
              })
            "
          />
        </Button>
      </div>
    </div>
    <ScrollArea class="relative flex-1">
      <SideMenu :sidebarCollapsed="delaySideBarCollapsed" />
    </ScrollArea>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { cn, delay } from '@/lib/utils';
import SideMenu from './SideMenu.vue';
import { ref, watch } from 'vue';
import { useMediaQuery, useWindowSize } from '@vueuse/core';
import { ScrollArea } from '@/components/ui/scroll-area';
import router from '@/routers';

const sidebarCollapsed = ref(false);

const delaySideBarCollapsed = ref(false);

const maxCollapsedExcced = useMediaQuery('(max-width: 1125px)');

const { width } = useWindowSize();

watch(
  () => maxCollapsedExcced.value,
  (value) => {
    sidebarCollapsed.value = value;
  },
  { immediate: true }
);

watch(
  () => sidebarCollapsed.value,
  async (value) => {
    if (value) {
      await delay(150);
    }
    delaySideBarCollapsed.value = value;
  },
  { immediate: true }
);

router.afterEach(() => {
  if (width.value < 768) {
    sidebarCollapsed.value = true;
  }
});

//
</script>
