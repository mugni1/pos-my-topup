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
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
  import { Input } from '../ui/input'
  import { HttpStatusCode } from 'axios'
  import { toast } from 'vue-sonner'
  import { inject, ref } from 'vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import type { PostCategoryResponse } from '@/types/categories'
  import { createGameSchema } from '@/validations/games'
  import { usePostGame } from '@/hooks/usePostGame'
  import { usePostFile } from '@/hooks/usePostFile'
  import type { PostFileResponse } from '@/types/storage'

  // INIT FORM
  const form = useForm({ validationSchema: createGameSchema })

  // STATE
  const isOpen = ref(false)
  const { mutateAsync: mutateGame, isPending: isPendingGame } = usePostGame()
  const { mutateAsync: mutateFile, isPending: isPendingFile } = usePostFile()
  const tableParams = inject('tableParams')
  const queryClient = useQueryClient()

  // METHODS
  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const resultImage = await mutateFile({ image: values.image })
      if (resultImage.status != HttpStatusCode.Ok) {
        toast.error(resultImage.message, { action: { label: 'Close' } })
        return
      } else {
        toast.success('Success upload image', { action: { label: 'Close' } })
      }

      const resultCover = await mutateFile({ image: values.cover })
      if (resultCover.status != HttpStatusCode.Ok) {
        toast.error(resultCover.message, { action: { label: 'Close' } })
        return
      } else {
        toast.success('Success upload cover', { action: { label: 'Close' } })
      }

      try {
        const payload = {
          title: values.title,
          studio: values.studio,
          image_url: resultImage.data?.image_url || '',
          cover_url: resultCover.data?.image_url || '',
          image_id: resultImage.data?.public_id || '',
          cover_id: resultCover.data?.public_id || '',
        }
        const results = await mutateGame(payload)
        if (results.status != HttpStatusCode.Created) {
          toast.error(results.message, { action: { label: 'Close' } })
        } else {
          toast.success(results.message, { action: { label: 'Close' } })
          isOpen.value = false
          queryClient.refetchQueries({ queryKey: ['games', tableParams] })
        }
      } catch (err: unknown) {
        const error = err as PostCategoryResponse
        toast.error(error.message, { action: { label: 'Close' } })
      }
    } catch (err: unknown) {
      const error = err as PostFileResponse
      toast.error(error.message, { action: { label: 'Close' } })
    }
  })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger>
      <Button type="button"> <PlusCircle /> Create game</Button>
    </DialogTrigger>

    <DialogContent @openAutoFocus="(e) => e.preventDefault()">
      <form @submit="handleSubmit">
        <DialogHeader>
          <DialogTitle>Create New Game</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste?
          </DialogDescription>
        </DialogHeader>
        <div class="max-h-[65vh] overflow-y-scroll space-y-4 my-3 py-2 px-5 me-2">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Free Fire MAX" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="studio">
            <FormItem>
              <FormLabel>Studio</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Garena" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="image">
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  @change="
                    (e: Event) => {
                      const target = e.target as HTMLInputElement
                      componentField.onChange(target.files?.[0] || null)
                    }
                  "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="cover">
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  @change="
                    (e: Event) => {
                      const target = e.target as HTMLInputElement
                      componentField.onChange(target.files?.[0] || null)
                    }
                  "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <Button type="submit" v-if="!isPendingGame && !isPendingFile">
            <SaveIcon /> Save Changes
          </Button>
          <Button type="button" v-else disabled>
            <Loader2Icon class="animate-spin" /> Loading..
          </Button>
          <DialogClose>
            <Button type="button" variant="outline"> <XCircle /> Cancel </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
