<template>
  <Sheet v-model:open="open">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Receivable Breakdown</SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid rounded-md border border-y bg-card">
          <Table class="w-full">
            <TableHeader>
              <TableRow class="">
                <TableHead class="flex justify-between">
                  <span> Invoice ID </span>
                  <span>250124DWNMV0R</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody class="relative">
              <TableRow>
                <TableCell class="flex justify-between">
                  <div>Collectable amount</div>
                  <div class="flex items-center">
                    <Icon icon="mdi:currency-bdt" />
                    <span>1000</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="flex justify-between">
                  <div>Collected amount</div>
                  <div class="flex items-center">
                    <Icon icon="mdi:currency-bdt" />
                    <span>800</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="flex justify-between">
                  <div>Delivery fee</div>
                  <div class="flex items-center">
                    <Icon icon="mdi:currency-bdt" />
                    <span>1000</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="flex justify-between">
                  <div>COD fee</div>
                  <div class="flex items-center">
                    <Icon icon="mdi:currency-bdt" />
                    <span>1000</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="flex justify-between">
                  <div>Discount</div>
                  <div class="flex items-center">
                    <Icon icon="mdi:currency-bdt" />
                    <span>-1000</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="flex justify-between">
                  <div>Total fee</div>
                  <div class="flex items-center">
                    <Icon icon="mdi:currency-bdt" />
                    <span>1000</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="flex justify-between">
                  <div>Receivable Amount</div>
                  <div class="flex items-center">
                    <Icon icon="mdi:currency-bdt" />
                    <span>1000</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const open = ref(false);
const amount = ref({});

const show = (prices) => {
  amount.value = prices;
  open.value = true;
};

defineExpose({ show });
</script>
