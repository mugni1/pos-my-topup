<script setup lang="ts">
  import { ref, type HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
  import { Input } from '@/components/ui/input'
  import { useForm } from 'vee-validate'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
  import { Eye, EyeClosed, KeySquareIcon, Loader2, LucidePlaneTakeoff, Mail } from 'lucide-vue-next'
  import { usePostAuthLogin } from '@/hooks/usePostAuthLogin'
  import { toast } from 'vue-sonner'
  import { HttpStatusCode } from 'axios'
  import Cookies from 'js-cookie'
  import { loginSchemaValidate } from '@/validations/auth'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import type { PostLoginPayloadType, PostLoginResponseType } from '@/types/auth'
  import type { UserType } from '@/types/global.type'

  // PROPS
  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  // INIT FORM
  const form = useForm({
    validationSchema: loginSchemaValidate,
  })

  // STATE
  const { mutateAsync, isPending } = usePostAuthLogin()
  const { setUser } = useAuthStore()
  const router = useRouter()
  const isPassword = ref(true)

  // METHODS
  const handleSubmit = form.handleSubmit(async (values: PostLoginPayloadType) => {
    try {
      const results = await mutateAsync(values)
      if (results.status != HttpStatusCode.Ok) {
        toast.error(results.message, { action: { label: 'Close' } })
      } else {
        Cookies.set('token', results.data?.token || '')
        if (results.data) {
          setUser(results.data.user)
        }
        toast.success(results.message, { action: { label: 'Close' } })
        router.push('/')
      }
    } catch (err: unknown) {
      const error = err as PostLoginResponseType
      toast.error(error.message, { action: { label: 'Close' } })
    }
  })
  const handleCahangeType = () => {
    isPassword.value = !isPassword.value
  }
</script>

<template>
  <section :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl"> Welcome Back </CardTitle>
        <CardDescription> Login with your email and password. </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="handleSubmit" class="space-y-3">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel> <Mail class="size-4.5" /> Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@gmail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
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
              <Button v-if="!isPending" type="submit">
                <LucidePlaneTakeoff class="size-4.5" /> Login
              </Button>
              <Button v-else type="button" disabled>
                <Loader2 class="size-4.5 animate-spin" /> Loading...
              </Button>
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
