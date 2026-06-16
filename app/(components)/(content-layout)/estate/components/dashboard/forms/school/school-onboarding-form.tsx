// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// import TextInput from "../../../../components/FormInputs/TextInput";

// import ImageInput from "../../../../components/FormInputs/ImageInput";
// import toast from "react-hot-toast";

// import SubmitButton from "../../../../components/FormInputs/SubmitButton";
// import { SaveAll, Send } from "lucide-react";
// import { createSchool } from "../../../../actions/schools";

// export type SelectOptionProps = {
// 	label: string;
// 	value: string;
// };

// export type SchoolProps = {
// 	name: string;
// 	logo: string;
// };
// export default function SchoolOnboardingForm() {
// 	const {
// 		register,
// 		handleSubmit,
// 		reset,
// 		formState: { errors },
// 	} = useForm<SchoolProps>({
// 		defaultValues: {
// 			name: "",
// 		},
// 	});
// 	const router = useRouter();

// 	const [loading, setLoading] = useState(false);
// 	const initialImage = "/management/images/logo.png";
// 	const [imageUrl, setImageUrl] = useState(initialImage);
// 	async function saveStudent(data: SchoolProps) {
// 		try {
// 			setLoading(true);
// 			data.logo = imageUrl;
// 			console.log(data);
// 			const res = await createSchool(data);

// 			console.log(res);
// 			setLoading(false);
// 			toast.success("Successfully Created!");
// 			reset();
// 			router.push(
// 				`/management/super-dashboard/schools-page/school-admin/${res.id}?name=${res.name}`
// 			);
// 		} catch (error) {
// 			setLoading(false);
// 			console.log(error);
// 		}
// 	}

// 	return (
// 		<form className="" onSubmit={handleSubmit(saveStudent)}>
// 			<div className="text-center md:text-start">
// 				<h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
// 					Welcome to School Pro,
// 				</h2>
// 				<p className="leading-7 [&:not(:first-child)]:mt-2">
// 					Complete your school's profile to get started with SchoolPro.
// 				</p>
// 			</div>
// 			<div className="grid grid-cols-12 gap-6 py-3">
// 				<div className="lg:col-span-12 col-span-full space-y-3">
// 					<div className="grid gap-6">
// 						<div className="grid  gap-3">
// 							<TextInput
// 								register={register}
// 								errors={errors}
// 								label="School Name"
// 								name="name"
// 								placeholder="Enter the official name of your school"
// 							/>
// 						</div>

// 						<div className="grid">
// 							<ImageInput
// 								title="Customize your School Logo (500px x 150px)"
// 								imageUrl={imageUrl}
// 								setImageUrl={setImageUrl}
// 								// endpoint="schoolLogo"
// 								className="object-contain"
// 								size="sm"
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<SubmitButton
// 				buttonIcon={SaveAll}
// 				title="Register Your School"
// 				loading={loading}
// 				loadingTitle="Registering please wait..."
// 			/>
// 		</form>
// 	);
// }





"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import TextInput from "../../../../components/FormInputs/TextInput";
import ImageInput from "../../../../components/FormInputs/ImageInput";
import SubmitButton from "../../../../components/FormInputs/SubmitButton";

import toast from "react-hot-toast";
import { SaveAll } from "lucide-react";
import { createSchool } from "../../../../actions/schools";

export type SchoolProps = {
  name: string;
  logo: string;
};

export default function SchoolOnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolProps>({ defaultValues: { name: "" } });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialImage = "/management/images/logo.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveSchool(data: SchoolProps) {
    try {
      setLoading(true);
      data.logo = imageUrl;
      const res = await createSchool(data);

      setLoading(false);
      toast.success("Successfully Created!");
      reset();
      router.push(
        `/management/super-dashboard/schools-page/school-admin/${res.id}?name=${res.name}`
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to create school!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(saveSchool)}
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-lg shadow-md"
    >
      {/* Header */}
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Welcome to School Pro,
        </h2>
        <p className="mt-2 text-gray-600">
          Complete your school's profile to get started with SchoolPro.
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-6">
        <TextInput
          register={register}
          errors={errors}
          label="School Name"
          name="name"
          placeholder="Enter the official name of your school"
        />

        <ImageInput
          title="Customize your School Logo (500px x 150px)"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          className="object-contain"
          size="sm"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center md:justify-start">
        <SubmitButton
          buttonIcon={SaveAll}
          title="Register Your School"
          loading={loading}
          loadingTitle="Registering please wait..."
          className="w-full md:w-auto"
        />
      </div>
    </form>
  );
}