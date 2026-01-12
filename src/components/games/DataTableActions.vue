<script setup lang="ts">
  import { MoreHorizontal, Trash2Icon } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import type { GetGameType } from '@/types/game'
  import FormDialogUpdate from './FormDialogUpdate.vue'
  import FormDialogDelete from './FormDialogDelete.vue'

  // PROPS
  const props = defineProps<{
    data: GetGameType
  }>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <FormDialogDelete :data="data" />
      <FormDialogUpdate :data="data" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
