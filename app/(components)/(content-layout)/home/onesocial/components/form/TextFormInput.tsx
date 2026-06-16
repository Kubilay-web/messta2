import { type InputHTMLAttributes } from 'react'
import { Controller, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form'

import type { FormInputProps } from '../../types/component'

const TextFormInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  containerClassName: containerClass,
  control,
  id,
  label,
  noValidate,
  labelClassName: labelClass,
  ...other
}: FormInputProps<TFieldValues> & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={'' as PathValue<TFieldValues, TName>}
      control={control}
      render={({ field, fieldState }) => (
        <div className={containerClass}>
          {label &&
            (typeof label === 'string' ? (
              <label 
                htmlFor={id ?? name} 
                className={`block text-sm font-medium text-gray-700 mb-2 ${labelClass || ''}`}
              >
                {label}
              </label>
            ) : (
              <>{label}</>
            ))}
          <input
            id={id ?? name}
            {...other}
            {...field}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${fieldState.error?.message ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300'}
              ${other.className || ''}
            `}
          />
          {!noValidate && fieldState.error?.message && (
            <p className="mt-1 text-sm text-red-600 text-left">
              {fieldState.error?.message}
            </p>
          )}
        </div>
      )}
    />
  )
}

export default TextFormInput