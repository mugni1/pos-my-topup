<script setup lang="ts">
  import { PlusCircle, SaveIcon, XCircle } from 'lucide-vue-next'
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
  import { createItemsSchemaValidate } from '@/validations/items'
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '../ui/form'
  import { Input } from '../ui/input'
  import { inject, ref, watch } from 'vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
  import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '../ui/input-group'
  // import type { PostItemResponse } from '@/types/items' // Ganti ke tipe item
  // import { usePostItem } from '@/hooks/usePostItem' // Ganti ke hook untuk items

  // INIT FORM
  const form = useForm({
    validationSchema: createItemsSchemaValidate,
    initialValues: {
      price: 0,
    },
  })

  // STATE
  const isOpen = ref(false)
  //   const { mutateAsync, isPending } = usePostItem() // Ganti ke hook untuk items
  const tableParams = inject('tableParams')
  const queryClient = useQueryClient()
  const displayPrice = ref('')
  const price = ref(0)

  // METHODS
  const formatRupiah = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '') // Hapus semua karakter non-digit
    const numberValue = parseInt(cleanValue || '0', 10) // Konversi ke number
    return new Intl.NumberFormat('id-ID').format(numberValue) // Format ke Rupiah
  }
  const parseRupiah = (formattedValue: string): number => {
    return parseInt(formattedValue.replace(/\./g, ''), 10) || 0
  }
  const handleSubmit = form.handleSubmit(async (values) => {
    console.log('Submitting values:', values)
  })

  // WATCHERS
  watch(displayPrice, (newValue: string) => {
    if (!newValue) {
      price.value = 0
      form.setFieldValue('price', 0)
      return
    }

    // Format ulang input
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
    }
  })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button type="button">
        <PlusCircle class="mr-2 h-4 w-4" />
        Create Item
      </Button>
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
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cmjuv6kj4000004iekx0hm8j9"> Electronics </SelectItem>
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
          <Button type="submit"> <SaveIcon /> Save Changes </Button>
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
