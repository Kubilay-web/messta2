// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { MapPin, Mail, Phone, Clock } from "lucide-react";
// import { toast } from "sonner";
// import { contactSection } from "../../data";
// import { Section } from "../../types/types";
// import NoSection from "./NoSection";
// import { createSchoolInquiry } from "../../actions/site";

// export interface ContactData {
//   fullName: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
//   schoolId: string;
// }
// const SchoolContactForm = ({
//   section,
// }: {
//   section: Section | null | undefined;
// }) => {
//   // if (!section) {
//   //   return <NoSection />;
//   // }
//   const {
//     title,
//     description,
//     locationInfo,
//     emailInfo,
//     phoneInfo,
//     hoursInfo,
//     formSettings,
//   }: {
//     title: string;
//     description: string;
//     locationInfo: {
//       title: string;
//       address: string;
//       note: string;
//     };

//     emailInfo: {
//       title: string;
//       email: string;
//       note: string;
//     };

//     phoneInfo: {
//       title: string;
//       phone: string;
//       note: string;
//     };
//     hoursInfo: {
//       title: string;
//       hours: string;
//       note: string;
//     };
//     formSettings: {
//       nameLabel: string;
//       namePlaceholder: string;
//       phoneLabel: string;
//       phonePlaceholder: string;
//       emailLabel: string;
//       emailPlaceholder: string;
//       subjectLabel: string;
//       subjectPlaceholder: string;
//       messageLabel: string;
//       messagePlaceholder: string;
//       buttonText: string;
//       buttonColor: string;
//     };
//   } = section?.settings;

//   const { email, fullAddress, mainPhone } = contactSection;
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ContactData>();
//   const [isLoading, setIsLoading] = useState(false);
//   const onSubmit = async (data: ContactData) => {
//     setIsLoading(true);
//     console.log(data);
//     data.schoolId = section?.schoolId ?? "";
//     try {
//       const res = await createSchoolInquiry(data);
//       setIsLoading(false);
//       toast.success("Message Sent Successfully", {
//         description:
//           "Your message has been sent successfully!, You will be contacted with in 24 hrs",
//       });
//       reset();
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: locationInfo.title,
//       info: locationInfo.address,
//       description: locationInfo.note,
//     },
//     {
//       icon: Mail,
//       title: emailInfo.title,
//       info: emailInfo.email,
//       description: emailInfo.note,
//     },
//     {
//       icon: Phone,
//       title: phoneInfo.title,
//       info: phoneInfo.phone,
//       description: phoneInfo.note,
//     },
//     {
//       icon: Clock,
//       title: hoursInfo.title,
//       info: hoursInfo.hours,
//       description: hoursInfo.note,
//     },
//   ];

//   return (
//     <div id="contact" className="relative min-h-screen bg-gray-50 py-20">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         {/* Grid Lines */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

//         {/* Floating Gradients */}
//         <div className="absolute top-20 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute top-40 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4 bold-heading">
//             {title}
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             {description}
//           </p>
//         </div>

//         {/* Contact Info Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//           {contactInfo.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
//                 <item.icon className="w-6 h-6 text-emerald-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//               <p className="text-emerald-600 font-medium mb-2">{item.info}</p>
//               <p className="text-gray-500 text-sm">{item.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Contact Form */}
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     {formSettings.nameLabel}
//                   </label>
//                   <input
//                     type="text"
//                     {...register("fullName", { required: "Name is required" })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
//                     placeholder={formSettings.namePlaceholder}
//                   />
//                   {errors.fullName && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.fullName.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     {formSettings.phoneLabel}
//                   </label>
//                   <input
//                     type="tel"
//                     {...register("phone", {
//                       required: "Phone number is required",
//                     })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
//                     placeholder={formSettings.phonePlaceholder}
//                   />
//                   {errors.phone && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.phone.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   {formSettings.emailLabel}
//                 </label>
//                 <input
//                   type="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
//                   placeholder={formSettings.emailPlaceholder}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   {formSettings.subjectLabel}
//                 </label>
//                 <input
//                   type="text"
//                   {...register("subject", { required: "Subject is required" })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
//                   placeholder={formSettings.subjectPlaceholder}
//                 />
//                 {errors.subject && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.subject.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   {formSettings.messageLabel}
//                 </label>
//                 <textarea
//                   {...register("message", { required: "Message is required" })}
//                   rows={4}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
//                   placeholder={formSettings.messagePlaceholder}
//                 />
//                 {errors.message && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.message.message}
//                   </p>
//                 )}
//               </div>

//               {isLoading ? (
//                 <button
//                   type="button"
//                   style={{ backgroundColor: formSettings.buttonColor }}
//                   disabled
//                   className="w-full  text-white py-3 px-6 rounded-lg  transition-colors font-medium"
//                 >
//                   Sending please wait ...
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   style={{ backgroundColor: formSettings.buttonColor }}
//                   className="w-full text-white py-3 px-6 rounded-lg transition-colors font-medium"
//                 >
//                   {formSettings.buttonText}
//                 </button>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchoolContactForm;








"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { Section } from "../../types/types";
import NoSection from "./NoSection";
import { createSchoolInquiry } from "../../actions/site";

export interface ContactData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  schoolId: string;
}

const SchoolContactForm = ({ section }: { section: Section | null | undefined }) => {
  // Eğer section veya settings yoksa NoSection render et
  if (!section || !section.settings) {
    return <NoSection />;
  }

  // Güvenli destructuring
  const {
    title,
    description,
    locationInfo,
    emailInfo,
    phoneInfo,
    hoursInfo,
    formSettings,
  } = section.settings;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ContactData) => {
    setIsLoading(true);
    data.schoolId = section?.schoolId ?? "";

    try {
      await createSchoolInquiry(data);
      toast.success("Message Sent Successfully", {
        description: "Your message has been sent successfully! You will be contacted within 24 hrs",
      });
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: locationInfo.title, info: locationInfo.address, description: locationInfo.note },
    { icon: Mail, title: emailInfo.title, info: emailInfo.email, description: emailInfo.note },
    { icon: Phone, title: phoneInfo.title, info: phoneInfo.phone, description: phoneInfo.note },
    { icon: Clock, title: hoursInfo.title, info: hoursInfo.hours, description: hoursInfo.note },
  ];

  return (
    <div id="contact" className="relative min-h-screen bg-gray-50 py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-emerald-600 font-medium mb-2">{item.info}</p>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{formSettings.nameLabel}</label>
                  <input
                    type="text"
                    {...register("fullName", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    placeholder={formSettings.namePlaceholder}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{formSettings.phoneLabel}</label>
                  <input
                    type="tel"
                    {...register("phone", { required: "Phone number is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    placeholder={formSettings.phonePlaceholder}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{formSettings.emailLabel}</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder={formSettings.emailPlaceholder}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{formSettings.subjectLabel}</label>
                <input
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder={formSettings.subjectPlaceholder}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{formSettings.messageLabel}</label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
                  placeholder={formSettings.messagePlaceholder}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                style={{ backgroundColor: formSettings.buttonColor }}
                disabled={isLoading}
                className="w-full text-white py-3 px-6 rounded-lg transition-colors font-medium"
              >
                {isLoading ? "Sending please wait ..." : formSettings.buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolContactForm;