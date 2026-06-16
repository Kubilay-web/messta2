"use client";

import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "../../../../components/FormInputs/TextInput";
import TextArea from "../../../../components/FormInputs/TextAreaInput";
import ImageInput from "../../../../components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "../../../../components/FormInputs/PasswordInput";
import FormSelectInput from "../../../../components/FormInputs/FormSelectInput";
import { countries } from "../../../../countries";
import { createParent, updateParent } from "../../../../actions/parents";

export type SelectOptionProps = {
  label: string;
  value: string;
};

type ParentFormProps = {
  editingId?: string;
  initialData?: any;
  schoolId?: string;
  schoolName?: string;
};

export type ParentProps = {
  title: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  NIN: string;
  gender: string;
  dob: string;
  phone: string;
  nationality: string;
  whatsapNo: string;
  imageUrl: string;
  contactMethod: string;
  occupation: string;
  address: string;
  password: string;
  schoolId: string;
  schoolName: string;
};

const relationships = [
  { label: "Mother", value: "Mother" },
  { label: "Father", value: "Father" },
  { label: "Guardian", value: "Guardian" },
  { label: "Other", value: "Other" },
];

const titles = [
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
];

const contactMethods = [
  { label: "Phone", value: "Phone" },
  { label: "Email", value: "Email" },
  { label: "Whatsap", value: "Whatsap" },
];

const genders = [
  { label: "MALE", value: "MALE" },
  { label: "FEMALE", value: "FEMALE" },
];

export default function ParentForm({
  editingId,
  initialData,
  schoolId,
  schoolName,
}: ParentFormProps) {
  const d = initialData;

  const [selectedRelationship, setSelectedRelationship] = useState(
    relationships.find((r) => r.value === d?.relationship) ?? relationships[1]
  );
  const [selectedTitle, setSelectedTitle] = useState(
    titles.find((t) => t.value === d?.title) ?? titles[0]
  );
  const [selectedMethod, setSelectedMethod] = useState(
    contactMethods.find((c) => c.value === d?.contactMethod) ?? contactMethods[0]
  );
  const [selectedGender, setSelectedGender] = useState(
    genders.find((g) => g.value === d?.gender) ?? genders[0]
  );
  const [selectedNationality, setSelectedNationality] = useState(
    countries.find((c) => c.label === d?.nationality) ??
      countries.find((c) => c.countryCode === "UG")
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentProps>({
    defaultValues: {
      firstName: d?.firstName ?? "",
      lastName: d?.lastName ?? "",
      email: d?.email ?? "",
      NIN: d?.NIN ?? "",
      dob: d?.dob ? new Date(d.dob).toISOString().split("T")[0] : "",
      phone: d?.phone ?? "",
      whatsapNo: d?.whatsapNo ?? "",
      occupation: d?.occupation ?? "",
      address: d?.address ?? "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    d?.imageUrl ?? "/management/images/student.png"
  );

  async function saveParent(data: ParentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.relationship = selectedRelationship.value;
      data.gender = selectedGender.value;
      data.nationality = (selectedNationality as any)?.label ?? "";
      data.contactMethod = selectedMethod.value;

      if (editingId) {
        await updateParent(editingId, data);
        toast.success("Updated Successfully!");
        router.push("/management/dashboard/users/parents");
      } else {
        data.schoolId = schoolId ?? "";
        data.schoolName = schoolName ?? "";
        await createParent(data);
        toast.success("Parent Created Successfully!");
        reset();
        setImageUrl("/management/images/student.png");
        router.push("/management/dashboard/users/parents");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveParent)}>
      <FormHeader
        href="/parents"
        parent="users"
        title="Parent"
        editingId={editingId}
        loading={loading}
      />

      <div className="py-6 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelectInput
            label="Title"
            options={titles}
            option={selectedTitle}
            setOption={setSelectedTitle}
          />
          <TextInput
            register={register}
            errors={errors}
            label="First Name"
            name="firstName"
          />
          <TextInput
            register={register}
            errors={errors}
            label="Last Name"
            name="lastName"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelectInput
            label="Relationship"
            options={relationships}
            option={selectedRelationship}
            setOption={setSelectedRelationship}
          />
          <TextInput
            register={register}
            errors={errors}
            label="National ID / Passport"
            name="NIN"
          />
          <FormSelectInput
            label="Gender"
            options={genders}
            option={selectedGender}
            setOption={setSelectedGender}
            isSearchable={false}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput
            register={register}
            errors={errors}
            label="Date of Birth"
            name="dob"
            type="date"
          />
          <TextInput
            register={register}
            errors={errors}
            label="Phone"
            name="phone"
            type="tel"
          />
          <FormSelectInput
            label="Nationality"
            options={countries}
            option={selectedNationality}
            setOption={setSelectedNationality}
          />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            register={register}
            errors={errors}
            label="Email"
            name="email"
            type="email"
          />
          <TextInput
            register={register}
            errors={errors}
            type="tel"
            label="WhatsApp No."
            name="whatsapNo"
          />
        </div>

        {/* Row 5: left details + right image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <FormSelectInput
              label="Preferred Contact Method"
              options={contactMethods}
              option={selectedMethod}
              setOption={setSelectedMethod}
            />
            <TextInput
              register={register}
              errors={errors}
              label="Occupation"
              name="occupation"
            />
            <TextArea
              register={register}
              errors={errors}
              label="Address"
              name="address"
            />
            {!editingId && (
              <PasswordInput
                register={register}
                errors={errors}
                label="Parent Portal Password"
                name="password"
              />
            )}
          </div>

          <div className="min-h-[200px]">
            <ImageInput
              title="Parent Profile Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="parentProfileImage"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/parents"
        editingId={editingId}
        loading={loading}
        title="Parent"
        parent="users"
      />
    </form>
  );
}
