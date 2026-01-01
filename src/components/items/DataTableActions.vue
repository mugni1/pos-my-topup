<script setup lang="ts">
  import type { DeleteCategoryResponse } from '@/types/categories'
  import { CheckCircle2, Loader2, MoreHorizontal, Trash2, XCircle } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '../ui/alert-dialog'
  import { inject, ref } from 'vue'
  import { useDeleteCategory } from '@/hooks/useDeleteCategory'
  import { useQueryClient } from '@tanstack/vue-query'
  import { toast } from 'vue-sonner'
  import type { ItemType } from '@/types/items'

  // PROPS
  const props = defineProps<{
    data: ItemType
  }>()

  // HOOKS
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useDeleteCategory()

  // STATE
  const alertDialogDelete = ref(false)
  const tableParams = inject('tableParams')

  // METHODS
  const handleChangeAlertDialogDelete = () => {
    alertDialogDelete.value = !alertDialogDelete.value
  }
  const handleDeletePemanently = async (id: string) => {
    try {
      const result = await mutateAsync({ id })
      queryClient.refetchQueries({
        queryKey: ['categories', tableParams],
      })
      if (result.status != 200) {
        toast.error(result.message, { action: { label: 'Close' } })
      } else {
        toast.success(result.message, { action: { label: 'Close' } })
      }
      handleChangeAlertDialogDelete()
    } catch (err: unknown) {
      const error = err as DeleteCategoryResponse
      toast.error(error.message, { action: { label: 'Close' } })
    }
  }
</script>

<template>
  <!-- DELETE DIALOG  -->
  <AlertDialog :open="alertDialogDelete">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive">Warning, Are you sure ?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently remove your data from our servers.
          Continue to delete "{{ data.name }}" ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button variant="outline" @click="handleChangeAlertDialogDelete">
          <XCircle /> Cancel
        </Button>
        <Button v-if="isPending" variant="destructive" class="cursor-not-allowed" disabled>
          <Loader2 class="animate-spin" /> Loading..
        </Button>
        <Button v-else variant="destructive" @click="handleDeletePemanently(data.id)">
          <CheckCircle2 /> Yes
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem variant="destructive" @click="handleChangeAlertDialogDelete">
        <Trash2 /> Delete
      </DropdownMenuItem>
      <!-- <UpdateCategoryForm :data="data" /> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
