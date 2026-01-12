<script setup lang="ts">
  import { Loader2, PenBox, SaveIcon, XCircle } from 'lucide-vue-next'
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
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
  import { useForm } from 'vee-validate'
  import { Input } from '../ui/input'
  import { inject, ref } from 'vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import { HttpStatusCode } from 'axios'
  import { toast } from 'vue-sonner'
  import { DropdownMenuItem } from '../ui/dropdown-menu'
  import { updateGameSchema } from '@/validations/games'
  import { usePutGame } from '@/hooks/usePutGame'
  import { usePostFile } from '@/hooks/usePostFile'
  import type { GetGameType, PutGamePayload } from '@/types/game'
  import type { PostFileResponse } from '@/types/storage'

  // PROPS
  const props = defineProps<{
    data: GetGameType
  }>()

  // INIT FORM
  const form = useForm({
    validationSchema: updateGameSchema,
    initialValues: {
      title: props.data.title,
      studio: props.data.studio,
    },
  })

  // STATE
  const { mutateAsync: mutateGame, isPending: isPendingGame } = usePutGame()
  const { mutateAsync: mutateFile, isPending: isPendingFile } = usePostFile()
  const isOpen = ref(false)
  const tableParams = inject('tableParams')
  const queryClient = useQueryClient()

  // METHODS
  const handleSubmit = form.handleSubmit(async (values) => {
    let imageUrl = undefined
    let imageId = undefined
    let coverUrl = undefined
    let coverId = undefined

    if (values.image) {
      try {
        const resultImage = await mutateFile({ image: values.image })
        if (resultImage.status != HttpStatusCode.Ok) {
          toast.error(resultImage.message, { action: { label: 'close' } })
          return
        } else {
          imageUrl = resultImage.data?.image_url
          imageId = resultImage.data?.public_id
          toast.success('Success upload image', { action: { label: 'close' } })
        }
      } catch (err: unknown) {
        const error = err as PostFileResponse
        toast.error(error.message, { action: { label: 'close' } })
        return
      }
    }
    if (values.cover) {
      try {
        const resultImage = await mutateFile({ image: values.cover })
        if (resultImage.status != HttpStatusCode.Ok) {
          toast.error(resultImage.message, { action: { label: 'close' } })
          return
        } else {
          coverUrl = resultImage.data?.image_url
          coverId = resultImage.data?.public_id
          toast.success('Success upload cover', { action: { label: 'close' } })
        }
      } catch (err: unknown) {
        const error = err as PostFileResponse
        toast.error(error.message, { action: { label: 'close' } })
        return
      }
    }

    const payload: PutGamePayload = {
      id: props.data.id,
      title: values.title,
      studio: values.studio,
      image_url: imageUrl,
      image_id: imageId,
      cover_url: coverUrl,
      cover_id: coverId,
    }
    const results = await mutateGame(payload)
    if (results.status != HttpStatusCode.Ok) {
      toast.error(results.message, { action: { label: 'close' } })
    } else {
      toast.success(results.message, { action: { label: 'close' } })
      queryClient.refetchQueries({ queryKey: ['games', tableParams] })
      isOpen.value = false
    }
  })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <DropdownMenuItem variant="default" size="icon" @select.prevent>
        <PenBox /> Update
      </DropdownMenuItem>
    </DialogTrigger>

    <DialogContent @openAutoFocus="(e) => e.preventDefault()" :showCloseButton="false">
      <form @submit="handleSubmit">
        <DialogHeader>
          <DialogTitle>Update Game</DialogTitle>
          <DialogDescription>
            Add a new item to your inventory. Fill in all required fields.
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
          <Button v-if="isPendingGame || isPendingFile" type="button" disabled>
            <Loader2 class="animate-spin" /> Loading..
          </Button>
          <Button v-else type="submit"> <SaveIcon /> Save Changes </Button>
          <DialogClose as-child>
            <Button type="button" variant="outline"> <XCircle /> Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
