<template>
  <form @submit="handleLogin">
    <div class="grid gap-4">
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem class="space-y-1">
          <Label
            class="sr-only"
            for="email"
          >
            Email
          </Label>
          <FormControl>
            <Input
              placeholder="name@example.com"
              type="text"
              autoapitalize="none"
              autocomplete="email"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="authStore.logInLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="password"
      >
        <FormItem class="space-y-1">
          <Label
            class="sr-only"
            for="password"
          >
            Password
          </Label>
          <FormControl>
            <PasswordInput
              placeholder="Password"
              autocapitalize="none"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              v-bind="componentField"
              :disabled="authStore.logInLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormItem class="flex flex-col">
        <Button
          type="submit"
          :disabled="authStore.logInLoading"
        >
          <Icon
            v-if="authStore.logInLoading"
            icon="fluent:spinner-ios-16-filled"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Login
        </Button>
      </FormItem>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/app/auth/authStore';
import PasswordInput from '@/components/ui/password-input/PasswordInput.vue';
import { toast } from 'vue-sonner';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();

const logInSchema = z.object({
  email: z
    .string()
    .min(1, 'Enter your email address')
    .email('Please enter a valid email address')
    .trim(),
  password: z.string({ message: 'Enter your password' }).min(1, 'Enter your password')
});

const form = useForm({
  validationSchema: toTypedSchema(logInSchema),
  initialValues: {
    email: '',
    password: ''
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
const handleLogin = form.handleSubmit(async (values) => {
  toast.promise(
    authStore.logIn(
      {
        email: values.email,
        password: values.password
      },
      form
    ),
    {
      loading: 'Loging in...',
      success: (data) => {
        router.push(route.redirectedFrom ?? '/');
        return `You have loged in!!`;
      },
      position: 'top-center',
      duration: 1000,
      error: (err) => 'Logged in failed'
    }
  );
});
</script>
