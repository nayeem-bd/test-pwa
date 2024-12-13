<template>
  <div class="m-4 px-2 py-4">
    <div>
      <Card class="px-6 py-4">
        <CardContent class="grid grid-cols-8 p-1">
          <div class="col-span-6 flex w-full items-center justify-between">
            <div class="w-2/4">
              <h2 class="text-xl">Orders</h2>
            </div>
            <div class="w-3/4">
              <div class="flex w-full items-center gap-1.5">
                <Input
                  id="email"
                  type="email"
                  placeholder="Customer Search By Phone"
                />
                <Button
                  type="submit"
                  class="rounded-l-none rounded-r-full"
                >
                  <Icon
                    icon="ic:baseline-search"
                    class="mr-2 h-5 w-5"
                  />
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div class="col-span-2 grid grid-cols-6 items-center gap-3">
            <div class="col-span-5 justify-self-end">
              <RouterLink to="/orders/create">
                <Button
                  class="px-4 py-2"
                  size="small"
                >
                  Add Order
                </Button>
              </RouterLink>
            </div>
            <div class="col-span-1">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button
                    variant="ghost"
                    size="xs"
                  >
                    <Icon
                      icon="radix-icons:dots-horizontal"
                      class="h-4 w-4"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  class="w-full"
                >
                  <DropdownMenuItem>
                    <Button
                      size="small"
                      class="w-full px-2 py-1"
                      >Import Bulk Order
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      size="small"
                      class="w-full px-2 py-1"
                      >Print Pickup Order
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      size="small"
                      class="w-full px-2 py-1"
                      >Export
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div class="flex-start mt-4 flex flex-wrap gap-3">
      <Input
        placeholder="Enter Consignment Id"
        class="w-2/12"
      />
      <div class="w-2/12">
        <Select :disabled="storeStore.isStoresFetching">
          <SelectTrigger>
            <SelectValue placeholder="Select store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="(store, index) in storeStore.stores"
              :key="index"
              :value="`${store.id}`"
            >
              {{ store.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="w-2/12">
        <Select :disabled="storeStore.isStoresFetching">
          <SelectTrigger>
            <SelectValue placeholder="Select order status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="(status, index) in ['Pending', 'Delivered', 'Return', 'Exchange']"
              :key="index"
              :value="`${status}`"
            >
              {{ status }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DateRangePicker size="sm" />
    </div>
    <OrderList class="mt-4"></OrderList>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@iconify/vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu/index.js';
import { cn } from '@/lib/utils.js';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command/index.js';
import DateRangePicker from '@/components/DateRangePicker.vue';
import Input from '@/components/ui/input/Input.vue';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/index.js';
import { Badge } from '@/components/ui/badge/index.js';
import OrderList from '@/pages/orders/_components/OrderList.vue';
import { useStoreStore } from '@/app/stores/storeStore';
import { onMounted } from 'vue';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const storeStore = useStoreStore();

onMounted(async () => {
  await storeStore.fetchStores();
});
</script>
