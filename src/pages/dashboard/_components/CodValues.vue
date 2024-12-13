<template>
  <Card>
    <CardHeader class="p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">COD Values</h2>
        <div>
          <Icon
            class="text-2xl"
            icon="mdi:currency-bdt"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="p-1">
        <div>
          <h4 class="py-2 text-center">Order COD values in last 7 days</h4>
          <BarChart
            class="h-48"
            :data="data"
            index="name"
            :categories="['total']"
            :y-formatter="
              (tick, i) => {
                return typeof tick === 'number'
                  ? `৳ ${new Intl.NumberFormat('us').format(tick).toString()}`
                  : '';
              }
            "
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';
import { BarChart } from '@/components/ui/chart-bar/index.js';
import { onMounted, onUpdated, ref } from "vue";

const props = defineProps({
  last7days: {
    type: Object,
    required: true
  }
});

const data = ref([]);

onUpdated(() => {
  Object.keys(props.last7days).forEach((key) => {
    data.value.push({
      name: key,
      total: props.last7days[key]
    });
  });
});
</script>

<style lang="scss" scoped></style>
