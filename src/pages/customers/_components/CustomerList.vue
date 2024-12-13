<template>
  <div class="space-y-4">
    <div class="flex flex-wrap justify-between gap-4">
      <div class="flex-start flex flex-wrap gap-3">
        <Input
          placeholder="Name"
          class="h-9 w-[220px]"
        />

        <Input
          placeholder="Phone"
          class="h-9 w-[220px]"
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
              <TableHead> Name </TableHead>
              <TableHead> Phone </TableHead>
              <TableHead> Secondary Phone </TableHead>
              <TableHead> Customer Rating </TableHead>
              <TableHead> Action </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="relative">
            <div
              v-if="customerStore.isCustomersFetching"
              class="absolute inset-0 flex items-center justify-center bg-background/80"
            >
              <LoadingOverlay
                :visiable="true"
                class="text-5xl"
              />
            </div>
            <template v-if="customerStore.customers.length > 0">
              <TableRow
                v-for="(customer, index) in customerStore.customers"
                :key="customer?.id ?? index"
              >
                <TableCell class="min-w-[150px] font-medium">
                  <div>
                    {{ customer?.name }}
                  </div>
                </TableCell>
                <TableCell class="min-w-[150px]">
                  {{ customer?.phone }}
                </TableCell>
                <TableCell class="min-w-[150px]">
                  {{ customer?.secondary_phone }}
                </TableCell>
                <TableCell class="min-w-[100px]">
                  <Badge
                    variant="secondary"
                    class="rounded-md"
                    >{{ customer?.customer_rating }} %
                  </Badge>
                </TableCell>
                <TableCell class="min-w-[100px]">
                  <router-link :to="{ name: 'CustomerDetails', params: { id: customer.id } }">
                    <Button size="xs">View</Button>
                  </router-link>
                </TableCell>
              </TableRow>
            </template>
            <TableRow v-else>
              <TableCell
                colspan="10"
                class="p-10 text-center"
              >
                <div class="space-y-1">
                  <h1 class="font-semibol text-2xl">No customer found.</h1>
                  <p class="text-muted-foreground">Please adjust your search/filter criteria.</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-x-5 px-3 text-sm max-xs:gap-y-4">
      <!--      <span class="text-muted-foreground">0 of 100 row(s) selected.</span>-->
      <Pagination
        v-slot="{ page }"
        :total="customerStore.pagination.total"
        :sibling-count="1"
        :items-per-page="20"
        show-edges
        :default-page="customerStore.pagination.page"
        :page="customerStore.pagination.page"
        @update:page="
          (page) => {
            customerStore.setPagination({ page });
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
        <Select
          @update:modelValue="(value) => customerStore.setPagination({ per_page: +value })"
          :model-value="`${customerStore.pagination.per_page}`"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue placeholder="select row" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [20, 50, 100, 200]"
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

import { Input } from '@/components/ui/input';

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

const minPaginationsNumberDisplaySize = useMediaQuery('(min-width: 960px)');
import { Badge } from '@/components/ui/badge';

import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { useCustomerStore } from '@/app/customers/customerStore.js';
const customerStore = useCustomerStore();
</script>
