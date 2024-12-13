<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :variant="'outline'"
          :size="size"
          :class="
            cn(
              'w-[230px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              fieldClass
            )
          "
        >
          <CalendarIcon class="mr-2 h-4 w-4" />

          <template v-if="value.start">
            <template v-if="value.end">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else> Pick a date </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="w-auto p-0"
        align="end"
      >
        <RangeCalendar
          v-model="value"
          :number-of-months="1"
          initial-focus
          :min-value="new CalendarDate(1900, 1, 1)"
          :max-value="today(getLocalTimeZone())"
          :placeholder="value.start"
          @update:start-value="(startDate) => (value.start = startDate)"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup>
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';

import { ref, watch } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
});

const props = defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'xs', 'sm', 'lg', 'icon'].includes(value)
  },
  fieldClass: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const value = ref({});

const emit = defineEmits(['update:modelValue']);

watch(value, () => {
  emit('update:modelValue', value.value);
});
</script>
