<template>
  <div class="flex min-h-screen justify-center py-64">
    <div class="flex flex-col items-center">
      <h1 class="text-5xl font-bold">404 {{ ');' }}</h1>
      <p class="mt-4 text-xl">Oops! The page you're looking for doesn't exist.</p>
      <p class="mt-2 text-muted-foreground">
        It looks like you took a wrong turn. Don't worry, it happens to the best of us.
      </p>
      <Button
        class="mt-6"
        @click="goBack"
      >
        Go to home
      </Button>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';

import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.push({ path: '/' });
}
</script>
<style scoped></style>
