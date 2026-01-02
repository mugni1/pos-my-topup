<script setup lang="ts">
  import Cookies from 'js-cookie'
  import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-vue-next'
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from '@/components/ui/sidebar'
  import { toast } from 'vue-sonner'
  import { useRouter } from 'vue-router'
  import type { UserType } from '@/types/global.type'

  // PROPS
  const props = defineProps<{
    user: UserType | null
  }>()

  // STATE
  const { isMobile } = useSidebar()
  const router = useRouter()

  // FUNCTION
  const handleLogout = () => {
    Cookies.remove('token')
    router.push({ name: 'login' })
    toast.success('Logout successfully', { action: { label: 'Close' } })
  }
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <!-- <AvatarImage :src="user.avatar" :alt="user.name" /> -->
              <AvatarFallback v-if="user" class="rounded-md bg-muted-foreground">
                {{ user.name.charAt(0).toUpperCase() }}
              </AvatarFallback>
              <AvatarFallback v-if="!user" class="rounded-md bg-muted-foreground">
                A
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span v-if="user" class="truncate font-medium">{{ user.name }}</span>
              <span v-if="!user" class="truncate font-medium">Anonymouse</span>
              <span v-if="user" class="truncate text-xs">{{ user.email }}</span>
              <span v-if="!user" class="truncate text-xs">anonymouse@example.com</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <!-- <AvatarImage :src="user.avatar" :alt="user.name" /> -->
                <AvatarFallback v-if="user" class="rounded-md bg-muted-foreground">
                  {{ user.name.charAt(0).toUpperCase() }}
                </AvatarFallback>
                <AvatarFallback v-if="!user" class="rounded-md bg-muted-foreground">
                  A
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span v-if="user" class="truncate font-semibold">{{ user.name }}</span>
                <span v-if="!user" class="truncate font-semibold">Anonymouse</span>
                <span v-if="user" class="truncate text-xs">{{ user.email }}</span>
                <span v-if="!user" class="truncate text-xs">anonymouse@example.com</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
