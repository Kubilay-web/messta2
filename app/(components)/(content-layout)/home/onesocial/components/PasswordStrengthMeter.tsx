import { useEffect, useState } from 'react'

type PasswordStrengthMeterProps = {
  password: string
}

type GetProgressType = (progress: number) => {
  color: 'bg-green-500' | 'bg-red-500' | 'bg-yellow-500' | 'bg-blue-500'
  message: string
}

const getProgress: GetProgressType = (progress: number) => {
  if (progress > 75)
    return {
      color: 'bg-green-500',
      message: 'Yeah! that password rocks ;)',
    }
  else if (progress > 50)
    return {
      color: 'bg-blue-500',
      message: 'That is better',
    }
  else if (progress > 25)
    return {
      color: 'bg-yellow-500',
      message: 'That is a simple one',
    }
  else
    return {
      color: 'bg-red-500',
      message: 'Easy peasy!',
    }
}

const calculatePasswordStrength = (password: string) => {
  let score = 0

  const regexLower = new RegExp('(?=.*[a-z])')
  const regexUpper = new RegExp('(?=.*[A-Z])')
  const regexDigits = new RegExp('(?=.*[0-9])')
  const regexLength = new RegExp('(?=.{' + 8 + ',})')

  if (password.match(regexLower)) score += 25
  if (password.match(regexUpper)) score += 25
  if (password.match(regexDigits)) score += 25
  if (password.match(regexLength)) score += 25

  return score
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const [fillAmount, setFillAmount] = useState(0)

  useEffect(() => {
    setFillAmount(calculatePasswordStrength(password))
  }, [password])

  const progressVariant = getProgress(fillAmount)

  return (
    <>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${progressVariant.color}`}
          style={{ width: `${fillAmount}%` }}
        />
      </div>
      <div className="mt-1 text-left text-sm">{progressVariant.message}</div>
    </>
  )
}

export default PasswordStrengthMeter