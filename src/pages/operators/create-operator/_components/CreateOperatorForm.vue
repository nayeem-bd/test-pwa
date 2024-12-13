<template>
  <form
    @submit="handleCreateOperator"
    class="w-full"
  >
    <div class="grid gap-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem class="space-y-1">
            <FormLabel>Operator Name </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter operator name"
                type="text"
                autoapitalize="none"
                autocomplete="name"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="operatorStore.isOperatorCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem class="space-y-1">
            <FormLabel> Operator Email </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter operator email"
                type="text"
                autoapitalize="none"
                autocomplete="none"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="operatorStore.isOperatorCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <FormField
          v-slot="{ componentField }"
          name="phone"
        >
          <FormItem class="space-y-1">
            <FormLabel>Phone Number </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter operator phone"
                type="text"
                autoapitalize="none"
                autocomplete="number"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="operatorStore.isOperatorCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="secondary_phone"
        >
          <FormItem class="space-y-1">
            <FormLabel>Operator Secondary Number (Optional) </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter secondary number"
                type="text"
                autoapitalize="none"
                autocomplete="number"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="operatorStore.isOperatorCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem class="space-y-1">
            <FormLabel> Password </FormLabel>
            <FormControl>
              <PasswordInput
                placeholder="Password"
                autocapitalize="none"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="operatorStore.isOperatorCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="password_confirmation"
        >
          <FormItem class="space-y-1">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder="Confirm Password"
                autocapitalize="none"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                v-bind="componentField"
                :disabled="operatorStore.isOperatorCreating"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormItem class="mt-5">
        <Button
          type="submit"
          :disabled="operatorStore.isOperatorCreating"
          size="lg"
        >
          <Icon
            v-if="operatorStore.isOperatorCreating"
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
import PasswordInput from '@/components/ui/password-input/PasswordInput.vue';

import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { useOperatorStore } from '@/app/operators/operatorStore.js';

import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(1, 'Enter operator name').trim(),
      email: z.string().min(1, 'Enter operator email').email('Enter valid email').trim(),
      phone: z
        .string()
        .min(11, 'Enter operator phone')
        .regex(/^01[3-9]\d{8}$/, 'Please enter a valid phone number')
        .trim(),
      secondary_phone: z
        .string()
        .min(11, 'Enter operator secondary phone')
        .regex(/^01[3-9]\d{8}$/, 'Please enter a valid phone number')
        .trim()
        .optional(),
      password: z
        .string({ message: 'Enter operator password' })
        .min(8, 'Password must have minimum 8 character')
        .trim(),
      password_confirmation: z
        .string({ message: 'Enter operator confirm password' })
        .min(8, 'Confirm password must have minimum 8 character')
        .trim()
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'Passwords do not match',
      path: ['password_confirmation']
    })
);

const form = useForm({ validationSchema: formSchema });
const operatorStore = useOperatorStore();
const router = useRouter();

const handleCreateOperator = form.handleSubmit(async (values) => {
  toast.promise(operatorStore.createOperator(values, form), {
    loading: 'Creating Operator...',
    success: (data) => {
      router.push({ name: 'Operators' });
      return `Operator created successfully!!`;
    },
    position: 'top-center',
    duration: 1000,
    error: (err) => 'Operator creation failed.'
  });
});
</script>
