import { Button, FormWrapper, H2, Paragraph, SubmitButton, Text, Theme, YStack, isWeb } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { SchemaForm, formFields } from 'app/utils/SchemaForm'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import React, { useEffect } from 'react'
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { createParam } from 'solito'
import { Link } from 'solito/link'
import { z } from 'zod'
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from "expo-web-browser";
import { initiateAppleSignIn } from 'app/utils/auth/initiateAppleSignIn'
import { useRouter } from 'solito/router'
import { Platform } from 'react-native';
//import { initiateGoogleSignIn } from 'app/utils/auth/initiateGoogleSignIn'

const { useParams, useUpdateParams } = createParam<{ email?: string }>()

const SignUpSchema = z.object({
  email: formFields.text.email().describe('Email // your@email.acme'),
  password: formFields.text.min(6).describe('Password // Choose a password'),
})

export const SignUpScreen = () => {
  const router = useRouter()
  const supabase = useSupabase()
  const updateParams = useUpdateParams()
  const { params } = useParams()

  useEffect(() => {
    if (params?.email) {
      updateParams({ email: undefined }, { web: { replace: true } })
    }
  }, [params?.email, updateParams])

  const form = useForm<z.infer<typeof SignUpSchema>>()

  async function signUpWithEmail({ email, password }: z.infer<typeof SignUpSchema>) {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // To take user's name other info
        data: {
          // first_name: firstName, // coming from state
          // last_name: lastName,
        },
      },
    })

    if (error) {
      const errorMessage = error?.message.toLowerCase()
      if (errorMessage.includes('email')) {
        form.setError('email', { type: 'custom', message: errorMessage })
      } else if (errorMessage.includes('password')) {
        form.setError('password', { type: 'custom', message: errorMessage })
      } else {
        form.setError('password', { type: 'custom', message: errorMessage })
      }
    }
  }

  async function signInWithApple() {
    try {
      const { token, nonce } = await initiateAppleSignIn();
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token,
        nonce,
      });
      if (!error) router.replace("/");
      if (error) throw error;
    } catch (e) {
      if (e instanceof Error && "code" in e) {
        if (e.code === "ERR_REQUEST_CANCELED") {
          // handle if the user canceled the sign-in flow
        } else {
          // handle any other errors
        }
      } else {
        console.error("Unexpected error from Apple SignIn: ", e);
      }
    }
  }

  async function signInWithGoogle() {
      /**
       * Google One Tap
       * This is the method for Google One Tap. It is not available on iOS
       * and requires sponsoring the project. See more here: https://github.com/react-native-google-signin/google-signin/issues/1176#issuecomment-1674385846.
    if (Platform.OS === "android") {
      const { rawNonce, hashedNonce } = await initiateGoogleSignIn();
      const userInfo = await GoogleOneTapSignIn.signIn({
        webClientId:
          "YOUR_WEB_CLIENT_ID",
        nonce: hashedNonce,
      });
      const token = userInfo?.idToken;
      if (!token) throw new Error("No id token");
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: token,
        nonce: rawNonce,
      });
      if (!error) router.replace("/");
      if (error) return Alert.alert("Error", error.message);
    } else {
      Platform.OS === "ios";
    */
      try {
        // whatever route you want to deeplink to; make sure to configure in Supabase dashboard
        const redirectUri = "myapp://";
        const provider = "google";
        const response = await WebBrowser.openAuthSessionAsync(
          `${process.env.EXPO_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUri}`,
          redirectUri,
        );

        if (response.type === "success") {
          const url = response.url;
          const params = url.split("#")[1];
          if (!params) return;
          const paramsArray = params.split("&");
          const accessToken = paramsArray[0]?.split("=")[1];
          const refreshToken = paramsArray[2]?.split("=")[1];

          if (accessToken && refreshToken) {
            // handle error
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (error) {
              // handle error
            }
          }
        }
      } catch (error) {
        // handle error
      } finally {
        WebBrowser.maybeCompleteAuthSession();
        router.replace("/");
      }
    }

  return (
    <FormProvider {...form}>
      {form.formState.isSubmitSuccessful ? (
        <CheckYourEmail />
      ) : (
        <SchemaForm
          form={form}
          schema={SignUpSchema}
          defaultValues={{
            email: params?.email || '',
            password: '',
          }}
          props={{
            password: {
              secureTextEntry: true,
            },
          }}
          onSubmit={signUpWithEmail}
          renderAfter={({ submit }) => (
            <>
              <Theme inverse>
                <SubmitButton onPress={() => submit()} borderRadius="$10">
                  Sign Up
                </SubmitButton>
              </Theme>
              <SignInLink />
              <YStack>
                {Platform.OS === 'ios' && (
                  <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={{ width: "100%", height: 44 }}
                    onPress={signInWithApple}
                  />
                )}
              </YStack>
              <YStack>
                {!isWeb && (
                  <Button theme="alt1" onPress={() => signInWithGoogle()}>
                    Sign in with Google
                  </Button>
                )}
              </YStack>
              {/* <YStack>
            <Button disabled={loading} onPress={() => signInWithProvider('github')}>
              GitHub Login
            </Button>
          </YStack> */}
            </>
          )}
        >
          {(fields) => (
            <>
              <YStack gap="$3" mb="$4">
                <H2 $sm={{ size: '$8' }}>Get Started</H2>
                <Paragraph theme="alt2">Create a new account</Paragraph>
              </YStack>
              {Object.values(fields)}
            </>
          )}
        </SchemaForm>
      )}
    </FormProvider>
  )
}

const SignInLink = () => {
  const email = useWatch<z.infer<typeof SignUpSchema>>({ name: 'email' })

  return (
    <Link href={`/sign-in?${new URLSearchParams(email ? { email } : undefined).toString()}`}>
      <Paragraph textAlign="center" theme="alt1">
        Already signed up? <Text textDecorationLine="underline">Sign in</Text>
      </Paragraph>
    </Link>
  )
}

const CheckYourEmail = () => {
  const email = useWatch<z.infer<typeof SignUpSchema>>({ name: 'email' })
  const { reset } = useFormContext()

  return (
    <FormWrapper>
      <FormWrapper.Body>
        <YStack gap="$3">
          <H2>Check Your Email</H2>
          <Paragraph theme="alt1">
            We&apos;ve sent you a confirmation link. Please check your email ({email}) and confirm
            it.
          </Paragraph>
        </YStack>
      </FormWrapper.Body>
      <FormWrapper.Footer>
        <Button themeInverse icon={ChevronLeft} borderRadius="$10" onPress={() => reset()}>
          Back
        </Button>
      </FormWrapper.Footer>
    </FormWrapper>
  )
}
