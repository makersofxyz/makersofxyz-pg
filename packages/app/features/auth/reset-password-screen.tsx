import {
  Button,
  FormWrapper,
  H2,
  Link,
  Paragraph,
  SchemaForm,
  Text,
  YStack,
  formFields,
} from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import React, { useEffect } from 'react'
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { createParam } from 'solito'
import { z } from 'zod'

const { useParams, useUpdateParams } = createParam<{ email?: string }>()

const ResetPasswordSchema = z.object({
  email: formFields.email.describe('Email // your@email.acme'),
})

export const ResetPasswordScreen = () => {
  const supabase = useSupabase()
  const { params } = useParams()
  const updateParams = useUpdateParams()
  useEffect(() => {
    if (params?.email) {
      updateParams({ email: undefined }, { web: { replace: true } })
    }
  }, [])

  const form = useForm<z.infer<typeof ResetPasswordSchema>>()

  async function resetPassword({ email }: z.infer<typeof ResetPasswordSchema>) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      alert(error.message)
    }
  }

  return (
    <FormProvider {...form}>
      {form.formState.isSubmitSuccessful ? (
        <CheckYourEmail />
      ) : (
        <SchemaForm
          form={form}
          schema={ResetPasswordSchema}
          defaultValues={{
            email: params?.email,
          }}
          onSubmit={resetPassword}
          header={
            <YStack gap="$3" mb="$4">
              <H2>Reset your password</H2>
              <Paragraph theme="alt1">
                Type in your email and we'll send you a link to reset your password
              </Paragraph>
            </YStack>
          }
          renderAfter={({ submit }) => (
            <>
              <Button onPress={() => submit()} borderRadius={100} themeInverse>
                Send Link
              </Button>
              <SignInLink />
              {/* <YStack>
            <Button disabled={loading} onPress={() => signInWithProvider('github')}>
              GitHub Login
            </Button>
          </YStack> */}
            </>
          )}
        />
      )}
    </FormProvider>
  )
}

const CheckYourEmail = () => {
  const email = useWatch<z.infer<typeof ResetPasswordSchema>>({ name: 'email' })
  const { reset } = useFormContext()
  return (
    <FormWrapper>
      <FormWrapper.Body>
        <YStack gap="$3">
          <H2>Check Your Email</H2>
          <Paragraph theme="alt1">
            We've sent you a reset link. Please check your email ({email}) and confirm it.
          </Paragraph>
        </YStack>
      </FormWrapper.Body>
      <FormWrapper.Footer>
        <Button themeInverse icon={ChevronLeft} borderRadius={100} onPress={() => reset()}>
          Back
        </Button>
      </FormWrapper.Footer>
    </FormWrapper>
  )
}

const SignInLink = () => {
  const email = useWatch<z.infer<typeof ResetPasswordSchema>>({ name: 'email' })

  return (
    <Link
      href={`/sign-in?${new URLSearchParams(email ? { email } : undefined)}`}
      textAlign="center"
      theme="alt1"
    >
      Done resetting? <Text textDecorationLine="underline">Sign in</Text>
    </Link>
  )
}
