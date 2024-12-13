<template>
  <div class="flex w-full gap-20">
    <form
      @submit="handleSubmit"
      class="lg:w-1/2"
    >
      <div class="grid gap-4">
        <FormField
          v-slot="{ componentField }"
          type="radio"
          name="type"
        >
          <FormItem class="space-y-3">
            <FormLabel>Method</FormLabel>

            <FormControl>
              <RadioGroup
                class="flex gap-4"
                v-bind="componentField"
              >
                <FormItem class="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mfs" />
                  </FormControl>
                  <FormLabel class="font-normal"> Mobile(MFS) </FormLabel>
                </FormItem>
                <FormItem class="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="bank" />
                  </FormControl>
                  <FormLabel class="font-normal"> Bank </FormLabel>
                </FormItem>
                <FormItem class="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="cash" />
                  </FormControl>
                  <FormLabel class="font-normal"> Cash </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div
          v-if="form.values.type === 'mfs'"
          class="flex w-full gap-4"
        >
          <FormField
            v-slot="{ componentField }"
            name="mfs_provider"
          >
            <FormItem class="w-1/2 space-y-1">
              <FormLabel>Wallet Provider</FormLabel>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="(wallet, index) in mfs_wallet_providers"
                      :key="wallet?.id ?? index"
                      :value="`${wallet?.id}`"
                    >
                      {{ wallet?.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="mfs_account_number"
          >
            <FormItem class="w-1/2 space-y-1">
              <FormLabel> Mobile Account Number </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter mobile account number"
                  type="text"
                  autoapitalize="none"
                  autocomplete="number"
                  autocorrect="off"
                  spellcheck="false"
                  v-bind="componentField"
                  :disabled="userStore.isUserCreating"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div
          v-else-if="form.values.type === 'bank'"
          class="flex w-full flex-col gap-6"
        >
          <div class="flex w-full gap-4">
            <FormField
              v-slot="{ componentField }"
              name="bank_account_name"
            >
              <FormItem class="w-1/2 space-y-1">
                <FormLabel> Account Name </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter account name"
                    type="text"
                    autoapitalize="none"
                    autocomplete="none"
                    autocorrect="off"
                    spellcheck="false"
                    v-bind="componentField"
                    :disabled="userStore.isUserCreating"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ componentField }"
              name="bank_account_number"
            >
              <FormItem class="w-1/2 space-y-1">
                <FormLabel> Account Number </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter account number"
                    type="text"
                    autoapitalize="none"
                    autocomplete="none"
                    autocorrect="off"
                    spellcheck="false"
                    v-bind="componentField"
                    :disabled="userStore.isUserCreating"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="flex w-full gap-4">
            <FormField
              v-slot="{ componentField }"
              name="bank_name"
            >
              <FormItem class="w-1/2 space-y-1">
                <FormLabel> Bank Name </FormLabel>
                <FormControl>
                  <SelectBox
                    title="Select Bank"
                    label-key="name"
                    v-bind="componentField"
                    v-model="selectedBank"
                    :options="banks"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ componentField }"
              name="branch_name"
            >
              <FormItem class="w-1/2 space-y-1">
                <FormLabel> Branch Name </FormLabel>
                <FormControl>
                  <SelectBox
                    title="Select Branch"
                    label-key="name"
                    v-bind="componentField"
                    v-model="selectedBranch"
                    :options="branches"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
        <div
          v-else
          class="flex w-full flex-col gap-6"
        >
          <FormField
            v-slot="{ componentField }"
            name="hub"
          >
            <FormItem class="w-1/2 space-y-1">
              <FormLabel> Hub Name </FormLabel>
              <FormControl>
                <SelectBox
                  title="Select Hub"
                  label-key="name"
                  v-bind="componentField"
                  v-model="selectedHub"
                  :options="banks"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div>
            <div><span class="font-medium">Hub Name:</span> Banani</div>
            <div><span class="font-medium">Hub Address:</span> Road 8, Banani, Dhaka</div>
          </div>
        </div>

        <FormItem class="mt-5">
          <Button
            type="submit"
            :disabled="userStore.isUserCreating"
            size="lg"
          >
            <Icon
              v-if="userStore.isUserCreating"
              icon="fluent:spinner-ios-16-filled"
              class="mr-2 h-4 w-4 animate-spin"
            />
            {{ title }}
          </Button>
        </FormItem>
      </div>
    </form>
    <div class="flex flex-col gap-4 lg:w-1/3">
      <span class="text-lg">Payment Frequency</span>
      <RadioGroup
        class="flex gap-2"
        v-model="selectedPaymentFrequencyType"
      >
        <div
          v-for="(type, index) in paymentFrequencyTypes"
          :key="type?.id ?? index"
          class="flex items-center gap-2 space-x-2"
        >
          <RadioGroupItem :value="type?.value" />
          <Label :for="type?.value">{{ type?.name }}</Label>
        </div>
      </RadioGroup>
      <div class="flex flex-col gap-4">
        <TooltipProvider v-if="selectedPaymentFrequencyType === 'custom'">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button class="w-[150px]">Payment request</Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              class="w-48"
            >
              <p>The payment requested before 12 PM, will be disbursed that day.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button class="w-[100px]">Update</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { useUserStore } from '@/app/users/userStore';
