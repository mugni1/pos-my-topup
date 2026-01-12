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
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '../ui/form'
  import { useForm } from 'vee-validate'
  import { updateItemsSchemaValidate } from '@/validations/items'
  import { Input } from '../ui/input'
  import { computed, inject, ref, watch } from 'vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
  import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '../ui/input-group'
  import { HttpStatusCode } from 'axios'
  import { toast } from 'vue-sonner'
  import type { GetParamsType } from '@/types/global.type'
  import type { ItemType, PostItemResponse } from '@/types/items'
  import { DropdownMenuItem } from '../ui/dropdown-menu'
  import { usePutItem } from '@/hooks/usePutItem'
  import { formatRupiah, parseRupiah } from '@/lib/formated'
  import { useGetCategories } from '@/hooks/useGetCategories'
  import { usePostFile } from '@/hooks/usePostFile'
  import type { PostFileResponse } from '@/types/storage'

  // PROPS
  const props = defineProps<{
    data: ItemType
  }>()

  // INIT FORM
  const form = useForm({
    validationSchema: updateItemsSchemaValidate,
    initialValues: {
      price: props.data.price,
      name: props.data.name,
      category_id: props.data.categoryId,
      merchant_name: props.data.merchantName,
    },
  })

  // STATE
  const categoryParams = computed(
    (): GetParamsType => ({
      limit: 100,
      orderBy: 'createdAt',
      sortBy: 'desc',
      page: 1,
      search: '',
    })
  )
  const { data: categories, isPending: categoriesPending } = useGetCategories(categoryParams)
  const { mutateAsync: mutateFile, isPending: isPendingFile } = usePostFile()
  const { mutateAsync: mutateItem, isPending: isPendingItem } = usePutItem()
  const isOpen = ref(false)
  const tableParams = inject('tableParams')
  const queryClient = useQueryClient()
  const displayPrice = ref('')
  const price = ref(0)

  // METHODS
  const handleSubmit = form.handleSubmit(async (values) => {
    let image_url = undefined
    let image_id = undefined
    
    if(values.image) {
      try {
        const result = await mutateFile({image: values.image})
        if(result.status != HttpStatusCode.Ok){
          toast.error(result.message, {action: {label: 'close'}})
          return
        }else{
          toast.success(result.message, {action: {label: 'close'}})
          image_url = result.data?.image_url || ""
          image_id = result.data?.public_id || ""
        }
      }catch(err: unknown) {
        const errors =  err as PostFileResponse
        toast.error(errors.message, {action: {label: 'close'}})
        return
      }
    }
    
    try {
      const results = await mutateItem({
        ...values,
        id: props.data.id,
        price: Number(values.price),
        image_url,
        image_id
      })
      if (results.status != HttpStatusCode.Ok) {
        toast.error(results.message, { action: { label: 'close' } })
      } else {
        toast.success(results.message, { action: { label: 'close' } })
        queryClient.refetchQueries({
          queryKey: ['items', tableParams],
        })
      }
    } catch (err: unknown) {
      const error = err as PostItemResponse
      toast.error(error.message, { action: { label: 'close' } })
    } finally {
      isOpen.value = false
    }
  })

  // WATCHERS
  watch(displayPrice, (newValue: string) => {
    const formatted = formatRupiah(newValue)
    const parsedValue = parseRupiah(formatted)

    // Update nilai
    price.value = parsedValue
    form.setFieldValue('price', parsedValue)

    // Update display value jika berbeda dengan format yang benar
    if (newValue !== formatted) {
      displayPrice.value = formatted
    }
  })
  watch(isOpen, (newValue) => {
    if (!newValue) {
      form.resetForm()
      form.setFieldValue('price', 0)
      displayPrice.value = ''
      price.value = 0
    } else {
      form.setFieldValue('price', props.data.price)
      displayPrice.value = formatRupiah(props.data.price.toString())
      price.value = props.data.price
      form.setFieldValue('name', props.data.name)
      form.setFieldValue('merchant_name', props.data.merchantName)
      form.setFieldValue('category_id', props.data.categoryId)
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
      <form @submit.prevent="handleSubmit">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
          <DialogDescription>
            Add a new item to your inventory. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>

        <div class="max-h-[65vh] overflow-y-scroll space-y-4 my-3 py-2 px-5 me-2">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., Diamond Game" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="category_id">
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="w-full">
                    <SelectValue
                      :placeholder="categoriesPending ? 'Loading..' : 'Select category'"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem v-for="category in categories?.data || []" :value="category.id">
                    {{ category.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="merchant_name">
            <FormItem>
              <FormLabel>Merchant Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., GameStore" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="price">
            <FormItem>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>Rp</InputGroupText>
                </InputGroupAddon>
                <FormControl>
                  <InputGroupInput
                    :modelValue="displayPrice"
                    placeholder="0"
                    type="text"
                    @input="
                      (e: Event) => {
                        const target = e.target as HTMLInputElement
                        displayPrice = target.value
                        field.onChange(price)
                      }
                    "
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>IDR</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FormDescription> Actual value: {{ price.toLocaleString('id-ID') }} </FormDescription>
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
        </div>

        <DialogFooter>
          <Button v-if="isPendingFile || isPendingItem" type="button" disabled>
            <Loader2 class="animate-spin" /> Loading..
          </Button>
          <Button v-else type="submit"> <SaveIcon /> Save Changes </Button>
          <DialogClose as-child>
            <Button type="button" variant="outline">
              <XCircle />
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
