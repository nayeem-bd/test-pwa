<template>
  <div class="space-y-4">
    <div class="flex flex-wrap justify-between gap-4">
      <div class="flex-start flex flex-wrap gap-3">
        <div class="w-40">
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
              <TableHead> Invoice ID </TableHead>
              <TableHead> Invoice Date </TableHead>
              <TableHead> Order Count </TableHead>
              <TableHead> Receivable </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Actions </TableHead>
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
            <template v-if="invoices.length > 0">
              <TableRow
                v-for="(invoice, index) in invoices"
                :key="invoice?.id ?? index"
              >
                <TableCell class="min-w-[150px] font-medium">
                  <router-link
                    :to="{
                      name: 'OrderWiseInvoices',
                      state: { invoiceId: invoice.order_invoice_id }
                    }"
                  >
                    <div class="cursor-pointer text-primary">
                      {{ invoice?.order_invoice_id }}
                    </div>
                  </router-link>
                </TableCell>
                <TableCell class="min-w-[110px]">
                  {{ moment(invoice?.invoice_created_at).format('DD-MM-YYYY') }}
                </TableCell>
                <TableCell class="min-w-[100px]">
                  {{ invoice?.order_count }}
                </TableCell>
                <TableCell class="min-w-[100px]">
                  <div class="flex items-center gap-2">
                    <Icon icon="mdi:currency-bdt" />
                    <span>{{ invoice?.receivable_amount }}</span>
                  </div>
                  <span
                    class="cursor-pointer text-xs text-blue-500 underline"
                    @click="receivableBreakdownModal.show({})"
                    >Breakdown</span
                  >
                </TableCell>
                <TableCell class="min-w-[100px]">
                  <Badge
                    v-if="invoice.status === 'paid'"
                    variant="destructive"
                    class="rounded-md"
                  >
                    {{ invoice?.status }}
                  </Badge>
                  <Badge
                    v-else
                    class="rounded-md"
                  >
                    {{ invoice?.status }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button
                        variant="ghost"
                        size="xs"
                        ><Icon
                          icon="radix-icons:dots-horizontal"
                          class="h-4 w-4"
                      /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      class="w-[160px]"
                    >
                      <DropdownMenuItem>PDF</DropdownMenuItem>
                      <DropdownMenuItem>CSV</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
      <span class="text-muted-foreground">0 of 100 row(s) selected.</span>
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
  <receivable-breakdown-modal ref="receivable-breakdown-modal" />
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
import { onUpdated, ref, useTemplateRef } from 'vue';
import moment from 'moment';
import ReceivableBreakdownModal from '@/pages/invoices/_components/receivableBreakdownModal.vue';
const merchantStore = useMerchantStore();

const invoices = [
  {
    order_invoice_id: '250124DWNMV0R',
    invoice_created_at: '2024-01-25 09:00:31',
    status: 'unpaid',
    collected_amount: 8000,
    delivery_fee: 60,
    cod_fee: 40,
    receivable_amount: 7910,
    discount: 10,
    additional_charge: 0,
    compensation_cost: 0,
    order_count: 6
  },
  {
    order_invoice_id: '240124DHUEL3T',
    invoice_created_at: '2024-01-24 05:28:03',
    status: 'unpaid',
    collected_amount: 333416,
    delivery_fee: 43808.25,
    cod_fee: 1648.99,
    receivable_amount: 289521.76,
    discount: 3463,
    additional_charge: 1900,
    compensation_cost: 0,
    order_count: 3
  },
  {
    order_invoice_id: '230124DUS5MMN',
    invoice_created_at: '2024-01-23 18:35:04',
    status: 'paid',
    collected_amount: 11000,
    delivery_fee: 60,
    cod_fee: 55,
    receivable_amount: 10895,
    discount: 10,
    additional_charge: 0,
    compensation_cost: 0,
    order_count: 2
  },
  {
    order_invoice_id: '100823D37LFDU',
    invoice_created_at: '2023-08-10 09:26:59',
    status: 'processing',
    collected_amount: 1200,
    delivery_fee: 120,
    cod_fee: 6,
    receivable_amount: 1104,
    discount: 30,
    additional_charge: 0,
    compensation_cost: 0,
    order_count: 3
  }
];

const invoicesType = [
  { id: 1, name: 'All', value: 'all' },
  { id: 2, name: 'Unpaid', value: 'unpaid' },
  { id: 3, name: 'Paid', value: 'paid' }
];

const selectedType = ref('all');
const selectedDates = ref();

const receivableBreakdownModal = useTemplateRef('receivable-breakdown-modal');

// const

onUpdated(() => {
  console.log(selectedDates.value);
});
</script>
