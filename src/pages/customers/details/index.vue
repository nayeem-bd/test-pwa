<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="flex justify-between">
      <div class="w-1/2 space-y-6">
        <div class="items-center justify-between space-y-3 sm:flex">
          <div class="space-y-1">
            <h2 class="text-3xl font-bold tracking-tight">{{ customerStore.customer?.name }}</h2>
            <p class="text-muted-foreground">{{ customerStore.customer?.phone }}</p>
          </div>
        </div>
        <div>
          <div>Registered Address</div>
          <ul class="ml-3 mt-2 list-disc">
            <li>Banani, 10</li>
            <li>MOhakali dohs</li>
          </ul>
          <div class="text-lg font-medium">
            Customer Successful Delivery Rate:{{ customerStore.customer?.customer_rating }}%
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <OrderStats />
      </div>
    </div>

    <div>
      <OrderList :id />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import OrderList from './_components/OrderList.vue';
import { useCustomerStore } from '@/app/customers/customerStore.js';
import OrderStats from '@/pages/customers/details/_components/OrderStats.vue';

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
});

const customerStore = useCustomerStore();

onMounted(async () => {
  await customerStore.fetchCustomer(id);
});
</script>

<style scoped></style>
