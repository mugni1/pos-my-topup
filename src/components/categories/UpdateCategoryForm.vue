<script setup lang="ts">
  import type { CategoryType, PostCategoryResponse } from '@/types/categories'
  import { Loader2Icon, PenBox, SaveIcon, XCircle } from 'lucide-vue-next'
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
  import { createCategorySchema } from '@/validations/categories'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
  import { Input } from '../ui/input'
  import { HttpStatusCode } from 'axios'
  import { toast } from 'vue-sonner'
  import { computed, inject, ref, type Ref } from 'vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import { DropdownMenuItem } from '../ui/dropdown-menu'
  import { usePutCategory } from '@/hooks/usePutCategory'
  import type { GetParamsType } from '@/types/global.type'
  import { useGetGames } from '@/hooks/useGetGames'
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '../ui/select'

  // PROPS
  const props = defineProps<{
    data: CategoryType
  }>()

  // STATE
  const gameParams = computed(
    (): GetParamsType => ({
      limit: 1000,
      orderBy: 'createdAt',
      sortBy: 'desc',
      page: 1,
      search: '',
    })
  )
  const isOpen = ref(false)
  const { data, isPending: isPendingGame } = useGetGames(gameParams)
  const { mutateAsync, isPending: isPendingCategory } = usePutCategory()
  const tableParams: Ref<CategoryType> | undefined = inject('tableParams')
  const queryClient = useQueryClient()

  // INIT FORM
  const form = useForm({
    validationSchema: createCategorySchema,
    initialValues: {
      name: props.data.name,
      code: props.data.code,
      game_id: props.data.gameId,
    },
  })

  // METHODS
  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const results = await mutateAsync({
        id: props.data.id,
        data: {
          code: values.code,
          name: values.name,
          game_id: values.game_id,
        },
      })
      if (results.status != HttpStatusCode.Ok) {
        toast.error(results.message, { action: { label: 'close' } })
      } else {
        toast.success(results.message, { action: { label: 'close' } })
        queryClient.refetchQueries({
          queryKey: ['categories', tableParams],
        })
        isOpen.value = false
      }
    } catch (err: unknown) {
      const error = err as PostCategoryResponse
      toast.error(error.message, { action: { label: 'close' } })
    }
  })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger asChild>
      <DropdownMenuItem size="icon" @select.prevent> <PenBox /> Update</DropdownMenuItem>
    </DialogTrigger>

    <DialogContent @openAutoFocus="(e) => e.preventDefault()">
      <form @submit="handleSubmit" class="space-y-4">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div class="max-h-[65vh] overflow-y-scroll space-y-4 my-3 py-2 px-5 me-2">
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

          <FormField v-slot="{ componentField }" name="game_id">
            <FormItem>
              <FormLabel>Game</FormLabel>
              <Select v-bind="componentField">
                <SelectTrigger class="w-full">
                  <SelectValue :placeholder="isPendingGame ? 'Loading..' : 'Select game'" />
                </SelectTrigger>
                <SelectContent class="max-h-[50vh]">
                  <SelectGroup>
                    <SelectLabel>List of games</SelectLabel>
                    <SelectItem v-for="game in data?.data || []" :key="game.id" :value="game.id">
                      {{ game.title }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <Button v-if="isPendingCategory || isPendingGame" type="button" disabled>
            <Loader2Icon class="animate-spin" /> Loading..
          </Button>
          <Button v-else type="submit"> <SaveIcon /> Save changes </Button>
          <DialogClose>
            <Button type="button" variant="outline"> <XCircle /> Cancel </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
