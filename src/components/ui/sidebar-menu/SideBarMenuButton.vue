<script setup>
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const props = defineProps({
  icon: String,
  label: String,
  isActive: Boolean,
  isExactActive: Boolean
});
</script>

<template>
  <Button
    :class="
      cn('justify-between hover:bg-slate-200 dark:hover:bg-slate-800', {
        '!text-primary': isActive && isExactActive
      })
    "
    variant="ghost"
    size="sm"
  >
    <span class="flex items-center gap-2">
      <span
        ><Icon
          class="h-4 w-4"
          :icon="$props.icon ?? 'mdi:menu-right'"
      /></span>
      <span
        data-collapsed="hide"
        class="w-[140px] truncate text-start"
        >{{ $props.label }}
      </span>
    </span>
  </Button>
</template>
