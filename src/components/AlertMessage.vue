<template>
  <div :class="[alertClass, 'space-y-2 rounded-md']">
    <div class="flex">
      <Icon
        :icon="iconComponent"
        class="mr-2 h-5 w-5"
      />
      <div>
        <h3 class="-mt-[3px] font-bold">{{ title }}</h3>
        <p class="text-sm text-foreground/90">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icon } from '@iconify/vue';

// Define props for the alert component
const props = defineProps({
  type: {
    type: String,
    default: '', // Default alert type
    validator: (value) => ['success', 'info', 'warning', 'error'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Mapping icons based on the alert type
const iconComponent = computed(() => {
  switch (props.type) {
    case 'success':
      return 'fa:check-circle';
    case 'info':
      return 'fa-solid:info-circle';
    case 'warning':
      return 'fa:warning';
    case 'error':
      return 'fontisto:close';
    default:
      return 'fa:question-circle';
  }
});

// Mapping Tailwind colors based on the alert type
const alertClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'border bg-green-500/10 text-green-800 text-green-600 border-green-500/60 p-4';
    case 'info':
      return 'border bg-primary/5 border-primary/60 text-primary p-4';
    case 'warning':
      return 'border bg-yellow-500/10 text-yellow-800 text-yellow-600 border-yellow-500/60 p-4';
    case 'error':
      return 'border bg-red-500/10 text-red-500 border-red-500/60 p-4';
    default:
      return 'border bg-teal-500/10 text-teal-500 border-teal-500/60 p-4';
  }
});
</script>
