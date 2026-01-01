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
  import { createCategorySchemaValidate } from '@/validations/categories'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
  import { Input } from '../ui/input'

  // INIT FORM
  const form = useForm({ validationSchema: createCategorySchemaValidate })

  // METHODS
  const handleSubmit = form.handleSubmit((values) => {
    console.log(values)
  })
</script>

<template>
  <Dialog>
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
          <Button type="submit"> <SaveIcon /> Save changes </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
