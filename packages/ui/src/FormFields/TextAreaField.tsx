import { useFieldInfo, useTsController } from '@ts-react/form'
import { useId } from 'react'
import { Label, TextArea, TextAreaProps, Theme, Fieldset } from 'tamagui'
import { FieldError } from '../FieldError'
import { Shake } from '../Shake'

export const TextAreaField = (props: Pick<TextAreaProps, 'size' | 'autoFocus'>) => {
  const { field, error } = useTsController<string>()
  const { label, isOptional, placeholder } = useFieldInfo()
  const id = useId()

  return (
    <Theme name={error ? 'red' : undefined}>
      <Fieldset>
        {!!label && (
          <Label theme="alt1" size={props.size || "$3"} htmlFor={id}>
            {label} {isOptional && `(Optional)`}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <TextArea
          placeholderTextColor="$color10"
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            onBlur={field.onBlur}
            ref={field.ref}
            placeholder={placeholder}
            id={id}
            numberOfLines={5}
            {...props}
          />
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  )
}
