import type { FormInputProps } from '../../types/component'
import { useState, type InputHTMLAttributes } from 'react'
import { Controller, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordFormInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  containerClassName: containerClass,
  control,
  id,
  labelClassName: labelClass,
  label,
  noValidate,
  ...other
}: FormInputProps<TFieldValues> & InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={'' as PathValue<TFieldValues, TName>}
      control={control}
      render={({ field, fieldState }) => (
        <div className={containerClass ?? ''}>
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
          <div className="relative">
            <input
              id={id}
              type={showPassword ? 'text' : 'password'}
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
            <span 
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!fieldState.error &&
                (showPassword ? 
                  <FaEyeSlash size={18} className="text-gray-500 hover:text-gray-700" /> : 
                  <FaEye size={18} className="text-gray-500 hover:text-gray-700" />
                )}
            </span>
          </div>
        </div>
      )}
    />
  )
}

export default PasswordFormInput