<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-3xl font-bold tracking-tight">Register</h1>
      <!-- <p class="text-sm text-muted-foreground">Enter below form to register</p> -->
    </div>
    <RegisterForm />
    <div>
      Already have an account?
      <RouterLink
        :to="{ name: 'Login' }"
        class="font-semibold text-blue-500"
        >Login</RouterLink
      >
      Here
    </div>
  </div>
</template>

<script setup>
import { cn } from '@/lib/utils';
import RegisterForm from './_components/RegisterForm.vue';
</script>
