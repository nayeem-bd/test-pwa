<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">{{ title }} Payment Info</h2>
        <p class="text-muted-foreground">
          To create delivery orders, add a payment method, such as a bank transfer, to collect
          delivery charges.
        </p>
      </div>
    </div>

    <div>
      <PaymentInfoForm />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PaymentInfoForm from './_components/PaymentInfoForm.vue';

const title = ref('Add');
</script>

<style scoped></style>
