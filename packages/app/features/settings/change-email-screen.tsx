import {
  Button,
  ButtonText,
  Fieldset,
  Form,
  H1,
  H2,
  H3,
  Input,
  Label,
  YStack,
  useToastController,
} from '@my/ui'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import { useState } from 'react'
import { SettingTitle } from './components/title'

export const ChangeEmailScreen = () => {
  const { user } = useUser()
  const [email, setEmail] = useState('')
  const supabase = useSupabase()
  const toast = useToastController()

  const handleChangePassword = async () => {
    if (!email) {
      toast.show('Fill out the fields first.')
      return
      return
    }

    const { data, error } = await supabase.auth.updateUser({ email })
    if (error) {
      toast.show(error.message)
    } else {
      toast.show('Successfully updated!')
    }
  }

  return (
    <Form onSubmit={() => handleChangePassword()} px="$5" py="$10" gap="$5" f={1} jc="space-between">
      <YStack gap="$4">
        <SettingTitle webOnly backHref="/settings">
          Change Email
        </SettingTitle>

        <Fieldset>
          <Label htmlFor="current-email">Current Email</Label>
          <Input
            disabled
            opacity={0.5}
            id="current-email"
            autoComplete="email"
            value={user?.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="email">New Email</Label>
          <Input
            id="email"
            autoComplete="email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </Fieldset>
      </YStack>

      <Form.Trigger asChild>
        <Button themeInverse textProps={{ color: '$color1' }}>
          Update Email
        </Button>
      </Form.Trigger>
    </Form>
  )
}
