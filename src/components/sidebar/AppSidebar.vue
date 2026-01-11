<script setup lang="ts">
  import type { SidebarProps } from '@/components/ui/sidebar'
  import NavRoutes from '@/components/sidebar/NavRoutes.vue'
  import NavMain from '@/components/sidebar/NavMain.vue'
  import Footer from '@/components/sidebar/Footer.vue'
  import Header from '@/components/sidebar/Header.vue'
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from '@/components/ui/sidebar'
  import { useAuthStore } from '@/stores/auth'
  import { data } from './data'

  // PROPS
  const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
  })

  // STATE
  const { user } = useAuthStore()
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <Header :teams="data.header" />
    </SidebarHeader>
    <SidebarContent>
      <NavRoutes :projects="data.routes" />
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <Footer :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
