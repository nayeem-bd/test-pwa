<template>
  <form
    @submit="handleCreateUser"
    class="max-w-4xl"
  >
    <div class="grid gap-4">
      <FormField
        v-slot="{ componentField }"
        name="name"
      >
        <FormItem class="space-y-1">
          <FormLabel> Name </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter user name"
              type="text"
              autoapitalize="none"
              autocomplete="name"
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
        name="email"
      >
        <FormItem class="space-y-1">
          <FormLabel> Email </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter user email"
              type="text"
              autoapitalize="none"
              autocomplete="email"
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
        name="number"
      >
        <FormItem class="space-y-1">
          <FormLabel> Number </FormLabel>
          <FormControl>
            <Input
              placeholder="01*********"
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

      <FormField
        v-slot="{ componentField }"
        name="role"
      >
        <FormItem>
          <FormLabel>Role</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="manager"> Manager </SelectItem>
                <SelectItem value="admin"> Admin </SelectItem>
                <SelectItem value="operator"> Operator </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

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
import { toast } from 'vue-sonner';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useUserStore } from '@/app/users/userStore';

const userStore = useUserStore();

const formSchema = z.object({
  name: z.string().min(1, 'Enter your name').trim(),
  email: z
    .string()
    .min(1, 'Enter your email address')
    .email('Please enter a valid email address')
    .trim(),
  number: z
    .string()
    .min(1, 'Enter your number')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  role: z.string().min(1, 'Enter your role').trim(),
  hub_ids: z.array(z.string()).min(1, 'Select at least one hub')
});

const form = useForm({});

const handleCreateUser = form.handleSubmit(async (values) => {
  await userStore.createUser(values, form);
});
</script>
