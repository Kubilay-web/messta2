'use client'
import Choices, { type Options as ChoiceOption } from 'choices.js'
import { type HTMLAttributes, type ReactElement, useEffect, useRef, useState } from 'react'

export type ChoiceProps = HTMLAttributes<HTMLInputElement> &
  HTMLAttributes<HTMLSelectElement> & {
    multiple?: boolean
    className?: string
    options?: Partial<ChoiceOption>
    onChange?: (text: string) => void
  } & (
    | {
        allowInput?: false
        children: ReactElement[]
      }
    | { allowInput?: true }
  )



const ChoicesFormInput = ({ children, multiple, className, onChange, allowInput, options, ...props }: ChoiceProps) => {
  const choicesRef = useRef<HTMLInputElement & HTMLSelectElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const choicesInstance = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !choicesRef.current) return

    setIsLoading(true)
    
    // Dynamic import
    import('choices.js').then((ChoicesLib) => {
      // Önceki instance'ı temizle
      if (choicesInstance.current) {
        choicesInstance.current.destroy()
      }

      // Yeni instance oluştur
      choicesInstance.current = new ChoicesLib.default(choicesRef.current!, {
        ...options,
        placeholder: true,
        allowHTML: true,
        shouldSort: false,
        removeItemButton: true,
      })

      // Event listener
      choicesInstance.current.passedElement.element.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLSelectElement | HTMLInputElement
        if (onChange) {
          onChange(target.value)
        }
      })

      setIsLoading(false)
    }).catch((error) => {
      console.error('Failed to load Choices.js:', error)
      setIsLoading(false)
    })

    // Cleanup
    return () => {
      if (choicesInstance.current) {
        choicesInstance.current.destroy()
      }
    }
  }, [options, onChange])

  // Loading state
  if (isLoading) {
    return (
      <div className="animate-pulse">
        {allowInput ? (
          <div className="h-10 bg-gray-200 rounded-md"></div>
        ) : (
          <div className="h-10 bg-gray-200 rounded-md"></div>
        )}
      </div>
    )
  }

  return allowInput ? (
    <input 
      ref={choicesRef} 
      multiple={multiple} 
      className={`${className || ''} ${isLoading ? 'opacity-50' : ''}`} 
      {...props} 
    />
  ) : (
    <select 
      ref={choicesRef} 
      multiple={multiple} 
      className={`${className || ''} ${isLoading ? 'opacity-50' : ''}`} 
      {...props}
    >
      {children}
    </select>
  )
}

export default ChoicesFormInput
