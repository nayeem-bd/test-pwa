<template>
  <main
    class="container absolute inset-0 flex h-full flex-col items-center justify-between bg-gray-50 dark:bg-background sm:justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="absolute left-8 top-6 z-20 flex items-center text-lg font-bold text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        class="mr-2 h-6 w-6"
      >
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
      {{ configs.title }}
    </div>

    <div class="absolute right-8 top-6">
      <ColorModeDropdown />
    </div>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-background lg:flex">
      <div class="absolute inset-0 bg-slate-700 dark:bg-gray-900" />

      <!--      <div class="relative z-20 mt-auto text-white">-->
      <!--        <blockquote class="space-y-2">-->
      <!--          <p class="text-lg">-->
      <!--            &ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus quod vel-->
      <!--            voluptas, perferendis eos eveniet. Reprehenderit eligendi hic, tempore similique-->
      <!--            praesentium laborum a quibusdam doloribus sed tempora sapiente! Modi, molestias?.&rdquo;-->
      <!--          </p>-->
      <!--          <footer class="text-sm">Shanto Islam</footer>-->
      <!--        </blockquote>-->
      <!--      </div>-->
    </div>
    <div class="justify-between max-sm:flex max-sm:flex-1 max-sm:flex-col max-sm:pt-24 lg:p-5">
      <div
        class="mx-auto flex w-full flex-col justify-between space-y-6 max-sm:flex max-sm:flex-1 max-sm:flex-col max-sm:pt-24 sm:w-[350px]"
      >
        <RouterView />

        <p class="px-8 text-center text-sm text-muted-foreground max-sm:pb-14">
          By clicking continue, you agree to our
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>
          and
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import ColorModeDropdown from '@/components/ColorModeDropdown.vue';
import configs from '@/configs';
</script>
