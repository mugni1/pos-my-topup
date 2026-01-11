<script setup lang="ts">
  import AppSidebar from '@/components/sidebar/AppSidebar.vue'
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
  } from '@/components/ui/breadcrumb'
  import { Separator } from '@/components/ui/separator'
  import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
  import { RouterLink, RouterView } from 'vue-router'
  import { Toaster } from '@/components/ui/sonner'
  import 'vue-sonner/style.css'
</script>

<template>
  <template v-if="$route.name != 'login'">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-12 items-center gap-2 fixed w-full border-b bg-white z-50">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="block">
                  <BreadcrumbLink class="capitalize">
                    <RouterLink :to="$route.path">
                      {{ $route.name }}
                    </RouterLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="flex flex-col gap-4 p-4 w-full overflow-auto pt-16">
          <div class="w-full h-full space-y-4 overflow-x-auto">
            <RouterView />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </template>
  <template v-else>
    <RouterView />
  </template>
  <Toaster position="bottom-right" />
</template>
