<template>
  <div class="space-y-6 p-6 pb-20">
    <div class="items-center justify-between space-y-3 sm:flex">
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Create Operator</h2>
        <p class="text-muted-foreground">
          Please fill in the details below to create a new operator.
        </p>
      </div>
    </div>
    <CreateOperatorForm />
  </div>
</template>
<script setup>
import CreateOperatorForm from './_components/CreateOperatorForm.vue';
</script>
