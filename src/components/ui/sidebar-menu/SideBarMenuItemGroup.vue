<script setup>
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { inject, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { cn } from '@/lib/utils';
const props = defineProps({
  icon: String,
  label: String,
  children: Array,
  active: Boolean
});

const isOpen = ref(props.active);
const collapsed = inject('collapsed');
const isActive = ref(props.active);
const isPopoverOpen = ref(false);

const paths = props.children.map((menuItem) => {
  if (!menuItem?.to) return null;
  if (typeof menuItem.to === 'string') return menuItem.to;
  if (typeof menuItem.to === 'object' && !Array.isArray(menuItem)) {
    return menuItem.to.path;
  }
});

const route = useRoute();
onBeforeMount(() => {
  if (paths.includes(route.path)) {
    isOpen.value = true;
  }
});

watch(
  () => route.path,
  (newPath) => {
    if (paths.includes(newPath)) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
    isPopoverOpen.value = false;
  },
  {
    immediate: true
  }
);

watch(collapsed, (collapsed) => {
  if (collapsed) {
    isOpen.value = false;
  }
});

//
</script>

<template>
  <Collapsible
    v-if="!collapsed"
    v-model:open="isOpen"
  >
    <div class="flex flex-col">
      <Button
        :class="
          cn('justify-between hover:bg-slate-200 dark:hover:bg-slate-800', {
            '!text-primary': isActive
          })
        "
        variant="ghost"
        size="sm"
        @click="isOpen = !isOpen"
      >
        <span class="flex items-center gap-2">
          <span
            ><Icon
              class="h-4 w-4"
              :icon="$props.icon"
          /></span>
          <span data-collapsed="hide">{{ $props.label }}</span>
        </span>
        <span data-collapsed="hide">
          <Icon
            icon="radix-icons:caret-down"
            class="h-5 w-5"
          /> </span
      ></Button>
    </div>
    <CollapsibleContent>
      <div class="flex flex-1 flex-col rounded-md bg-slate-50 dark:bg-slate-900">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>

  <Popover
    v-model:open="isPopoverOpen"
    v-else
  >
    <div class="flex flex-col">
      <PopoverTrigger as-child>
        <Button
          :class="
            cn('justify-between hover:bg-slate-200 dark:hover:bg-slate-800', {
              '!text-primary': isActive
            })
          "
          variant="ghost"
          size="sm"
        >
          <span class="flex items-center gap-2">
            <span
              ><Icon
                class="h-4 w-4"
                :icon="$props.icon"
            /></span>
            <span data-collapsed="hide">{{ $props.label }}</span>
          </span>
          <span data-collapsed="hide">
            <Icon
              icon="radix-icons:caret-down"
              class="h-5 w-5"
            /> </span
        ></Button>
      </PopoverTrigger>
    </div>
    <PopoverContent
      side="left"
      class="w-auto p-2"
    >
      <div class="flex flex-1 flex-col rounded-md">
        <slot />
      </div>
    </PopoverContent>
  </Popover>
</template>
