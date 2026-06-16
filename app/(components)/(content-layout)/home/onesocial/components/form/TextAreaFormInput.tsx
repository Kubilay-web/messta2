import { Controller, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form'
import type { FormInputProps } from '../../types/component'

type TextAreaFormInputProps = { rows?: number }

const TextAreaFormInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  rows = 3,
  containerClassName,
  control,
  id,
  labelClassName,
  label,
  noValidate,
  ...other
}: FormInputProps<TFieldValues> & React.TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaFormInputProps) => {
  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={'' as PathValue<TFieldValues, TName>}
      control={control}
      render={({ field, fieldState }) => (
        <div className={containerClassName ?? ''}>
          {label && (
            <label 
              htmlFor={id ?? name} 
              className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName || ''}`}
            >
              {label}
            </label>
          )}
          <textarea
            id={id}
            rows={rows}
            {...other}
            {...field}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${fieldState.error?.message ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300'}
              ${other.className || ''}
            `}
          />
          {!noValidate && fieldState.error?.message && (
            <p className="mt-1 text-sm text-red-600">
              {fieldState.error?.message}
            </p>
          )}
        </div>
      )}
    />
  )
}

export default TextAreaFormInput