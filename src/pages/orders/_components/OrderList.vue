<template>
  <div>
    <Card class="py-4">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Consignment ID</TableHead>
              <TableHead>Merchant Order ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Order status</TableHead>
              <TableHead>Collectable amount</TableHead>
              <TableHead>Recipient Info</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="order in orderStore.orders"
              :key="order.id"
            >
              <TableCell class="font-medium">{{ order?.consignment_id }}</TableCell>
              <TableCell>{{ order?.merchant_order_id }}</TableCell>
              <TableCell>{{ moment(order?.created_at).format('DD-MM-YYYY') }}</TableCell>
              <TableCell>{{ order?.order_status ?? 'Pending' }}</TableCell>
              <TableCell>
                <div class="flex items-center gap-1">
                  <Icon icon="mdi:currency-bdt" />
                  <span>{{ order?.collectable_amount }}</span>
                </div></TableCell
              >
              <TableCell>
                <ul>
                  <li>
                    <span class="font-semibold">Name: </span>{{ order?.recipient_name || 'N/A' }}
                  </li>
                  <li>
                    <span class="font-semibold">Address: </span
                    >{{ order?.recipient_address || 'N/A' }}
                  </li>
                  <li>
                    <span class="font-semibold">Phone: </span
                    >{{ order?.recipient_phone_number || 'N/A' }}
                  </li>
                </ul>
              </TableCell>
              <TableCell>
                <Button size="small">
                  <router-link
                    :to="{ name: 'OrderDetails', params: { consignmentId: order.consignment_id } }"
                  >
                    <Icon
                      icon="mdi:eye-outline"
                      class="text-center text-2xl"
                    ></Icon>
                  </router-link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div class="flex justify-center">
          <Pagination
            v-slot="{ page }"
            :total="orderStore.orders.length"
            :sibling-count="1"
            show-edges
            :default-page="1"
            :items-per-page="1"
          >
            <PaginationList
              v-slot="{ orders }"
              class="flex items-center gap-1"
            >
              <PaginationFirst />
              <PaginationPrev />

              <template v-for="(item, index) in orders">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  as-child
                >
                  <Button
                    class="h-10 w-10 p-0"
                    :variant="item.value === page ? 'default' : 'outline'"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis
                  v-else
                  :key="item.type"
                  :index="index"
                />
              </template>

              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination';
import Input from '../../../components/ui/input/Input.vue';
import { Card, CardContent } from '@/components/ui/card';
import { useOrderStore } from '@/app/orders/orderStore.js';
import { onMounted } from 'vue';
import moment from 'moment';

const orderStore = useOrderStore();

onMounted(async () => {
  await orderStore.fetchOrders();
});
</script>
