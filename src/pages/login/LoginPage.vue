<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-3xl font-bold tracking-tight">Login</h1>
      <p class="text-sm text-muted-foreground">Enter your email below to log in your account</p>
    </div>
    <LoginForm />
    <div>
      Don’t have an account
      <RouterLink
        :to="{ name: 'Register' }"
        class="font-semibold text-blue-500"
        >Register</RouterLink
      >
      Here
    </div>
  </div>
</template>

<script setup>
import { cn } from '@/lib/utils';
import LoginForm from './_components/LoginForm.vue';
</script>
