<template>
  <div class="space-y-4">
    <div class="flex flex-wrap justify-between gap-4">
      <div class="flex-start flex flex-wrap gap-3">
        <Input
          placeholder="Enter merchant ID"
          class="h-9 w-[220px]"
        />

        <Input
          placeholder="Merchant name/email/phone"
          class="h-9 w-[220px]"
        />

        <Input
          placeholder="Enter merchant store name"
          class="h-9 w-[220px]"
        />

        <DateRangePicker size="sm" />
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              class="border-dashed"
              size="sm"
            >
              <Icon
                icon="radix-icons:plus-circled"
                class="mr-2 h-4 w-4"
              />
              Merchant Status
              <Badge
                variant="secondary"
                class="ml-2 rounded-sm px-1 font-normal"
              >
                2
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            class="w-[200px] p-0"
            align="start"
          >
            <Command
              :filter-function="
                (list, term) => {
                  return list.filter((i) => i.label.toLowerCase()?.includes(term));
                }
              "
            >
              <CommandInput :placeholder="'Merchant Status'" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <template
                    v-for="option in ['Pending', 'Completed']"
                    :key="option"
                  >
                    <CommandItem :value="option">
                      <div
                        :class="
                          cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            false
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )
                        "
                      >
                        <Icon
                          icon="radix-icons:check"
                          class="h-5 w-5"
                        />
                      </div>
                      <Icon
                        icon="radix-icons:stopwatch"
                        class="mr-2 h-4 w-4 text-muted-foreground"
                      />
                      <span>{{ option }}</span>
                      <span
                        class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
                      >
                        {{ 22 }}
                      </span>
                    </CommandItem>
                  </template>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              class="border-dashed"
              size="sm"
            >
              <Icon
                icon="radix-icons:plus-circled"
                class="mr-2 h-4 w-4"
              />
              Document Status
              <Badge
                variant="secondary"
                class="ml-2 rounded-sm px-1 font-normal"
              >
                2
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            class="w-[200px] p-0"
            align="start"
          >
            <Command
              :filter-function="
                (list, term) => {
                  return list.filter((i) => i.label.toLowerCase()?.includes(term));
                }
              "
            >
              <CommandInput :placeholder="'Document Status'" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <template
                    v-for="option in ['Pending', 'Completed']"
                    :key="option"
                  >
                    <CommandItem :value="option">
                      <div
                        :class="
                          cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            false
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )
                        "
                      >
                        <Icon
                          icon="radix-icons:check"
                          class="h-5 w-5"
                        />
                      </div>
                      <Icon
                        icon="radix-icons:stopwatch"
                        class="mr-2 h-4 w-4 text-muted-foreground"
                      />
                      <span>{{ option }}</span>
                      <span
                        class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
                      >
                        {{ 22 }}
                      </span>
                    </CommandItem>
                  </template>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              size="sm"
            >
              <Icon
                icon="radix-icons:mixer-horizontal"
                class="mr-2 h-4 w-4"
              />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            class="w-[150px]"
          >
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              class="capitalize"
              :checked="true"
            >
              Invoice
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              class="capitalize"
              :checked="true"
            >
              Status
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              class="capitalize"
              :checked="true"
            >
              Title
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
              <TableHead> ID </TableHead>
              <TableHead>Merchant Details</TableHead>
              <TableHead>Business Owner</TableHead>
              <TableHead> Account </TableHead>
              <TableHead> Time </TableHead>
              <TableHead></TableHead>
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
            <template v-if="merchantStore.merchants.length > 0">
              <TableRow
                v-for="(merchant, index) in merchantStore.merchants"
                :key="merchant?.id ?? index"
              >
                <TableCell class="min-w-[100px font-medium">
                  {{ merchant?.id }}
                </TableCell>
                <TableCell class="w-[330px] min-w-[230px]">
                  <ul>
                    <li><span class="font-semibold">Name: </span>{{ merchant?.name }}</li>
                    <li><span class="font-semibold">Name: </span>{{ merchant?.address }}</li>
                  </ul>
                </TableCell>
                <TableCell class="w-[350px] min-w-[200px]">
                  <ul>
                    <li><span class="font-semibold">Name: </span>{{ merchant?.owner?.name }}</li>
                    <li><span class="font-semibold">Number: </span>{{ merchant?.owner?.phone }}</li>
                    <li><span class="font-semibold">Email: </span>{{ merchant?.owner?.email }}</li>
                  </ul>
                </TableCell>
                <TableCell class="w-[230px] min-w-[230px]">
                  <ul>
                    <li>
                      <span class="font-semibold">2nd Last Week: </span
                      >{{ merchant?.second_last_week_request }} /
                      {{ merchant?.second_last_week_delivered }}
                    </li>
                    <li>
                      <span class="font-semibold">Last Week: </span
                      >{{ merchant?.last_week_request }} /
                      {{ merchant?.last_week_delivered }}
                    </li>
                  </ul>
                </TableCell>
                <TableCell class="min-w-[230px]">
                  <ul>
                    <li>
                      <span class="font-semibold">Created: </span
                      >{{ dayjs(merchant?.created_at).format('DD-MM-YYYY hh:mm A') }}
                    </li>
                    <li>
                      <span class="font-semibold">Approved: </span
                      >{{ dayjs(merchant?.approve_at).format('DD-MM-YYYY hh:mm A') }}
                    </li>
                  </ul>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Discount</DropdownMenuItem>
                      <DropdownMenuItem>Stores</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuItem>Email T&C</DropdownMenuItem>
                      <DropdownMenuItem>SUMMARY</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem danger> Delete </DropdownMenuItem>
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
                  <h1 class="font-semibol text-2xl">No merchants found.</h1>
                  <p class="text-muted-foreground">
                    Please add new merchants or adjust your search/filter criteria.
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
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
  TableFooter
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
import { useMediaQuery, useWindowSize } from '@vueuse/core';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import Input from '@/components/ui/input/Input.vue';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';

import { Icon } from '@iconify/vue';
const minPaginationsNumberDisplaySize = useMediaQuery('(min-width: 960px)');
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import DateRangePicker from '@/components/DateRangePicker.vue';

import dayjs from 'dayjs';
import { useMerchantStore } from '@/app/merchants/merchantStore';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
const merchantStore = useMerchantStore();
</script>