import { toTypedSchema } from '@vee-validate/zod';
import { ref, watch } from 'vue';
import SelectBox from '@/components/SelectBox.vue';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const userStore = useUserStore();
const title = ref('ADD');

const formSchema = toTypedSchema(
  z
    .object({
      type: z.enum(['mfs', 'bank', 'cash'], {
        required_error: 'You need to select a wallet type.'
      }),
      mfs_provider: z.string().min(1, 'mfs_provider required').trim().optional(),
      mfs_account_number: z
        .string()
        .min(11, 'Enter mobile account number')
        .regex(/^01[3-9]\d{8,9}$/, 'Please enter a valid mobile account number')
        .trim()
        .optional(),
      bank_account_name: z.string().min(1, 'Enter account name').trim().optional(),
      bank_account_number: z.string().min(1, 'Enter account number').trim().optional(),
      bank_name: z
        .object({
          id: z.number().int().positive(),
          name: z.string().min(1, 'Bank name is required')
        })
        .optional(),
      branch_name: z
        .object({
          id: z.number().int().positive(),
          name: z.string().min(1, 'Branch name is required')
        })
        .optional(),
      hub: z.object({
        id: z.number().int().positive(),
        name: z.string().min(1, 'Hub Name is required')
      })
    })
    .superRefine((data, ctx) => {
      if (data.type === 'mfs') {
        // When 'mfs' is selected, ensure `mfs_account_number` is required
        if (!data.mfs_account_number || data.mfs_account_number.length < 11) {
          ctx.addIssue({
            path: ['mfs_account_number'],
            message: 'Mobile account number is required and must be valid.',
            code: z.ZodIssueCode.custom
          });
        }
        if (!data.mfs_provider || data.mfs_provider.trim().length === 0) {
          ctx.addIssue({
            path: ['mfs_provider'],
            message: 'MFS provider is required.',
            code: z.ZodIssueCode.custom
          });
        }
      }

      if (data.type === 'bank') {
        // When 'bank' is selected, ensure `bank_name`, `bank_account_name`, and `bank_account_number` are required
        if (!data.bank_name?.id || !data.bank_name?.name) {
          ctx.addIssue({
            path: ['bank_name'],
            message: 'Bank name and ID are required.',
            code: z.ZodIssueCode.custom
          });
        }
        if (!data.branch_name?.id || !data.branch_name?.name) {
          ctx.addIssue({
            path: ['branch_name'],
            message: 'Branch name and ID are required.',
            code: z.ZodIssueCode.custom
          });
        }

        if (!data.bank_account_name) {
          ctx.addIssue({
            path: ['bank_account_name'],
            message: 'Account name is required.',
            code: z.ZodIssueCode.custom
          });
        }

        if (!data.bank_account_number) {
          ctx.addIssue({
            path: ['bank_account_number'],
            message: 'Account number is required.',
            code: z.ZodIssueCode.custom
          });
        }
      }
    })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    type: 'mfs'
  }
});

const mfs_wallet_providers = [
  { id: 1, name: 'bKash' },
  { id: 2, name: 'Rocket' },
  { id: 3, name: 'Nagad' }
];

const banks = [
  { id: 1, name: 'Eastern Bank PLC' },
  { id: 2, name: 'City Bank' },
  { id: 3, name: 'DBBL' },
  { id: 3, name: 'Brac Bank' }
];

const branches = [
  { id: 1, name: 'Gulshan North' },
  { id: 2, name: 'Gulsan 1' },
  { id: 3, name: 'Uttra' },
  { id: 3, name: 'Mohakhali' }
];

const paymentFrequencyTypes = [
  { id: 1, value: 'regular', name: 'Regular' },
  { id: 2, value: 'custom', name: 'Custom' }
];

const selectedBank = ref({});
const selectedBranch = ref({});
const selectedPaymentFrequencyType = ref(paymentFrequencyTypes[0].value);
const selectedHub = ref({});

const handleSubmit = form.handleSubmit(async (values) => {
  //await userStore.createUser(values, form);
  console.log('successfully submitter');
});
</script>
