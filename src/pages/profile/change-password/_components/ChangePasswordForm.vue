<template>
  <form
    @submit="handleChangePassword"
    class="lg:w-1/3"
  >
    <div class="grid gap-4">
      <FormField
        v-slot="{ componentField }"
        name="current_password"
      >
        <FormItem class="space-y-1">
          <FormLabel> Current Password </FormLabel>
          <FormControl>
            <PasswordInput
              placeholder="Enter current password"
              autocapitalize="none"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="false"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="new_password"
      >
        <FormItem class="space-y-1">
          <FormLabel> New Password </FormLabel>
          <FormControl>
            <PasswordInput
              placeholder="Enter new password"
              autocapitalize="none"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="false"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="new_password_confirmation"
      >
        <FormItem class="space-y-1">
          <FormLabel>Confirm New Password</FormLabel>
          <FormControl>
            <PasswordInput
              placeholder="Enter new confirm password"
              autocapitalize="none"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="false"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormItem class="mt-5">
        <Button
          type="submit"
          :disabled="userStore.isUserCreating"
          size="lg"
          variant="destructive"
        >
          <Icon
            v-if="userStore.isUserCreating"
            icon="fluent:spinner-ios-16-filled"
            class="mr-2 h-4 w-4 animate-spin"
          />
          CHANGE
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
import PasswordInput from '@/components/ui/password-input/PasswordInput.vue';

import { useUserStore } from '@/app/users/userStore';
import { toTypedSchema } from '@vee-validate/zod';

const userStore = useUserStore();

const formSchema = toTypedSchema(
  z
    .object({
      current_password: z
        .string({ message: 'Enter current password' })
        .min(8, 'Password must have minimum 8 character')
        .trim(),
      new_password: z
        .string({ message: 'Enter new password' })
        .min(8, 'New password must have minimum 8 character')
        .trim(),
      new_password_confirmation: z
        .string({ message: 'Enter new confirm password' })
        .min(8, 'Confirm password must have minimum 8 character')
        .trim()
    })
    .refine((data) => data.current_password !== data.new_password, {
      message: 'Your new password must be different from your current password.',
      path: ['new_password']
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
      message: 'Passwords do not match',
      path: ['new_password_confirmation']
    })
);

const form = useForm({ validationSchema: formSchema });

const handleChangePassword = form.handleSubmit(async (values) => {
  //await userStore.createUser(values, form);
});
</script>
