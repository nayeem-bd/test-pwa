<template>
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
        v-else
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
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

const userStore = useUserStore();
const title = ref('ADD');

const formSchema = toTypedSchema(
  z
    .object({
      type: z.enum(['mfs', 'bank'], {
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
        .optional()
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

const selectedBank = ref({});
const selectedBranch = ref({});

const handleSubmit = form.handleSubmit(async (values) => {
  //await userStore.createUser(values, form);
  console.log('successfully submitter');
});
</script>
