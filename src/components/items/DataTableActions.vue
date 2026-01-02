<script setup lang="ts">
  import { MoreHorizontal } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import type { ItemType } from '@/types/items'
  import DeleteItemDialog from './DeleteItemDialog.vue'
  import UpdateItemForm from './UpdateItemForm.vue'

  // PROPS
  const props = defineProps<{
    data: ItemType
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
      <DeleteItemDialog :data="data" />
      <UpdateItemForm :data="data" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
