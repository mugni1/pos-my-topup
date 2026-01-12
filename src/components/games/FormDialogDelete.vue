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
  import type { DeleteGameResponse, GetGameType } from '@/types/game'
  import { Button } from '../ui/button'
  import { useDeleteGame } from '@/hooks/useDeleteGame'
  import { useQueryClient } from '@tanstack/vue-query'
  import { toast } from 'vue-sonner'
  import { HttpStatusCode } from 'axios'

  // PROPS
  const props = defineProps<{
    data: GetGameType
  }>()

  // STATE
  const { isPending, mutateAsync } = useDeleteGame()
  const isOpen = ref<boolean>(false)
  const queryClient = useQueryClient()
  const tableParams = inject('tableParams')

  // METHODS
  const handleDeletePemanently = async () => {
    try {
      const result = await mutateAsync({ id: props.data.id })
      if (result.status != HttpStatusCode.Ok) {
        toast.success(result.message, { action: { label: 'close' } })
      } else {
        toast.success(result.message, { action: { label: 'close' } })
        queryClient.refetchQueries({ queryKey: ['games', tableParams] })
      }
    } catch (err: unknown) {
      const error = err as DeleteGameResponse
      toast.error(error.message, { action: { label: 'close' } })
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
          Continue to delete "{{ data.title }}" ?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel variant="outline" class="cursor-pointer">
          <XCircle /> Cancel
        </AlertDialogCancel>
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
