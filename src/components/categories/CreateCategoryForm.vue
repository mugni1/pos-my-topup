<script setup lang="ts">
  import { Loader2Icon, PlusCircle, SaveIcon, XCircle } from 'lucide-vue-next'
  import { Button } from '../ui/button'
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '../ui/dialog'
  import { useForm } from 'vee-validate'
  import { createCategorySchemaValidate } from '@/validations/categories'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
  import { Input } from '../ui/input'
  import { usePostCategory } from '@/hooks/usePostCategory'
  import { HttpStatusCode } from 'axios'
  import { toast } from 'vue-sonner'
  import { inject, ref } from 'vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import type { PostCategoryResponse } from '@/types/categories'

  // INIT FORM
  const form = useForm({ validationSchema: createCategorySchemaValidate })

  // STATE
  const isOpen = ref(false)
  const { mutateAsync, isPending } = usePostCategory()
  const tableParams = inject('tableParams')
  const queryClient = useQueryClient()

  // METHODS
  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const results = await mutateAsync(values)
      if (results.status != HttpStatusCode.Created) {
        toast.error(results.message, { action: { label: 'Cancel' } })
      } else {
        toast.success(results.message, { action: { label: 'Close' } })
        isOpen.value = false
        queryClient.refetchQueries({
          queryKey: ['categories', tableParams],
        })
      }
    } catch (err: unknown) {
      const error = err as PostCategoryResponse
      toast.error(error.message, { action: { label: 'Cancel' } })
    }
  })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger>
      <Button type="button"> <PlusCircle /> Create category</Button>
    </DialogTrigger>

    <DialogContent @openAutoFocus="(e) => e.preventDefault()">
      <form @submit="handleSubmit" class="space-y-4">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-3">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Diamond Game" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="code">
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="GAME_DIAMOND" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline"> <XCircle /> Cancel </Button>
          </DialogClose>
          <Button type="submit" v-if="!isPending"> <SaveIcon /> Save changes </Button>
          <Button type="button" v-else disabled>
            <Loader2Icon class="animate-spin" /> Loading..
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
