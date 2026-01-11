<script setup lang="ts">
  import 'vue-sonner/style.css'
  import AppSidebar from '@/components/sidebar/AppSidebar.vue'
  import { Separator } from '@/components/ui/separator'
  import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
  import { RouterView } from 'vue-router'
  import { Toaster } from '@/components/ui/sonner'
  import BaseBreadcrumb from './components/breadcrumbs/BaseBreadcrumb.vue'
  import ToggleMode from './components/mode/ToggleMode.vue'
</script>

<template>
  <template v-if="$route.name != 'login'">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="header">
          <div class="flex items-center gap-2 py-2">
            <SidebarTrigger />
            <Separator orientation="vertical" class="h-4" />
            <BaseBreadcrumb />
          </div>
          <div class="overflow-hidden items-center flex">
            <ToggleMode />
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
    @apply sticky w-full top-0 z-50 bg-popover border-b flex justify-between items-center px-4 overflow-hidden;
  }

  .main-container {
    @apply flex flex-col gap-4 p-4 w-full overflow-auto;
  }
</style>
