<script setup lang="ts">
  import type { SidebarProps } from '@/components/ui/sidebar'

  import {
    BaggageClaim,
    GalleryVerticalEnd,
    LayoutDashboardIcon,
    LucideBox,
    SquareTerminal,
    TagsIcon,
  } from 'lucide-vue-next'
  import NavRoutes from '@/components/NavRoutes.vue'
  import NavMain from '@/components/NavMain.vue'
  import NavUser from '@/components/NavUser.vue'
  import TeamSwitcher from '@/components/TeamSwitcher.vue'

  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from '@/components/ui/sidebar'

  const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
  })

  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: {
      name: 'POS MyTopUp',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    navMain: [
      {
        title: 'Playground',
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [{ title: 'History', url: '#' }],
      },
    ],
    projects: [
      { name: 'Dashboard', url: '/', icon: LayoutDashboardIcon },
      { name: 'Categories', url: '/categories', icon: TagsIcon },
      { name: 'Items', url: '/items', icon: LucideBox },
      { name: 'Orders', url: '/orders', icon: BaggageClaim },
    ],
  }
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavRoutes :projects="data.projects" />
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
