'use client'
import DateFormInput from '../../../../components/form/DateFormInput'
import PasswordFormInput from '../../../../components/form/PasswordFormInput'
import TextAreaFormInput from '../../../../components/form/TextAreaFormInput'
import TextFormInput from '../../../../components/form/TextFormInput'
import PasswordStrengthMeter from '../../../../components/PasswordStrengthMeter'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsPlusCircleDotted } from 'react-icons/bs'
import * as yup from 'yup'

const ChangePassword = () => {
  const [firstPassword, setFirstPassword] = useState<string>('')

  const resetPasswordSchema = yup.object().shape({
    currentPass: yup.string().required('Please enter current Password'),
    newPassword: yup.string().min(8, 'Password must of minimum 8 characters').required('Please enter Password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  })

  const { control, handleSubmit, getValues, watch } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })

  useEffect(() => {
    setFirstPassword(getValues().newPassword)
  }, [watch('newPassword')])
  
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Change your password</h2>
        <p className="mt-1 text-sm text-gray-600">
          See resolved goodness felicity shy civility domestic had but.
        </p>
      </div>
      <div className="p-6">
        <form className="space-y-4" onSubmit={handleSubmit(() => {})}>
          <PasswordFormInput 
            name="currentPass" 
            label="Current password" 
            control={control} 
            containerClassName="w-full"
          />
          
          <div>
            <PasswordFormInput 
              name="newPassword" 
              label="New password" 
              control={control} 
              containerClassName="w-full"
            />
            <div className="mt-2">
              <PasswordStrengthMeter password={firstPassword} />
            </div>
          </div>
          
          <PasswordFormInput 
            name="confirmPassword" 
            label="Confirm password" 
            control={control} 
            containerClassName="w-full"
          />
          
          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const AccountSettings = () => {
  const createFormSchema = yup.object({
    fName: yup.string().required('Please enter your first name'),
    lName: yup.string().required('Please enter your last name'),
    additionalName: yup.string().required('Please enter additional name'),
    userName: yup.string().required('Please enter your username'),
    phoneNo: yup.string().required('Please enter your phone number'),
    email: yup.string().required('Please enter your email'),
    overview: yup.string().required('Please enter your page description').max(300, 'character limit must less then 300'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      fName: 'Sam',
      lName: 'Lanson',
      additionalName: '',
      userName: '@samlanson',
      email: 'sam@example.com',
      overview: 'Interested has all Devonshire difficulty gay assistance joy. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed. Moderate do subjects to distance.',
      phoneNo: '(678) 324-1251',
    },
  })

  return (
    <div className="space-y-6">
      {/* Account Settings Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of
            compliment alteration to.
          </p>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit(() => {})}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TextFormInput 
                name="fName" 
                label="First name" 
                control={control} 
                containerClassName="w-full"
              />
              <TextFormInput 
                name="lName" 
                label="Last name" 
                control={control} 
                containerClassName="w-full"
              />
              <TextFormInput 
                name="additionalName" 
                label="Additional name" 
                control={control} 
                containerClassName="w-full"
              />
            </div>

            {/* Username and Birthday */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <TextFormInput 
                name="userName" 
                label="User name" 
                control={control} 
                containerClassName="w-full"
              />
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Birthday
                </label>
                <DateFormInput 
                  placeholder="12/12/1990" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  options={{ defaultDate: '12/12/1990' }} 
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center">
              <input 
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                type="checkbox" 
                id="allowChecked" 
                defaultChecked 
              />
              <label className="ml-2 text-sm text-gray-700" htmlFor="allowChecked">
                Allow anyone to add you to their team
              </label>
            </div>

            {/* Phone and Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <TextFormInput 
                  name="phoneNo" 
                  label="Phone number" 
                  control={control} 
                  containerClassName="w-full"
                />
                <Link 
                  className="mt-2 inline-flex items-center rounded-lg border border-dashed border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700" 
                  href="#"
                >
                  <BsPlusCircleDotted className="mr-1.5 h-4 w-4" />
                  Add new phone number
                </Link>
              </div>
              
              <div>
                <TextFormInput 
                  name="email" 
                  label="Email" 
                  control={control} 
                  containerClassName="w-full"
                />
                <Link 
                  className="mt-2 inline-flex items-center rounded-lg border border-dashed border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700" 
                  href="#"
                >
                  <BsPlusCircleDotted className="mr-1.5 h-4 w-4" />
                  Add new email address
                </Link>
              </div>
            </div>

            {/* Overview */}
            <div>
              <TextAreaFormInput 
                name="overview" 
                label="Overview" 
                rows={4} 
                placeholder="Description (Required)" 
                control={control} 
                containerClassName="w-full"
              />
              <p className="mt-1 text-xs text-gray-500">Character limit: 300</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button 
                type="submit" 
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Card */}
      <ChangePassword />
    </div>
  )
}

export default AccountSettings