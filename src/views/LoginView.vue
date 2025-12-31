<script setup lang="ts">
  import LoginForm from '@/components/auth/LoginForm.vue'
  import { GalleryVerticalEnd } from 'lucide-vue-next'
  import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="base-container">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <RouterLink to="/" class="flex items-center gap-2 self-center font-medium">
        <div class="brand-icon">
          <GalleryVerticalEnd class="size-4" />
        </div>
        <span class="font-semibold">POS MyTopUp</span>
      </RouterLink>
      <LoginForm />
    </div>
  </section>
</template>

<style scoped>
  @import '../assets/main.css';

  .base-container {
    @apply bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10;
  }

  .brand-icon {
    @apply bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md;
  }
</style>
