import { useNumberFieldInfo, useTsController } from '@ts-react/form'
import { useId } from 'react'
import { Fieldset, Input, InputProps, Label, Theme } from 'tamagui'
import { FieldError } from '../FieldError'
import { Shake } from '../Shake'

export const NumberField = (props: Pick<InputProps, 'size' | 'autoFocus'>) => {
  const { field, error } = useTsController<number>()
  const { label, defaultValue, isOptional, placeholder, minValue, maxValue } = useNumberFieldInfo()
  const id = useId()

  return (
    <Theme name={error ? 'red' : undefined}>
      <Fieldset>
        {!!label && (
          <Label theme="alt1" size={props.size} htmlFor={id}>
            {label} {isOptional && `(Optional)`}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <Input
            placeholderTextColor="$color10"
            keyboardType="number-pad"
            value={field.value?.toString() || '0'}
            onChangeText={(text) => {
              const num = Number(text)
              if (isNaN(num)) {
                if (!field.value) {
                  field.onChange(defaultValue || 0)
                }
                return
              }
              if (typeof maxValue !== 'undefined' && num > maxValue) {
                field.onChange(minValue)
                return
              }
              if (typeof minValue !== 'undefined' && num < minValue) {
                field.onChange(minValue)
                return
              }
              field.onChange(num)
            }}
            onBlur={field.onBlur}
            ref={field.ref}
            placeholder={placeholder}
            id={id}
            {...props}
          />
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  )
}
