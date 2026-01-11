<script setup lang="ts">
  import AppSidebar from '@/components/sidebar/AppSidebar.vue'
  import { Separator } from '@/components/ui/separator'
  import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
  import { RouterView } from 'vue-router'
  import { Toaster } from '@/components/ui/sonner'
  import 'vue-sonner/style.css'
  import BaseBreadcrumb from './components/breadcrumbs/BaseBreadcrumb.vue'
</script>

<template>
  <template v-if="$route.name != 'login'">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="header">
          <div class="flex items-center justify-between px-4">
            <div class="flex items-center gap-2">
              <SidebarTrigger class="-ml-1" />
              <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
              <BaseBreadcrumb />
            </div>
          </div>
        </header>
        <section class="main-container">
          <div class="w-full h-full space-y-4 overflow-x-auto">
            <RouterView />
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  </template>
  <template v-else>
    <RouterView />
  </template>
  <Toaster position="bottom-right" />
</template>

<style scoped>
  @import './assets/main.css';

  .header {
    @apply flex h-12 items-center gap-2 fixed w-full border-b bg-white z-50;
  }

  .main-container {
    @apply flex flex-col gap-4 p-4 w-full overflow-auto pt-16;
  }
</style>
