<script setup lang="ts">
  import { inject, ref } from 'vue'
  import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '../ui/alert-dialog'
  import { DropdownMenuItem } from '../ui/dropdown-menu'
  import { CheckCircle2, Loader2, Trash2, XCircle } from 'lucide-vue-next'
  import { Button } from '../ui/button'
  import type { DeleteItemResponse, ItemType } from '@/types/items'
  import { toast } from 'vue-sonner'
  import { useQueryClient } from '@tanstack/vue-query'
  import { useDeleteItem } from '@/hooks/useDeleteItem'

  // PROPS
  const props = defineProps<{
    data: ItemType
  }>()

  // STATE
  const tableParams = inject('tableParams')
  const isOpen = ref(false)
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useDeleteItem()

  // METHODS
  const handleDeletePemanently = async () => {
    try {
      const result = await mutateAsync({ id: props.data.id })
      queryClient.refetchQueries({
        queryKey: ['items', tableParams],
      })
      if (result.status != 200) {
        toast.error(result.message, { action: { label: 'Close' } })
      } else {
        toast.success(result.message, { action: { label: 'Close' } })
      }
    } catch (err: unknown) {
      const error = err as DeleteItemResponse
      toast.error(error.message, { action: { label: 'Close' } })
    } finally {
      isOpen.value = false
    }
  }
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogTrigger as-child>
      <DropdownMenuItem variant="destructive" size="icon" @select.prevent>
        <Trash2 /> Delete
      </DropdownMenuItem>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive">Warning, Are you sure ?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently remove your data from our servers.
          Continue to delete "{{ data.name }}" ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel variant="outline"> <XCircle /> Cancel </AlertDialogCancel>
        <Button v-if="isPending" variant="destructive" class="cursor-not-allowed" disabled>
          <Loader2 class="animate-spin" /> Loading..
        </Button>
        <Button v-else variant="destructive" @click="handleDeletePemanently">
          <CheckCircle2 /> Continue
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
