<template>
  <div class="space-y-6 p-6 pb-20">
    <div>
      <Card class="px-6 py-4">
        <CardHeader class="p-0">
          <h2 class="text-center text-2xl">Create New Order</h2>
        </CardHeader>
        <CardContent class="flex gap-6 p-1">
          <form
            @submit="handleCreateOrder"
            class="w-full"
          >
            <div class="grid gap-4">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                <FormField
                  v-slot="{ componentField }"
                  name="product_type"
                >
                  <FormItem class="space-y-1">
                    <FormLabel> Item Type </FormLabel>
                    <FormControl>
                      <Select
                        v-bind="componentField"
                        :disabled="orderStore.isOrderCreating"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1"> Parcel </SelectItem>
                            <SelectItem value="2"> Document </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="store_id"
                >
                  <FormItem class="space-y-1">
                    <FormLabel> Store </FormLabel>
                    <FormControl>
                      <Select
                        v-bind="componentField"
                        :disabled="orderStore.isOrderCreating"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select store" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              v-for="(store, index) in storeStore.stores"
                              :key="index"
                              :value="`${store.id}`"
                            >
                              {{ store.name }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField
                  v-slot="{ componentField }"
                  name="merchant_order_id"
                >
                  <FormItem class="space-y-1">
                    <FormLabel> Merchant Order ID (Optional) </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter merchant order ID"
                        type="text"
                        autoapitalize="none"
                        autocomplete="none"
                        autocorrect="off"
                        spellcheck="false"
                        v-bind="componentField"
                        :disabled="orderStore.isOrderCreating"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="flex w-full gap-6">
                <div class="flex w-2/3 flex-col gap-2">
                  <FormField
                    v-slot="{ componentField }"
                    name="recipient_name"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Recipient Name </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter recipient name"
                          type="text"
                          autoapitalize="none"
                          autocomplete="name"
                          autocorrect="off"
                          spellcheck="false"
                          v-bind="componentField"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="recipient_phone"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Recipient Phone Number </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter contact number"
                          type="text"
                          autoapitalize="none"
                          autocomplete="number"
                          autocorrect="off"
                          spellcheck="false"
                          v-bind="componentField"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="recipient_phone_secendary"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Recipient Secondary Phone Number (Optional) </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter secondary number"
                          type="text"
                          autoapitalize="none"
                          autocomplete="number"
                          autocorrect="off"
                          spellcheck="false"
                          v-bind="componentField"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="recipient_address"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Recipient Address </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter recipient address"
                          class="resize-none"
                          v-bind="componentField"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <div class="grid grid-cols-3 gap-4">
                    <FormField name="city_id">
                      <FormItem class="space-y-1">
                        <FormLabel>City </FormLabel>
                        <FormControl>
                          <SelectBox
                            labelKey="name"
                            v-model="selectedCity"
                            title="Select City"
                            :options="locationStore.cities"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>

                    <FormField name="zone_id">
                      <FormItem class="space-y-1">
                        <FormLabel>Zone </FormLabel>
                        <FormControl>
                          <SelectBox
                            labelKey="name"
                            v-model="selectedZone"
                            title="Select Zone"
                            :options="locationStore.zones"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>

                    <FormField name="area_id">
                      <FormItem class="space-y-1">
                        <FormLabel>Area (Optional)</FormLabel>
                        <FormControl>
                          <SelectBox
                            labelKey="name"
                            v-model="selectedArea"
                            title="Select Area"
                            :options="locationStore.areas"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                  </div>
                </div>
                <div class="flex w-1/3 flex-col gap-2">
                  <FormField
                    v-slot="{ componentField }"
                    name="delivery_type"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Delivery Type </FormLabel>
                      <FormControl>
                        <Select
                          v-bind="componentField"
                          :disabled="orderStore.isOrderCreating"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Delivery Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="48"> Normal Delivery </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="weight"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Weight </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter weight"
                          type="text"
                          autoapitalize="none"
                          autocomplete="none"
                          autocorrect="off"
                          spellcheck="false"
                          v-model="selectedWeight"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="quantity"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Quantity </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quantity"
                          type="number"
                          autoapitalize="none"
                          autocomplete="name"
                          autocorrect="off"
                          spellcheck="false"
                          v-bind="componentField"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="amount_collect"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel> Amount to collect </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount to collect"
                          type="number"
                          autoapitalize="none"
                          autocomplete="name"
                          autocorrect="off"
                          spellcheck="false"
                          v-bind="componentField"
                          v-model="selectedAmountCollect"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="item_desc"
                  >
                    <FormItem class="space-y-1">
                      <FormLabel class="flex items-center gap-2">
                        <span> Item Description (Optional) </span>
                        <TooltipProvider :delay-duration="100">
                          <Tooltip>
                            <TooltipTrigger as-child>
                              <Icon
                                icon="radix-icons:info-circled"
                                class="h-5 w-5 cursor-pointer text-red-400"
                              />
                            </TooltipTrigger>
                            <TooltipContent class="w-56">
                              <p>
                                You don't get any lost compensation without the item description and
                                price.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter item description and price"
                          type="text"
                          class="resize-none"
                          v-bind="componentField"
                          :disabled="orderStore.isOrderCreating"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
              </div>

              <FormField
                v-slot="{ componentField }"
                name="special_instraction"
              >
                <FormItem class="space-y-1">
                  <FormLabel> Special Instruction (Optional) </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Special Instruction"
                      class="resize-none"
                      rows="3"
                      v-bind="componentField"
                      :disabled="orderStore.isOrderCreating"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormItem class="mt-5">
                <Button
                  type="submit"
                  :disabled="orderStore.isOrderCreating"
                  size="lg"
                >
                  <Icon
                    v-if="orderStore.isOrderCreating"
                    icon="fluent:spinner-ios-16-filled"
                    class="mr-2 h-4 w-4 animate-spin"
                  />
                  CREATE
                </Button>
              </FormItem>
            </div>
          </form>
          <div class="flex w-2/5 flex-col gap-4">
            <div class="text-lg font-medium">Delivery Cost</div>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between">
                <span>Delivery fee</span>
                <span>৳ {{ pricePlanStore.pricePlan?.price }}</span>
              </div>
              <div class="flex justify-between">
                <span>COD fee</span>
                <span>৳ {{ pricePlanStore.pricePlan.cod_percentage * selectedAmountCollect }}</span>
              </div>
              <div class="flex justify-between">
                <span>Discount</span>
                <span>-৳ {{ pricePlanStore.pricePlan.discount }}</span>
              </div>
              <hr />
              <div class="flex justify-between">
                <span>Total Fee</span>
                <span>৳ {{ calculateTotalFee() }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
<script setup>
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Icon } from '@iconify/vue';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form/index.js';
import SelectBox from '@/components/SelectBox.vue';
import { useUserStore } from '@/app/users/userStore.js';

import { onMounted, ref, watch } from 'vue';
import { useLocationStore } from '@/app/locations/locationStore.js';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/app/orders/orderStore.js';
import { useStoreStore } from '@/app/stores/storeStore.js';
import { usePricePlanStore } from '@/app/price-plans/pricePlanStore.js';
import { useAuthStore } from '@/app/auth/authStore.js';

const orderStore = useOrderStore();

const formSchema = toTypedSchema(
  z.object({
    recipient_name: z.string().min(1, 'Enter recipient name').trim(),
    recipient_phone: z
      .string()
      .min(1, 'Enter recipient phone number')
      .regex(/^01[3-9]\d{8}$/, 'Please enter a valid phone number')
      .trim(),
    recipient_phone_secendary: z
      .string()
      .min(1, 'Enter recipient secondary phone')
      .regex(/^01[3-9]\d{8}$/, 'Please enter a valid phone number')
      .optional(),
    recipient_address: z.string().min(1, 'Enter recipient address').trim(),
    special_instruction: z.string().min(1, 'Enter special instruction').trim().optional(),
    item_desc: z.string().min(1, 'Enter item description').trim().optional(),
    merchant_order_id: z.string().min(1, 'Enter merchant order id').trim().optional(),
    city_id: z.number(),
    zone_id: z.number(),
    area_id: z.number().optional(),
    product_type: z.string().min(1, 'Enter product type').trim(),
    store_id: z.string().min(1, 'Enter store id').trim(),
    delivery_type: z.string().min(1, 'Enter delivery type').trim(),
    amount_collect: z.number().default(0),
    weight: z.number().default(0.5),
    quantity: z.number().default(1)
  })
);

const locationStore = useLocationStore();
const storeStore = useStoreStore();
const pricePlanStore = usePricePlanStore();
const authStore = useAuthStore();

const selectedCity = ref({});
const selectedZone = ref({});
const selectedArea = ref({});
const selectedAmountCollect = ref(0);
const selectedWeight = ref(0.5);

onMounted(async () => {
  await storeStore.fetchStores();
  await locationStore.fetchCities();
});

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    delivery_type: '48',
    product_type: '1'
  }
});

