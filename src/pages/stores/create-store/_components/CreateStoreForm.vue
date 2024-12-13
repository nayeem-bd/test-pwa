<template>
  <form
    @submit="handleCreateStore"
    class="w-full"
  >
    <div class="grid gap-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem class="space-y-1">
            <FormLabel>Store Name </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter store name"
                type="text"
                autoapitalize="none"
                autocomplete="name"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="storeStore.isStoreCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="contact_name"
        >
          <FormItem class="space-y-1">
            <FormLabel> Store Contact Name </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter store contact name"
                type="text"
                autoapitalize="none"
                autocomplete="name"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="storeStore.isStoreCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <FormField
          v-slot="{ componentField }"
          name="contact_number"
        >
          <FormItem class="space-y-1">
            <FormLabel>Contact Number </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter contact number"
                type="text"
                autoapitalize="none"
                autocomplete="number"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="storeStore.isStoreCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="secondary_number"
        >
          <FormItem class="space-y-1">
            <FormLabel>Contact Secondary Number (Optional) </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter secondary number"
                type="text"
                autoapitalize="none"
                autocomplete="number"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="storeStore.isStoreCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-4">
        <FormField name="city_id">
          <FormItem class="space-y-1">
            <FormLabel>City </FormLabel>
            <FormControl>
              <SelectBox
                labelKey="name"
                v-model="selectedCity"
                title="Select City"
                :options="locationStore.cities"
                :disabled="storeStore.isStoreCreating"
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
                :disabled="storeStore.isStoreCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="area_id">
          <FormItem class="space-y-1">
            <FormLabel>Area </FormLabel>
            <FormControl>
              <SelectBox
                labelKey="name"
                v-model="selectedArea"
                title="Select Area"
                :options="locationStore.areas"
                :disabled="storeStore.isStoreCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField
        v-slot="{ componentField }"
        name="address"
      >
        <FormItem class="space-y-1">
          <FormLabel>Store Address </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter store address"
              class="resize-none"
              rows="5"
              v-bind="componentField"
              :disabled="storeStore.isStoreCreating"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormItem class="mt-5">
        <Button
          type="submit"
          :disabled="storeStore.isStoreCreating"
          size="lg"
        >
          <Icon
            v-if="storeStore.isStoreCreating"
            icon="fluent:spinner-ios-16-filled"
            class="mr-2 h-4 w-4 animate-spin"
          />
          CREATE
        </Button>
      </FormItem>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'vue-sonner';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';

import { useStoreStore } from '@/app/stores/storeStore';
import { useLocationStore } from '@/app/locations/locationStore';
import SelectBox from '@/components/SelectBox.vue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Enter store name').trim(),
    contact_name: z.string().min(1, 'Enter contact name').trim(),
    contact_number: z
      .string()
      .min(1, 'Enter contact number')
      .regex(/^01[3-9]\d{8}$/, 'Please enter a valid phone number')
      .trim(),
    secondary_number: z
      .string()
      .min(1, 'Enter contact number')
      .regex(/^01[3-9]\d{8}$/, 'Please enter a valid phone number')
      .optional(),
    address: z.string().min(1, 'Enter store address').trim(),
    city_id: z.number(),
    zone_id: z.number(),
    area_id: z.number()
  })
);

const locationStore = useLocationStore();
const storeStore = useStoreStore();

const selectedCity = ref({});
const selectedZone = ref({});
const selectedArea = ref({});

onMounted(async () => {
  await locationStore.fetchCities();
});

const form = useForm({ validationSchema: formSchema });

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
});

watch(selectedArea, () => {
  if (selectedArea.value) {
    form.setFieldValue('area_id', selectedArea.value.id);
  }
});

const router = useRouter();

const handleCreateStore = form.handleSubmit(async (values) => {
  toast.promise(storeStore.createStore(values, form), {
    loading: 'Creating store...',
    success: (data) => {
      router.push({ name: 'Stores' });
      return `Store created successfully!!`;
    },
    position: 'top-center',
    duration: 1000,
    error: (err) => 'Store creation failed.'
  });
});
</script>
