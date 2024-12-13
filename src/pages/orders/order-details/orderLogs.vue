<template>
  <div class="space-y-4">
    <p class="text-muted-foreground">Order log history</p>
    <div class="grid rounded-md border border-y bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Log date</TableHead>
            <TableHead>Log age</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="relative">
          <TableRow
            v-for="(order, index) in orders"
            :key="order.id ?? index"
          >
            <TableCell class="min-w-[20px]">{{ order.logDate }}</TableCell>
            <TableCell class="min-w-[150px]">{{ order.logAge }}</TableCell>
            <TableCell class="min-w-[150px]">{{ order.description }}</TableCell>
            <TableCell class="min-w-[150px]">
              <Button @click="handleAction(order.id)">View log</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <OrderLogModal ref="orderLogModalRef" />
  </div>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import OrderLogModal from '../processing/_components/OrderLogModal.vue';
import { ref } from 'vue';

const orders = [
  {
    id: 1,
    logDate: '2024-10-01',
    logAge: '2 days',
    description: 'Order was shipped.'
  },
  {
    id: 2,
    logDate: '2024-09-28',
    logAge: '5 days',
    description: 'Order is in transit.'
  },
  {
    id: 3,
    logDate: '2024-09-25',
    logAge: '8 days',
    description: 'Order has been delivered.'
  },
  {
    id: 4,
    logDate: '2024-09-20',
    logAge: '13 days',
    description: 'Order was canceled.'
  }
];

const orderLogModalRef = ref();

// Action handler
const handleAction = (id) => {
  console.log(`Action for order ID: ${id}`);
  orderLogModalRef.value.show();
};
</script>
