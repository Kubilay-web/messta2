// "use client";

// import { cn } from "../../lib/utils";
// import React, { useEffect, useState } from "react";
// import Select from "react-tailwindcss-select";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../components/ui/tooltip";
// import { CircleHelp } from "lucide-react";
// import { countries } from "../../countries";

// type TextInputProps = {
//   register: any;
//   setPhoneCode: any;
//   errors: any;
//   label: string;
//   type?: string;
//   name: string;
//   toolTipText?: string;
//   unit?: string;
//   placeholder?: string;
//   icon?: any;
// };

// export default function PhoneInput({
//   register,
//   errors,
//   label,
//   type = "text",
//   name,
//   toolTipText,
//   unit,
//   icon,
//   placeholder,
//   setPhoneCode,
// }: TextInputProps) {
//   const Icon = icon;
//   const initialCountryCode = "UG";
//   const modifiedCountries = countries.map((country) => {
//     return {
//       value: country.value,
//       label: `${country.countryCode} ${country.phoneCode}`,
//       phoneCode: country.phoneCode,
//       currencyCode: country.currencyCode,
//       countryCode: country.countryCode,
//       flag: country.flag,
//     };
//   });
//   const initialCountry = modifiedCountries.find(
//     (item) => item.countryCode === initialCountryCode
//   );
//   const [selectedCountry, setSelectedCountry] = useState<any>(initialCountry);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   console.log(initialCountry);
//   const handleCountryChange = (country = selectedCountry) => {
//     setSelectedCountry(country);
//     setPhoneCode(country.phoneCode);
//     console.log(country);
//   };
//   useEffect(() => {
//     setPhoneCode(selectedCountry.phoneCode);
//   }, []);

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // Remove any non-digit characters
//     const cleanValue = value.replace(/\D/g, "");
//     setPhoneNumber(cleanValue);

//     // Update the hidden input with full phone number
//     const fullNumber = `${selectedCountry.phoneCode}${cleanValue}`;
//     register(name).onChange({
//       target: {
//         name,
//         value: fullNumber,
//       },
//     });
//   };

//   return (
//     <div>
//       <div className="flex space-x-2 items-center">
//         <label
//           htmlFor={name}
//           className="block text-sm font-medium leading-6 text-gray-900"
//         >
//           {label}
//         </label>
//         {toolTipText && (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <button>
//                   <CircleHelp className="w-4 h-4 text-slate-500" />
//                 </button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{toolTipText}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         )}
//       </div>
//       <div className="mt-2">
//         <div className="flex gap-2">
//           <div className="w-32">
//             <div className="">
//               <div className="flex items-center space-x-2">
//                 <Select
//                   isSearchable
//                   primaryColor="blue"
//                   value={selectedCountry}
//                   onChange={handleCountryChange}
//                   options={modifiedCountries}
//                   placeholder={label}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="relative rounded-md flex-1">
//             {icon && (
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <Icon className="text-slate-300 w-4 h-4" />
//               </div>
//             )}
//             <input
//               id={name}
//               type="tel"
//               {...register(`${name}`, { required: true })}
//               className={cn(
//                 "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm",
//                 (errors[`${name}`] && "focus:ring-red-500 pl-8") ||
//                   (icon && "pl-8")
//               )}
//               placeholder={placeholder || label}
//             />
//             {unit && (
//               <p className="bg-white py-2 px-3 rounded-tr-md rounded-br-md absolute inset-y-0 right-1 my-[2px] flex items-center">
//                 {unit}
//               </p>
//             )}
//           </div>
//         </div>
//         {errors[name] && (
//           <span className="text-xs text-red-600">{label} is required</span>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { countries } from "../../countries";

type TextInputProps = {
  register: any;
  setPhoneCode: any;
  errors: any;
  label: string;
  type?: string;
  name: string;
  toolTipText?: string;
  unit?: string;
  placeholder?: string;
  icon?: any;
};

export default function PhoneInput({
  register,
  errors,
  label,
  type = "text",
  name,
  toolTipText,
  unit,
  icon,
  placeholder,
  setPhoneCode,
}: TextInputProps) {
  const Icon = icon;

  const initialCountryCode = "UG";

  const modifiedCountries = countries.map((country) => {
    return {
      value: country.value,
      label: `${country.countryCode} ${country.phoneCode}`,
      phoneCode: country.phoneCode,
      currencyCode: country.currencyCode,
      countryCode: country.countryCode,
      flag: country.flag,
    };
  });

  const initialCountry = modifiedCountries.find(
    (item) => item.countryCode === initialCountryCode
  );

  const [selectedCountry, setSelectedCountry] =
    useState<any>(initialCountry);

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (country = selectedCountry) => {
    setSelectedCountry(country);
    setPhoneCode(country.phoneCode);
  };

  useEffect(() => {
    setPhoneCode(selectedCountry.phoneCode);
  }, []);

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    // Only allow numbers
    const cleanValue = value.replace(/\D/g, "");

    setPhoneNumber(cleanValue);

    // Update form value
    const fullNumber = `${selectedCountry.phoneCode}${cleanValue}`;

    register(name).onChange({
      target: {
        name,
        value: fullNumber,
      },
    });
  };

  return (
    <div>
      {/* LABEL */}
      <div className="flex space-x-2 items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 !text-black"
        >
          {label}
        </label>

        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button">
                  <CircleHelp className="w-4 h-4 text-slate-500" />
                </button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="mt-2">
        <div className="flex gap-2">
          {/* COUNTRY CODE */}
          <div className="w-32">
            <Select
              isSearchable
              primaryColor="blue"
              value={selectedCountry}
              onChange={handleCountryChange}
              options={modifiedCountries}
              placeholder={label}
            />
          </div>

          {/* PHONE INPUT */}
          <div className="relative rounded-md flex-1">
            {icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="text-slate-400 w-4 h-4" />
              </div>
            )}

            <input
              id={name}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={cn(
                "block w-full rounded-md border border-gray-300 bg-white py-2 px-3 !text-black shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm",
                errors[name] && "focus:ring-red-500 border-red-500",
                icon && "pl-10"
              )}
              placeholder={placeholder || label}
            />

            {unit && (
              <p className="bg-white py-2 px-3 rounded-tr-md rounded-br-md absolute inset-y-0 right-1 my-[2px] flex items-center text-black">
                {unit}
              </p>
            )}
          </div>
        </div>

        {/* ERROR */}
        {errors[name] && (
          <span className="text-xs text-red-600">
            {label} is required
          </span>
        )}
      </div>
    </div>
  );
}