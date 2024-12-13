<template>
  <form @submit="handleRegister">
    <div class="grid gap-3">
      <FormField
        v-slot="{ componentField }"
        name="business_name"
      >
        <FormItem class="space-y-1">
          <FormLabel> Business Name </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter Business Name"
              type="text"
              autoapitalize="none"
              autocomplete="name"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="authStore.registrationLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="owner_name"
      >
        <FormItem class="space-y-1">
          <FormLabel> Owner Name </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter Owner Name"
              type="text"
              autoapitalize="none"
              autocomplete="name"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="authStore.registrationLoading"
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
          <FormLabel>Owner Email </FormLabel>
          <FormControl>
            <Input
              placeholder="name@example.com"
              type="text"
              autoapitalize="none"
              autocomplete="email"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="authStore.registrationLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="phone"
      >
        <FormItem class="space-y-1">
          <FormLabel> Owner Phone </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter owner phone"
              type="text"
              autoapitalize="none"
              autocomplete="phone"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="authStore.registrationLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!--    
      <FormField
        v-slot="{ componentField }"
        name="address"
      >
        <FormItem class="space-y-1">
          <FormLabel> Address </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter address"
              class="resize-none"
              v-bind="componentField"
              :disabled="authStore.registrationLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      -->

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
              :disabled="authStore.registrationLoading"
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
          <FormLabel>Confirm Password </FormLabel>
          <FormControl>
            <PasswordInput
              placeholder="Confirm Password"
              autocapitalize="none"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="authStore.registrationLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormItem class="flex flex-col">
        <Button
          type="submit"
          :disabled="authStore.registrationLoading"
        >
          <Icon
            v-if="authStore.registrationLoading"
            icon="fluent:spinner-ios-16-filled"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Register
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
import { useAuthStore } from '@/app/auth/authStore';
import PasswordInput from '@/components/ui/password-input/PasswordInput.vue';
import { toast } from 'vue-sonner';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();

const registerSchema = z
  .object({
    business_name: z.string().min(1, 'Enter business name').trim(),
    owner_name: z.string().min(1, 'Enter owner name').trim(),
    address: z.string().min(1, 'Enter address').trim().optional(),
    email: z
      .string()
      .min(1, 'Enter your email address')
      .email('Please enter a valid email address')
      .trim(),
    phone: z
      .string()
      .min(1, 'Enter owner phone number')
      .regex(/^01[3-9]\d{8}$/, 'Please enter a valid phone number')
      .trim(),
    password: z
      .string({ message: 'Enter your password' })
      .min(8, 'Password must have minimum 8 character')
      .trim(),
    password_confirmation: z
      .string({ message: 'Enter your confirm password' })
      .min(8, 'Confirm password must have minimum 8 character')
      .trim()
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
  });

const form = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    business_name: '',
    owner_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  }
});

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.redirectedFrom && route.redirectedFrom.meta.protected) {
    toast.warning('Authentication Required', {
      description: `Please sign in to continue.`,
      position: 'top-center'
    });
  }
});
const handleRegister = form.handleSubmit(async (values) => {
  toast.promise(authStore.registration(values, form), {
    loading: 'Registering...',
    success: (data) => {
      router.push(route.redirectedFrom ?? '/');
      return `You have registered!!`;
    },
    position: 'top-center',
    duration: 1000,
    error: (err) => 'Registration  failed'
  });
});
</script>
