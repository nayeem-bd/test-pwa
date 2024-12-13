<template>
  <Card>
    <CardHeader class="p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">Order Statistics</h2>
        <div>
          <Icon
            class="text-2xl"
            icon="mdi:chart-line"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="p-1">
        <div>
          <h4 class="text-center">Order count</h4>
          <BarChart
            class="h-48"
            :data="barChartData"
            index="name"
            :categories="['order']"
            :y-formatter="
              (tick, i) => {
                return typeof tick === 'number' ? `${tick}` : '';
              }
            "
            :rounded-corners="4"
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

const barChartData = [
  {
    name: 'Delivered',
    order: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Exchange',
    order: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Return',
    order: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Partial Delivered',
    order: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'DRTO',
    order: Math.floor(Math.random() * 2000) + 500
  }
];
</script>

<style lang="scss" scoped></style>
