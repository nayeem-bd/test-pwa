<template>
  <div
    class="w-full"
    ref="selectbox"
  >
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-full justify-between"
          :disabled="disabled"
        >
          {{ modelValue?.[labelKey] ?? title }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="max-w-[400px] p-0"
        align="start"
        :style="{ width: optionsMaxWidth + 'px' }"
      >
        <Command
          :filter-function="
            (list, term) => list.filter((i) => i[labelKey].toLowerCase()?.includes(term))
          "
        >
          <CommandInput
            class="h-9"
            :placeholder="title"
          />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="option in options"
                :key="option[labelKey]"
                :value="option"
                @select="onSelect(option)"
              >
                {{ option[labelKey] }}
                <Check
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      modelValue[labelKey] === option[labelKey] ? 'opacity-100' : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
<script setup>
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-vue-next';
import { computed, ref, useTemplateRef } from 'vue';

const selectbox = useTemplateRef('selectbox');

const optionsMaxWidth = computed(() => {
  return selectbox.value?.offsetWidth ?? 400;
});

const props = defineProps({
  title: String,
  options: Object,
  modelValue: {
    type: Object,
    required: true
  },
  labelKey: {
    type: String,
    default: 'name'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const open = ref(false);
const emit = defineEmits(['update:modelValue']);

const onSelect = (option) => {
  const isSelected = props.modelValue[props.labelKey] === option[props.labelKey];
  let newSelected = {};

  if (!isSelected) {
    newSelected = option;
    open.value = false;
  }
  emit('update:modelValue', newSelected);
};
</script>
