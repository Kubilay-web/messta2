import { createGuardian, updatedGuardian } from "../../../../actions/students";
import SubmitButton from "../../../../components/FormInputs/SubmitButton";
import TextInput from "../../../../components/FormInputs/TextInput";
import { Guardian } from "../../../../types/types";
import { CheckCheck, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export interface GuardianFormData {
  studentId: string;
  // Father's Details
  fatherFullName: string;
  fatherOccupation: string;
  fatherPhoneNumber: string;
  fatherEmail: string;
  fatherOfficeAddress: string;
  isPrimaryGuardian: boolean;

  // Mother's Details
  motherFullName: string;
  motherOccupation: string;
  motherPhoneNumber: string;
  motherEmail: string;
  motherOfficeAddress: string;
  isSecondaryGuardian: boolean;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactNumber: string;
  isLocalGuardian: boolean;
}

export default function GuardianForm({
  studentId,
  initialData,
  editingId,
}: {
  studentId: string;
  initialData?: Guardian;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuardianFormData>({
    defaultValues: {
      isPrimaryGuardian: true,
      isSecondaryGuardian: true,
      isLocalGuardian: false,
      fatherFullName: initialData?.fatherFullName ?? "",
      fatherOccupation: initialData?.fatherOccupation ?? "",
      fatherPhoneNumber: initialData?.fatherPhoneNumber ?? "",
      fatherEmail: initialData?.fatherEmail ?? "",
      fatherOfficeAddress: initialData?.fatherOfficeAddress ?? "",
      motherFullName: initialData?.motherFullName ?? "",
      motherOccupation: initialData?.motherOccupation ?? "",
      motherPhoneNumber: initialData?.motherPhoneNumber ?? "",
      motherEmail: initialData?.motherEmail ?? "",
      motherOfficeAddress: initialData?.motherOfficeAddress ?? "",
      emergencyContactName: initialData?.emergencyContactName ?? "",
      emergencyContactRelation: initialData?.emergencyContactRelation ?? "",
      emergencyContactNumber: initialData?.emergencyContactNumber ?? "",
    },
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: GuardianFormData) => {
    data.studentId = studentId;
    setLoading(true);
    try {
      if (editingId) {
        await updatedGuardian(editingId, data);
        setLoading(false);
        toast.success("Guardian Info Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        await createGuardian(data);
        setLoading(false);
        toast.success("Guardian Info Saved Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Parent/Guardian Information
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Father's Details Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
                FN
              </div>
              <div>
                <h2 className="text-xl font-semibold">Father's Details</h2>
                <p className="text-gray-500">Primary Guardian</p>
              </div>
            </div>

            <div className="space-y-4">
              <TextInput
                register={register}
                errors={errors}
                label="Full Name"
                name="fatherFullName"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Occupation"
                name="fatherOccupation"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Phone Number"
                name="fatherPhoneNumber"
                placeholder="+1 (555) 0123-4567"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Email"
                name="fatherEmail"
                placeholder="email../../../..example.com"
                type="email"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Office Address"
                name="fatherOfficeAddress"
                placeholder="Enter office address"
              />
            </div>
          </div>

          {/* Mother's Details Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
                MN
              </div>
              <div>
                <h2 className="text-xl font-semibold">Mother's Details</h2>
                <p className="text-gray-500">Secondary Guardian</p>
              </div>
            </div>

            <div className="space-y-4">
              <TextInput
                register={register}
                errors={errors}
                label="Full Name"
                name="motherFullName"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Occupation"
                name="motherOccupation"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Phone Number"
                name="motherPhoneNumber"
                placeholder="+1 (555) 0123-4567"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Email"
                name="motherEmail"
                placeholder="email../../../..example.com"
                type="email"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Office Address"
                name="motherOfficeAddress"
                placeholder="Enter office address"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Emergency Contact</h2>
                <p className="text-gray-500">Additional Contact Person</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md">
              Local Guardian
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TextInput
              register={register}
              errors={errors}
              label="Full Name"
              name="emergencyContactName"
              placeholder="Enter full name"
            />
            <TextInput
              register={register}
              errors={errors}
              label="Relationship"
              name="emergencyContactRelation"
              placeholder="Enter relationship"
            />
            <TextInput
              register={register}
              errors={errors}
              label="Contact Number"
              name="emergencyContactNumber"
              placeholder="+1 (555) 4567-8901"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <SubmitButton
            buttonIcon={CheckCheck}
            title={editingId ? "Update Info" : "Save Info"}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}
