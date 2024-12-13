<template>
  <Card class="flex flex-col items-center justify-between">
    <CardHeader class="w-full p-4">
      <div class="flex items-center justify-between border-b border-gray-200 px-2 pb-2">
        <h2 class="text-xl">Order Info</h2>
        <div>
          <Icon
            class="text-2xl"
            icon="material-symbols:dashboard"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent class="w-full">
      <div class="flex w-full items-center justify-between p-1 py-4">
        <Tabs
          class="w-full"
          :default-value="currentTab.key"
          @update:modelValue="setCurrentComponent"
        >
          <TabsList class="w-full">
            <TabsTrigger value="orderListTab"> Order</TabsTrigger>
            <TabsTrigger value="deliveredOrderListTab"> Delivered Order</TabsTrigger>
            <TabsTrigger value="returnToVendorList"> Return To Vendor</TabsTrigger>
          </TabsList>
          <TabsContent :value="currentTab.key">
            <Transition mode="out-in">
              <component :is="currentTab.component" />
            </Transition>
          </TabsContent>
        </Tabs>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Icon } from '@iconify/vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { defineAsyncComponent, markRaw, reactive } from 'vue';

const componentMap = {
  orderListTab: {
    key: 'orderListTab',
    component: defineAsyncComponent(() => import('@/pages/dashboard/_components/OrderListTab.vue'))
  },
  deliveredOrderListTab: {
    key: 'deliveredOrderListTab',
    component: defineAsyncComponent(
      () => import('@/pages/dashboard/_components/DeliveredOrderListTab.vue')
    )
  },
  returnToVendorList: {
    key: 'returnToVendorList',
    component: defineAsyncComponent(
      () => import('@/pages/dashboard/_components/ReturnToVendorOrderListTab.vue')
    )
  }
};
let currentTab = reactive(markRaw(componentMap['orderListTab']));

const setCurrentComponent = (params) => {
  currentTab = componentMap[params];
};
</script>

<style scoped>
.v-enter-active {
  animation: slideIn 0.3s;
}

@keyframes slideIn {
  from {
    translate: -200px 0;
    opacity: 0;
  }
  to {
    translate: 0 0;
    opacity: 1;
  }
}

.v-leave-active {
  animation: slideOut 0.2s;
}

@keyframes slideOut {
  from {
    translate: 0 0;
    opacity: 1;
  }
  to {
    translate: 200px 0;
    opacity: 0;
  }
}
</style>
