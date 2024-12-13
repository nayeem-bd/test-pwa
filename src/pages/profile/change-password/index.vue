<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Change Password</h2>
      </div>
    </div>

    <div>
      <ChangePasswordForm />
    </div>
  </div>
</template>

<script setup>
import ChangePasswordForm from './_components/ChangePasswordForm.vue';
</script>

<style scoped></style>
