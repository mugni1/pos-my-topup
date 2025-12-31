<script setup lang="ts">
  import { ref, type HTMLAttributes } from 'vue'
  import * as z from 'zod'
  import { cn } from '@/lib/utils'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
  import { Input } from '@/components/ui/input'
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
  import { Eye, EyeClosed, KeySquareIcon, LucidePlaneTakeoff, Mail } from 'lucide-vue-next'

  // PROPS
  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  // SCHEMA
  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email().min(2).max(50),
      password: z.string().min(8).max(12),
    })
  )

  // INIT FORM
  const form = useForm({
    validationSchema: formSchema,
  })

  // PROPS
  const isPassword = ref(true)

  // METHODS
  const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
  })
  const handleCahangeType = () => {
    isPassword.value = !isPassword.value
  }
</script>

<template>
  <section :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl"> Welcome back </CardTitle>
        <CardDescription> Login with your email and password account </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="space-y-3">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel> <Mail class="size-4.5" /> Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@gmail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField, errorMessage }" name="password">
            <FormItem>
              <FormLabel> <KeySquareIcon class="size-4.5" /> Password</FormLabel>
              <div class="relative flex items-center">
                <FormControl>
                  <Input
                    :type="isPassword ? 'password' : 'text'"
                    :placeholder="isPassword ? '••••••••' : 'mypassword123'"
                    v-bind="componentField"
                  />
                  <Button
                    @click="handleCahangeType"
                    type="button"
                    class="absolute me-0.5 right-0"
                    variant="ghost"
                    size="sm"
                  >
                    <Eye v-if="!isPassword" />
                    <EyeClosed v-else />
                  </Button>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>

          <FieldGroup class="mt-5">
            <Field>
              <Button type="submit"> <LucidePlaneTakeoff class="size-4.5" /> Login </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    <FieldDescription class="px-6 text-center">
      By clicking continue, you agree to our <a href="#">Terms of Service</a> and
      <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </section>
</template>
