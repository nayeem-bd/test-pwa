<template>
  <Card>
    <CardHeader class="p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">Recent Announcement</h2>
        <div>
          <Icon
            class="text-2xl"
            icon="mdi:loudspeaker"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <template v-if="items.length > 0">
        <div
          class="flex items-center justify-between p-1"
          v-for="item in items"
          :key="item.id"
        >
          <div class="mb-1 border-l border-gray-200 px-3 pb-2">
            <p class="text-md pb-2">{{ getItemTitle(item) }}</p>
            <p class="text-sm">{{ item.date }}</p>
          </div>
          <div>
            <Icon
              class="text-xl"
              icon="mdi:eye"
            />
          </div>
        </div>
      </template>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';

const titleLength = 30;

const items = [
  {
    id: 90,
    title: 'Tihar Operations 2081',
    date: 'Oct. 25, 2024, 1:57 p.m.'
  },
  {
    id: 45,
    title: 'Dashain Operations',
    date: 'Oct. 5, 2024, 6:11 p.m'
  },
  {
    id: 90,
    title: 'REDIRECT CHARGE Waived till 30 Kartik 2081 Ò',
    date: 'Oct. 4, 2024, 7:56 p.m'
  }
];

const getItemTitle = (item) => {
  if (item.title.length < titleLength) {
    return item.title;
  }

  return item.title.substring(0, titleLength) + '  .....';
};
</script>

<style lang="scss" scoped></style>
