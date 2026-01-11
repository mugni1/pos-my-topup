<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { LucideIcon } from "lucide-vue-next"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

defineProps<{
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}>()

// const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Routes</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton as-child>
          <RouterLink :to="item.url">
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </RouterLink>
        </SidebarMenuButton>
        <!-- <SidebarMenuAction show-on-hover>
          <MoreHorizontal />
        </SidebarMenuAction> -->
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
