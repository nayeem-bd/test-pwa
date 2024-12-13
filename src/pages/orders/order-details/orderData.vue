<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="col-span-1">
      <p class="my-4 text-muted-foreground">Order summary</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="min-w-[100px]"> Name </TableHead>
            <TableHead> Value </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Delivery fee:</TableCell>
            <TableCell>{{ order?.delivery_fee }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Collectable amount:</TableCell>
            <TableCell class="right-column">{{ order?.collectable_amount }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Collected amount:</TableCell>
            <TableCell class="right-column">{{ order?.collected_amount }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Cash on delivery fee:</TableCell>
            <TableCell class="right-column">{{ order?.cash_on_delivery_fee }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Additional charge:</TableCell>
            <TableCell class="right-column">{{ order?.additional_charge }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Discount:</TableCell>
            <TableCell class="right-column">{{ order?.discount }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Total fee:</TableCell>
            <TableCell class="right-column">{{ order?.total_fee }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Compensation cost:</TableCell>
            <TableCell class="right-column">{{ order?.compensation_cost }} tk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Pickup hub:</TableCell>
            <TableCell class="right-column">{{ order?.pickup_hub }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Current Hub:</TableCell>
            <TableCell class="right-column">{{ order?.current_hub }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Delivery hub:</TableCell>
            <TableCell class="right-column">{{ order?.target_hub }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Hub payment status:</TableCell>
            <TableCell class="right-column">Pending</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Invoice status:</TableCell>
            <TableCell class="right-column">Pending</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="left-column">Merchant payment status:</TableCell>
            <TableCell class="right-column">Pending</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div
      id="order_details"
      class="col-span-3"
      ref="editOrder"
    >
      <p class="my-4 text-muted-foreground">Order details</p>
      <form @submit.prevent="submitOrder">
        <TooltipProvider>
          <div class="grid grid-cols-1 content-start gap-4 md:grid-cols-3">
            <div class="self-end">
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Type Of Parcel</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.parcelType && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                v-model="order.item_type"
                :disabled="!isEditing"
              >
                <SelectTrigger class="mt-1 rounded-md border-gray-300 shadow-sm">
                  <SelectValue placeholder="Select Parcel Type" />
                </SelectTrigger>
                <SelectContent>
                  <div
                    v-for="parcel in parcelTypes"
                    :key="parcel.label"
                  >
                    <SelectItem :value="parcel.value">
                      {{ parcel.label }}
                    </SelectItem>
                  </div>
                </SelectContent>
              </Select>
              <span
                v-if="errors.parcelType"
                class="text-sm text-red-500"
                >{{ errors.parcelType }}</span
              >
            </div>

            <!-- Merchant Name -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Merchant Name</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.merchantName && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                v-model="order.merchant_name"
                :disabled="!isEditing"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <span
                v-if="errors.merchantName"
                class="text-sm text-red-500"
                >{{ errors.merchantName }}</span
              >
            </div>

            <!-- Merchant's Store Name -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Merchant's Store Name</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.storeName && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                v-model="order.store_name"
                :disabled="!isEditing"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <span
                v-if="errors.storeName"
                class="text-sm text-red-500"
                >{{ errors.storeName }}</span
              >
            </div>

            <!-- Recipient Name -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Recipient Name</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.recipientName && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                v-model="order.recipient_name"
                :disabled="!isEditing"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <span
                v-if="errors.recipientName"
                class="text-sm text-red-500"
                >{{ errors.recipientName }}</span
              >
            </div>

            <!-- Recipient Number -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Recipient Number</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.recipientNumber && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                v-model="order.recipient_phone_number"
                :disabled="!isEditing"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                maxlength="11"
              />
              <span
                v-if="errors.recipientNumber"
                class="text-sm text-red-500"
                >{{ errors.recipientNumber }}</span
              >
            </div>

            <!-- Collectable Amount -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Collectable Amount</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      :disabled="!isEditing"
                      class="ml-1 text-red-400"
                      :class="errors.CollectableAmount && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                v-model="order.collectable_amount"
                :disabled="!isEditing"
                type="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <span
                v-if="errors.CollectableAmount"
                class="text-sm text-red-500"
                >{{ errors.CollectableAmount }}</span
              >
            </div>

            <!-- Recipient City -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Recipient City</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.city && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <SelectBox
                labelKey="name"
                v-model="selectedCity"
                title="Select City"
                :options="locationStore.cities"
                :disabled="true"
              />
              <span
                v-if="errors.city"
                class="text-sm text-red-500"
                >{{ errors.city }}</span
              >
            </div>

            <!-- Recipient Zone -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Recipient Zone</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.zone && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <SelectBox
                labelKey="name"
                v-model="selectedZone"
                title="Select zone"
                :options="locationStore.zones"
                :disabled="true"
              />
              <span
                v-if="errors.zone"
                class="text-sm text-red-500"
                >{{ errors.zone }}</span
              >
            </div>

            <!-- Recipient Area (Optional) -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Recipient Area (Optional)</label
              >
              <SelectBox
                labelKey="name"
                v-model="selectedArea"
                title="Select Area"
                :options="locationStore.areas"
                :disabled="true"
              />
            </div>

            <!-- Product Weight -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Product Weight (kg)</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.weight && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                v-model="order.weight"
                :disabled="!isEditing"
                type="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <span
                v-if="errors.weight"
                class="text-sm text-red-500"
                >{{ errors.weight }}</span
              >
            </div>

            <!-- Product Quantity -->
            <div>
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700">Product Quantity</label>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Icon
                      icon="radix-icons:info-circled"
                      class="ml-1 text-red-400"
                      :class="errors.qty && 'text-red-600'"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This Field Is Required</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                v-model="order.quantity"
                :disabled="!isEditing"
                type="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <span
                v-if="errors.qty"
                class="text-sm text-red-500"
                >{{ errors.qty }}</span
              >
            </div>

            <!-- Recipeint address -->
            <div class="col-span-3">
              <label class="block text-sm font-medium text-gray-700">Recipient Address</label>
              <Textarea
                v-model="order.recipient_address"
                :disabled="!isEditing"
                class="mt-1 block w-1/2 resize-none rounded-md border-gray-300 shadow-sm"
              ></Textarea>
            </div>

<!--             Product Description-->
            <div class="col-span-3">
              <label class="block text-sm font-medium text-gray-700">Items Description</label>
              <Textarea
                v-model="order.item_description"
                :disabled="!isEditing"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              ></Textarea>
            </div>

            <!-- Special InsTableRowuctions (Optional) -->
            <div class="col-span-3">
              <label class="block text-sm font-medium text-gray-700"
                >Special Instruction (Optional)</label
              >
              <Textarea
                v-model="order.special_instaction"
                :disabled="!isEditing"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              ></Textarea>
            </div>
          </div>
          <!-- Submit Button -->
          <!--          <div class="flex justify-start gap-x-4 py-6">-->
          <!--            <button-->
          <!--              v-if="isEditing"-->
          <!--              type="submit"-->
          <!--              class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"-->
          <!--            >-->
          <!--              Save-->
          <!--            </button>-->
          <!--            <button-->
          <!--              v-if="!isEditing"-->
          <!--              class="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"-->
          <!--              @click="isEditing = true"-->
          <!--            >-->
          <!--              Edit order-->
          <!--            </button>-->
          <!--            <Button-->
          <!--              variant="destructive"-->
          <!--              @click="isEditing = false"-->
          <!--              >Cancel</Button-->
          <!--            >-->
          <!--          </div>-->
        </TooltipProvider>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose, onMounted } from 'vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@iconify/vue';
import { toast } from 'vue-sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Button from '@/components/ui/button/Button.vue';
import { useOrderStore } from '@/app/orders/orderStore.js';
import { useLocationStore } from '@/app/locations/locationStore.js';
import SelectBox from '@/components/SelectBox.vue';

const isEditing = ref(false);

const orderForm = ref({
  parcelType: '',
  merchantName: 'Ahmed hossain',
  storeName: 'Cloth store',
  recipientName: 'Hossain ahmed',
  recipientNumber: '01722222222',
  CollectableAmount: 200,
  city: 'Dhaka',
  zone: 'Banani',
  area: 'Banani',
  weight: '2.5kg',
  description: 'delivery urgent',
  qty: 2,
  insTableRowuctions: 'be careful with the parcel'
});

const parcelTypes = [
  { label: 'Documents', value: 'Documents' },
  { label: 'Parcel', value: 'Parcel' }
];
const errors = ref({});
const showSuccessAlert = ref(false);

const editOrder = ref();

// Function to validate form
const validateForm = () => {
  const currentErrors = {};
  if (!orderForm.value.parcelType) currentErrors.parcelType = 'Parcel type is required.';
  if (!orderForm.value.merchantName) currentErrors.merchantName = 'Merchant name is required.';
  if (!orderForm.value.storeName) currentErrors.storeName = 'Merchant’s store name is required.';
  if (!orderForm.value.recipientName) currentErrors.recipientName = 'Recipient name is required.';
  if (!orderForm.value.recipientNumber || orderForm.value.recipientNumber.length !== 11)
    currentErrors.recipientNumber = 'Recipient number must be 11 digits.';
  if (!orderForm.value.CollectableAmount || orderForm.value.CollectableAmount < 0)
    currentErrors.CollectableAmount = 'Collectable amount is required and must be non-negative.';
  if (!orderForm.value.city) currentErrors.city = 'Recipient city is required.';
  if (!orderForm.value.zone) currentErrors.zone = 'Recipient zone is required.';
  if (!orderForm.value.weight) currentErrors.weight = 'Product weight is required.';
  if (!orderForm.value.qty) currentErrors.qty = 'Product quantity is required.';
  errors.value = currentErrors;
  return Object.keys(currentErrors).length === 0;
};

const orderStore = useOrderStore();
const locationStore = useLocationStore();

const order = ref({});
const selectedCity = ref({});
const selectedZone = ref({});
const selectedArea = ref({});

onMounted(async () => {
  order.value = orderStore.order;

  await locationStore.fetchCities();
  await locationStore.fetchZones(order.value.customer_city_id);
  await locationStore.fetchAreas(order.value.customer_zone_id);

  locationStore.cities.forEach((city) => {
    if (city.id === order.value.customer_city_id) {
      selectedCity.value = city;
    }
  });

  locationStore.zones.forEach((zone) => {
    if (zone.id === order.value.customer_zone_id) {
      selectedZone.value = zone;
    }
  });

  locationStore.areas.forEach((area) => {
    if (area.id === order.value.customer_area_id) {
      selectedArea.value = area;
    }
  });
});

// Form submission handler
const submitOrder = () => {
  if (validateForm()) {
    showSuccessAlert.value = true;
    isEditing.value = false;
    toast.success('Order Edited');
  }
};

// Edite  order from parent
const setEditingTrue = (value) => {
  isEditing.value = value;
  editOrder.value.scrollIntoView({ behavior: 'smooth' });
};

defineExpose({ setEditingTrue });
</script>
