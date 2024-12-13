<template>
  <div class="space-y-4">
    <div class="flex flex-wrap justify-between gap-4">
      <div class="flex-start flex flex-wrap gap-3">
        <div class="w-36">
          <Select v-model="selectedType">
            <SelectTrigger>
              <SelectValue placeholder="Invoice Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="(type, index) in invoicesType"
                :key="index"
                :value="type?.value"
              >
                {{ type?.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="w-44">
          <Input
            v-model="selectedInvoiceId"
            type="text"
            placeholder="Enter Invoice ID"
          />
        </div>
        <div class="w-48">
          <Input
            v-model="selectedPhone"
            type="text"
            placeholder="Enter recipient phone"
          />
        </div>
        <div class="w-48">
          <Select v-model="selectedStore">
            <SelectTrigger>
              <SelectValue placeholder="Select Store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="(store, index) in storeStore.stores"
                :key="index"
                :value="`${store.id}`"
              >
                {{ store?.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DateRangePicker
          v-model="selectedDates"
          size="sm"
        />
      </div>
    </div>
    <div class="grid rounded-md border border-y bg-card">
      <ScrollArea>
        <ScrollBar
          orientation="horizontal"
          class="z-[1]"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Consignment ID </TableHead>
              <TableHead> Invoice Info </TableHead>
              <TableHead> Recipient Info </TableHead>
              <TableHead> Store </TableHead>
              <TableHead> Receivable </TableHead>
              <TableHead> Order Status </TableHead>
              <TableHead> Invoice Type </TableHead>
              <TableHead> Invoice Status </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="relative">
            <div
              v-if="merchantStore.isMerchantsFetching"
              class="absolute inset-0 flex items-center justify-center bg-background/80"
            >
              <LoadingOverlay
                :visiable="true"
                class="text-5xl"
              />
            </div>
            <template v-if="orders.length > 0">
              <TableRow
                v-for="(order, index) in orders"
                :key="order?.id ?? index"
              >
                <TableCell class="min-w-[150px] font-medium">
                  {{ order?.consignment_id }}
                </TableCell>
                <TableCell class="min-w-[150px]">
                  <div>
                    <div><span class="font-medium"> ID: </span> 240124DHUEL3T</div>
                    <div>
                      <span class="font-medium"> Date: </span>
                      {{ moment(order?.created_at).format('DD-MM-YYYY') }}
                    </div>
                  </div>
                </TableCell>
                <TableCell class="min-w-[150px]">
                  <div class="flex flex-col gap-1">
                    <div>
                      <span class="font-medium">Name:</span>
                      {{ order?.recipient_name }}
                    </div>
                    <div>
                      <span class="font-medium">Phone:</span>
                      {{ order?.recipient_phone }}
                    </div>
                  </div>
                </TableCell>
                <TableCell class="min-w-[100px]">
                  <div>Test Store</div>
                </TableCell>
                <TableCell class="min-w-[100px]">
                  <div class="flex items-center gap-2">
                    <Icon icon="mdi:currency-bdt" />
                    <span>{{ order?.payout }}</span>
                  </div>
                  <span
                    class="cursor-pointer text-xs text-blue-500 underline"
                    @click="orderReceivableBreakdownModal.show({})"
                    >Breakdown
                  </span>
                </TableCell>
                <TableCell class="min-w-[100px]">
                  {{ `Delivered` }}
                </TableCell>
                <TableCell class="min-w-[100px]">
                  {{ order?.invoice_type }}
                </TableCell>
                <TableCell class="min-w-[100px]">
                  <Badge
                    variant="secondary"
                    class="rounded-md"
                  >
                    Paid
                    <!-- {{ order?.invoice_type }} -->
                  </Badge>
                </TableCell>
              </TableRow>
            </template>
            <TableRow v-else>
              <TableCell
                colspan="10"
                class="p-10 text-center"
              >
                <div class="space-y-1">
                  <h1 class="font-semibol text-2xl">No invoice found.</h1>
                  <p class="text-muted-foreground">
                    Please add new invoice or adjust your search/filter criteria.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-x-5 px-3 text-sm max-xs:gap-y-4">
      <Pagination
        v-slot="{ page }"
        :total="merchantStore.pagination.total"
        :sibling-count="1"
        :items-per-page="20"
        show-edges
        :default-page="merchantStore.pagination.page"
        :page="merchantStore.pagination.page"
        @update:page="
          (page) => {
            merchantStore.setPage(page);
          }
        "
      >
        <PaginationList
          v-slot="{ items }"
          class="flex items-center gap-1"
        >
          <PaginationFirst class="h-8 w-8" />
          <PaginationPrev class="h-8 w-8" />

          <template v-if="minPaginationsNumberDisplaySize">
            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="h-8 w-8 p-0"
                  :variant="item.value === page ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis
                v-else
                :key="item.type"
                :index="index"
              /> </template
          ></template>
          <PaginationNext class="h-8 w-8" />
          <PaginationLast class="h-8 w-8" />
        </PaginationList>
      </Pagination>

      <div class="flex items-center gap-5">
        <span class="text-muted-foreground"> Rows per page</span>
        <Select>
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
  <order-receivable-breakdown-modal ref="orderReceivableBreakdownModal" />
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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

import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@vueuse/core';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

import { Icon } from '@iconify/vue';
const minPaginationsNumberDisplaySize = useMediaQuery('(min-width: 960px)');
import { Badge } from '@/components/ui/badge';
import DateRangePicker from '@/components/DateRangePicker.vue';

import { useMerchantStore } from '@/app/merchants/merchantStore';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { onMounted, onUpdated, ref, useTemplateRef } from 'vue';
import moment from 'moment';
import { Input } from '@/components/ui/input/index.js';
import { useStoreStore } from '@/app/stores/storeStore.js';
import { useRoute } from 'vue-router';
import OrderReceivableBreakdownModal from '@/pages/invoices/order-wise/_components/orderReceivableBreakdownModal.vue';
const merchantStore = useMerchantStore();

const orders = [
  {
    consignment_id: 'DD080522YJJWJV',
    created_at: '2022-05-08 12:10:09',
    invoice_type: 'partial',
    collected_amount: 500,
    recipient_name: 'mr tango charlee',
    recipient_phone: '01712826794',
    collectable_amount: 1000,
    cash_on_delivery_fee: 0,
    delivery_fee: 70,
    final_fee: 120,
    discount: 0,
    additional_charge: 50,
    compensation_cost: 0,
    promo_discount: 0,
    payout: 380,
    merchant_order_id: 'N/A',
    invoice_ticket_id: null
  },
  {
    consignment_id: 'DD080522NVGNVE',
    created_at: '2022-05-08 12:10:11',
    invoice_type: 'delivery',
    collected_amount: 1000,
    recipient_name: 'mr tango charlee',
    recipient_phone: '01712826794',
    collectable_amount: 1000,
    cash_on_delivery_fee: 0,
    delivery_fee: 70,
    final_fee: 120,
    discount: 0,
    additional_charge: 50,
    compensation_cost: 0,
    promo_discount: 0,
    payout: 880,
    merchant_order_id: 'N/A',
    invoice_ticket_id: null
  }
];

const invoicesType = [
  { id: 1, name: 'All', value: 'all' },
  { id: 2, name: 'Partial', value: 'partial' },
  { id: 3, name: 'Delivery', value: 'delivery' },
  { id: 4, name: 'Return', value: 'return' }
];

const selectedType = ref('all');
const selectedDates = ref();
const selectedStore = ref();
const selectedPhone = ref('');
const selectedInvoiceId = ref('');
const orderReceivableBreakdownModal = useTemplateRef('orderReceivableBreakdownModal');

const storeStore = useStoreStore();

const invoiceId = history.state.invoiceId || '';

const route = useRoute();

onMounted(async () => {
  await storeStore.fetchStores();
  selectedInvoiceId.value = invoiceId;
  history.state.invoiceId = '';
});

onUpdated(async () => {
  // fetch list
});
</script>
