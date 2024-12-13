<template>
  <div class="space-y-4">
    <div class="grid rounded-md border border-y bg-card">
      <ScrollArea>
        <ScrollBar
          orientation="horizontal"
          class="z-[1]"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> ID </TableHead>
              <TableHead> Name </TableHead>
              <TableHead> Email </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="relative">
            <div
              v-if="operatorStore.isOperatorsFetching"
              class="absolute inset-0 flex items-center justify-center bg-background/80"
            >
              <LoadingOverlay
                :visiable="true"
                class="text-5xl"
              />
            </div>
            <template v-if="operatorStore.operators.length > 0">
              <TableRow
                v-for="(operator, index) in operatorStore.operators"
                :key="operator?.id ?? index"
              >
                <TableCell class="w-28 font-medium">
                  {{ operator?.id }}
                </TableCell>
                <TableCell class="min-w-[150px]">
                  {{ operator?.name }}
                </TableCell>
                <TableCell class="min-w-[150px]">
                  {{ operator?.email }}
                </TableCell>
                <TableCell class="min-w-[150px]">
                  {{ operator.is_active ? 'Activated' : 'Deactivated' }}
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
                      <DropdownMenuItem
                        v-if="operator?.is_active"
                        class="cursor-pointer"
                        >Edit</DropdownMenuItem
                      >
                      <DropdownMenuItem
                        v-if="operator?.is_active"
                        class="cursor-pointer"
                        >Deactivate</DropdownMenuItem
                      >
                      <DropdownMenuItem
                        v-else
                        class="cursor-pointer"
                        >Activate</DropdownMenuItem
                      >
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
                  <h1 class="font-semibol text-2xl">No operator found.</h1>
                  <p class="text-muted-foreground">
                    Please add new stores or adjust your search/filter criteria.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
    <!-- <div class="flex flex-wrap items-center justify-between gap-x-5 px-3 text-sm max-xs:gap-y-4">
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
    </div> -->
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
import { useMediaQuery } from '@vueuse/core';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import Input from '@/components/ui/input/Input.vue';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

import { Icon } from '@iconify/vue';

import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { Badge } from '@/components/ui/badge';
import { useOperatorStore } from '@/app/operators/operatorStore.js';

const operatorStore = useOperatorStore();
</script>
