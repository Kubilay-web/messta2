"use client";

import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

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
import { createParent } from "../../../../actions/parents";
import { TeacherCreateProps } from "../../../../types/types";
import { createTeacher } from "../../../../actions/teachers";
import FormMultipleSelectInput from "../../../../components/FormInputs/FormMultipleSelectInput";
import { generateRollNumber } from "../../../../lib/generateRoll";
import useSchoolStore from "../../../../store/school";
import { useUserSession } from "../../../../store/auth";

type TeacherFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes: DataOption[];
  departments: DataOption[];
  subjects: DataOption[];
  schoolId:string;
};

export type DataOption = {
  label: string;
  value: string;
};
export default function TeacherForm({
  editingId,
  initialData,
  classes,
  departments,
  subjects,
  schoolId
}: TeacherFormProps) {
  // Parents
  const { user } = useUserSession();
  const userRole = user?.role ?? "ADMIN";
  const relationships = [
    {
      label: "Mother",
      value: "Mother",
    },
    {
      label: "Father",
      value: "Father",
    },
    {
      label: "Guardian",
      value: "Guardian",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];
  const [selectedRelationship, setSelectedRelationship] = useState<any>(
    relationships[1]
  );

  // Titles
  const titles = [
    {
      label: "Mr",
      value: "Mr",
    },
    {
      label: "Mrs",
      value: "Mrs",
    },
  ];
  const [selectedTitle, setSelectedTitle] = useState<any>(titles[0]);

  // Class
  const contactMethods = [
    {
      label: "Phone",
      value: "Phone",
    },
    {
      label: "Email",
      value: "Email",
    },
    {
      label: "Whatsap",
      value: "Whatsap",
    },
  ];

  const qualifications = [
    {
      label: "Bachelors",
      value: "Bachelors",
    },
    {
      label: "Diploma",
      value: "Diploma",
    },
    {
      label: "Certificate",
      value: "Certificate",
    },
  ];
  const [selectedMethod, setSelectedMethod] = useState<any>(contactMethods[0]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(
    departments[0]
  );
  const [selectedSubjects, setSelectedSubjects] = useState<any>([subjects[0]]);

  // console.log(selectedSubjects);
  const [mainSubject, setMainSubject] = useState<any>(subjects[0]);
  const [qualification, setQualification] = useState<any>(qualifications[0]);
  const [selectedClasses, setSelectedClasses] = useState<any>([classes[0]]);

  // Gender
  const genders = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
  ];

  const [selectedGender, setSelectedGender] = useState<any>(genders[0]);

  // Nationality
  const initialCountryCode = "UG";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedNationality, setSelectedNationality] =
    useState<any>(initialCountry);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherCreateProps>({
    defaultValues: {
      firstName: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/management/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const { school } = useSchoolStore();


  async function saveTeacher(formData: TeacherCreateProps) {
  try {
    setLoading(true);
    
    // Form verilerini ve seçili değerleri birleştir
    const teacherData: TeacherCreateProps = {
      // Form'dan gelen değerler
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      whatsappNo: formData.whatsappNo,
      NIN: formData.NIN,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      dateOfJoining: formData.dateOfJoining,
      designation: formData.designation,
      experience: formData.experience ? Number(formData.experience) : 0,
      address: formData.address,
      
      // Seçili input'lardan gelen değerler

       schoolId: schoolId, // direkt prop'u kullan
      // schoolId: school?.id ?? "",
      schoolName: school?.name ?? "",
      employeeId: generateRollNumber(),
      imageUrl: imageUrl,
      title: selectedTitle?.value || "",
      gender: selectedGender?.value || "",
      nationality: selectedNationality?.label || "",
      contactMethod: selectedMethod?.value || "",
      departmentId: selectedDepartment?.value || "",
      departmentName: selectedDepartment?.label || "",
      qualification: qualification?.label || "",
      mainSubject: mainSubject?.label || "",
      mainSubjectId: mainSubject?.value || "",
      subjectsSummary: selectedSubjects?.map((item: any) => item?.label || "") || [],
      classIds: selectedClasses?.map((item: any) => item?.value || "") || [],
      classes: selectedClasses?.map((item: any) => item?.label || "") || [],
    };

    // Zorunlu alanları kontrol et
    if (!teacherData.email) {
      toast.error("Email is required");
      setLoading(false);
      return;
    }
    
    if (!teacherData.password) {
      toast.error("Password is required");
      setLoading(false);
      return;
    }
    
    if (!teacherData.NIN) {
      toast.error("National ID is required");
      setLoading(false);
      return;
    }
    
    if (!teacherData.phone) {
      toast.error("Phone number is required");
      setLoading(false);
      return;
    }
    
    if (!teacherData.schoolId) {
      toast.error("School ID is missing");
      setLoading(false);
      return;
    }

    if (!teacherData.firstName) {
      toast.error("First name is required");
      setLoading(false);
      return;
    }

    if (!teacherData.lastName) {
      toast.error("Last name is required");
      setLoading(false);
      return;
    }

    console.log("Saving teacher data:", teacherData);

    if (editingId) {
      // await updateTeacher(editingId, teacherData);
      // setLoading(false);
      // toast.success("Updated Successfully!");
    } else {
      const res = await createTeacher(teacherData);
      setLoading(false);
      toast.success("Successfully Created!");
      reset();
      
      // Form'u sıfırla
      setImageUrl("/images/student.png");
      setSelectedTitle(titles[0]);
      setSelectedGender(genders[0]);
      setSelectedNationality(initialCountry);
      setSelectedMethod(contactMethods[0]);
      setSelectedDepartment(departments[0]);
      setMainSubject(subjects[0]);
      setSelectedSubjects([subjects[0]]);
      setSelectedClasses([classes[0]]);
      setQualification(qualifications[0]);
      
      const path =
        userRole === "ADMIN"
          ? "/dashboard/users/teachers"
          : "/portal/secretary/teachers";
      router.push(path);
    }
  } catch (error) {
    setLoading(false);
    console.error("Error saving teacher:", error);
    toast.error(error instanceof Error ? error.message : "Failed to create teacher");
  }
}


  return (
    <form className="" onSubmit={handleSubmit(saveTeacher)}>
      <FormHeader
        href="/teachers"
        parent="users"
        title="Teacher"
        editingId={editingId}
        loading={loading}
      />
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Phone"
                name="phone"
                type="tel"
              />
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
                label="Whatsap No."
                name="whatsappNo"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Nationality"
                options={countries}
                option={selectedNationality}
                setOption={setSelectedNationality}
              />
              <TextInput
                register={register}
                errors={errors}
                label="National ID /Passport No"
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
              />
              <FormSelectInput
                label="Preferred Contact Method"
                options={contactMethods}
                option={selectedMethod}
                setOption={setSelectedMethod}
              />
              <PasswordInput
                register={register}
                errors={errors}
                label="Teacher Portal Password"
                name="password"
                type="password"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Designation"
                name="designation"
                placeholder="eg Head of Department"
              />
              <FormSelectInput
                label="Department"
                options={departments}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
                href="/dashboard/departments"
                toolTipText="Create New Department"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Qualification"
                options={qualifications}
                option={qualification}
                setOption={setQualification}
              />

              <FormSelectInput
                label="Main Subject"
                options={subjects}
                option={mainSubject}
                setOption={setMainSubject}
                href="/dashboard/subjects"
                toolTipText="Add New Subject"
              />
              {/* Multi select */}
              <FormMultipleSelectInput
                label="Subjects"
                options={subjects}
                option={selectedSubjects}
                setOption={setSelectedSubjects}
                href="/dashboard/academics/subjects"
                toolTipText="Add New Subject"
                isMultiple={true}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-3">
                {/* Multi select */}
                <FormMultipleSelectInput
                  label="Classes"
                  options={classes}
                  option={selectedClasses}
                  setOption={setSelectedClasses}
                  href="/dashboard/classes"
                  toolTipText="Add New Class"
                   isMultiple={true}
                />
                <div className="grid  gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Years of Experience"
                    name="experience"
                    placeholder="Eg 5"
                    type="number"
                  />
                </div>
                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Address"
                    name="address"
                  />
                </div>
              </div>
              <div className="grid">
                <ImageInput
                  title="Teacher Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="teacherProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/teachers"
        editingId={editingId}
        loading={loading}
        title="Teacher"
        parent="users"
      />
    </form>
  );
}