watch(selectedAmountCollect, async () => {
  await getPricePlan();
});

watch(selectedWeight, async () => {
  if (selectedWeight.value) {
    form.setValues('weight', +selectedWeight.value);
    await getPricePlan();
  }
});

watch(selectedCity, async () => {
  if (selectedCity.value) {
    form.setFieldValue('city_id', selectedCity.value.id);
    await locationStore.fetchZones(selectedCity.value.id);
  }
  selectedZone.value = {};
  selectedArea.value = {};
});

watch(selectedZone, async () => {
  if (selectedZone.value) {
    form.setFieldValue('zone_id', selectedZone.value.id);
    await locationStore.fetchAreas(selectedZone.value.id);
  }
  selectedArea.value = {};
  await getPricePlan();
});

watch(selectedArea, () => {
  if (selectedArea.value) {
    form.setFieldValue('area_id', selectedArea.value.id);
  }
});

const router = useRouter();

const handleCreateOrder = form.handleSubmit(async (values) => {
  values.product_type = +values.product_type;
  values.delivery_type = +values.delivery_type;
  values.store_id = +values.store_id;
  values.merchant_id = authStore.user.merchant_id;

  toast.promise(orderStore.createOrder(values, form), {
    loading: 'Creating order...',
    success: (data) => {
      router.push({ name: 'Orders' });
      return `Order created successfully!!`;
    },
    position: 'top-center',
    duration: 1000,
    error: (err) => 'Order creation failed.'
  });
});

const calculateTotalFee = () => {
  return (
    pricePlanStore.pricePlan.price +
    pricePlanStore.pricePlan.cod_percentage * form.values.amount_collect -
    pricePlanStore.pricePlan.discount
  );
};

const getPricePlan = async () => {
  if (
    form.isFieldValid('delivery_type') &&
    form.isFieldValid('product_type') &&
    form.isFieldValid('store_id') &&
    form.isFieldValid('weight') &&
    form.isFieldValid('amount_collect') &&
    form.isFieldValid('city_id') &&
    form.isFieldValid('zone_id')
  ) {
    await pricePlanStore.fetchPricePlan({
      store_id: 195769,
      item_type: +form.values.product_type,
      delivery_type: +form.values.delivery_type,
      item_weight: form.values.weight,
      recipient_city: form.values.city_id,
      recipient_zone: form.values.zone_id
    });
  }
};
</script>
