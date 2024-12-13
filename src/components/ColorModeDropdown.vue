<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="h-10 w-10 items-center p-0"
      >
        <Icon
          :icon="colorModeIcon"
          class="h-5 w-5"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="mr-2"
    >
      <DropdownMenuItem @click="mode = 'light'">
        <span class="flex items-center gap-2">
          <Icon
            icon="radix-icons:sun"
            class="text-[1.1em]"
          />
          <span>Light</span>
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        <span class="flex items-center gap-2">
          <Icon
            icon="radix-icons:moon"
            class="text-[1.1em]"
          />
          <span>Dark</span>
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'"
        ><span class="flex items-center gap-2">
          <Icon
            icon="radix-icons:gear"
            class="text-[1.1em]"
          />
          <span>System</span>
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
<script setup>
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const mode = useColorMode({ disableTransition: false });

const colorModeIcon = computed(() => {
  return mode.value === 'light'
    ? 'radix-icons:sun'
    : mode.value === 'dark'
      ? 'radix-icons:moon'
      : 'radix-icons:gear';
});

//
</script>
