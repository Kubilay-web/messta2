"use client";

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
import InfoBanner from "../../../../components/info-banner";
import { Class, Parent } from "../../../../types/types";
import { createStudent, updateStudent } from "../../../../actions/students";
import RadioInput from "../../../../components/FormInputs/RadioInput";
import { generateRegistrationNumber } from "../../../../lib/generateRegNo";
import { generateRollNumber } from "../../../../lib/generateRoll";
import useSchoolStore from "../../../../store/school";
import { useUserSession } from "../../../../store/auth";
import { useDeviceInfo } from "../../../../hooks/useDeviceInfo";
import { getCurrentTime } from "../../../../lib/timeUtils";
import { createUserLog } from "../../../../actions/user-logs";

export type SelectOptionProps = { label: string; value: string };

type SingleStudentFormProps = {
  editingId?: string;
  initialData?: any;
  classes: Class[];
  parents: Parent[];
  nextSeq: number;
  schoolId?: string;
  schoolName?: string;
};

export type StudentProps = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  parentId: string;
  studentType: string;
  parentName?: string;
  classTitle?: string;
  classId: string;
  streamId: string;
  streamTitle?: string;
  password: string;
  imageUrl: string;
  phone: string;
  state: string;
  BCN: string;
  nationality: string;
  religion: string;
  gender: string;
  dob: string;
  rollNo: string;
  regNo: string;
  admissionDate: string;
  address: string;
  schoolId: string;
  schoolName: string;
};

const genders = [
  { label: "MALE", value: "MALE" },
  { label: "FEMALE", value: "FEMALE" },
];

const religions = [
  { label: "Roman Catholic", value: "Catholic" },
  { label: "Anglican", value: "Anglican" },
  { label: "Islam", value: "Islam" },
];

const studentTypes = [
  { label: "Private Student", id: "PS" },
  { label: "Sponsored Student", id: "SS" },
];

export default function SingleStudentForm({
  editingId,
  initialData,
  classes,
  parents,
  nextSeq,
  schoolId: schoolIdProp,
  schoolName: schoolNameProp,
}: SingleStudentFormProps) {
  const d = initialData;

  const parentOptions = parents.map((p) => ({
    label: `${p.firstName} ${p.lastName}`,
    value: p.id,
  }));

  const classOptions = classes.map((c) => ({ label: c.title, value: c.id }));

  const [selectedParent, setSelectedParent] = useState<any>(
    d?.parentId ? parentOptions.find((p) => p.value === d.parentId) ?? null : null
  );
  const [selectedClass, setSelectedClass] = useState<any>(
    d?.classId ? classOptions.find((c) => c.value === d.classId) ?? classOptions[0] : classOptions[0]
  );

  const classId = selectedClass?.value ?? "";
  const streams = classes.find((c) => c.id === classId)?.streams || [];
  const streamsOptions = streams.map((s) => ({ label: s.title, value: s.id }));

  const [selectedStream, setSelectedStream] = useState<any>(
    d?.streamId ? streamsOptions.find((s) => s.value === d.streamId) ?? null : null
  );
  const [selectedGender, setSelectedGender] = useState<any>(
    genders.find((g) => g.value === d?.gender) ?? genders[0]
  );
  const [selectedNationality, setSelectedNationality] = useState<any>(
    countries.find((c) => c.label === d?.nationality) ??
      countries.find((c) => c.countryCode === "UG")
  );
  const [selectedReligion, setSelectedReligion] = useState<any>(
    religions.find((r) => r.value === d?.religion) ?? religions[0]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: {
      firstName: d?.firstName ?? "",
      lastName: d?.lastName ?? "",
      email: d?.email ?? "",
      phone: d?.phone ?? "",
      state: d?.state ?? "",
      BCN: d?.BCN ?? "",
      dob: d?.dob ? new Date(d.dob).toISOString().split("T")[0] : "",
      admissionDate: d?.admissionDate
        ? new Date(d.admissionDate).toISOString().split("T")[0]
        : "",
      address: d?.address ?? "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(d?.imageUrl ?? "/management/images/student.png");
  const { school } = useSchoolStore();
  const { user } = useUserSession();
  const { getDeviceInfo } = useDeviceInfo();

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.name = `${data.firstName} ${data.lastName}`;
      data.parentId = selectedParent?.value ?? d?.parentId ?? "";
      data.parentName = selectedParent?.label ?? d?.parentName ?? "";
      data.classId = selectedClass?.value ?? "";
      data.classTitle = selectedClass?.label ?? "";
      data.streamId = selectedStream?.value ?? d?.streamId ?? "";
      data.streamTitle = selectedStream?.label ?? d?.streamTitle ?? "";
      data.nationality = (selectedNationality as any)?.label ?? "";
      data.religion = selectedReligion?.value ?? "";
      data.gender = selectedGender?.value ?? "";

      if (editingId) {
        await updateStudent(editingId, data);
        toast.success("Updated Successfully!");
        router.push("/management/dashboard/students");
      } else {
        data.schoolId = schoolIdProp || school?.id || "";
        data.schoolName = schoolNameProp || school?.name || "";
        data.rollNo = generateRollNumber();
        data.regNo = generateRegistrationNumber("BU", data.studentType as "PS" | "SS", nextSeq);

        await createStudent(data);

        try {
          const name = user?.name ?? "Admin";
          const deviceInfo = await getDeviceInfo();
          const { time } = getCurrentTime();
          await createUserLog({
            name,
            activity: `User (${name}) Created a new Student (${data.name})`,
            time,
            ipAddress: deviceInfo.ipAddress,
            device: deviceInfo.device,
            schoolId: data.schoolId,
          });
        } catch {}

        toast.success("Student Successfully Created!");
        reset();
        setImageUrl("/management/images/student.png");
        router.push("/management/dashboard/students");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />

      <div className="py-6 space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="First Name" name="firstName" />
          <TextInput register={register} errors={errors} label="Last Name" name="lastName" />
          <TextInput register={register} errors={errors} label="Email" name="email" type="email" />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelectInput
            label="Parent"
            options={parentOptions}
            option={selectedParent}
            setOption={setSelectedParent}
            toolTipText="Add New Parent"
            href="management/dashboard/users/parents/new"
          />
          <FormSelectInput
            label="Class"
            options={classOptions}
            option={selectedClass}
            setOption={setSelectedClass}
            toolTipText="Add New Class"
            href="/management/dashboard/academics/classes"
          />
          <FormSelectInput
            label="Stream/Section"
            options={streamsOptions}
            option={selectedStream}
            setOption={setSelectedStream}
            toolTipText="Add New Stream"
            href="/management/dashboard/academics/classes"
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Phone" name="phone" type="tel" />
          <FormSelectInput
            label="Nationality"
            options={countries}
            option={selectedNationality}
            setOption={setSelectedNationality}
          />
          {!editingId && (
            <PasswordInput
              register={register}
              errors={errors}
              type="password"
              label="Student Password"
              name="password"
              toolTipText="Password will be used by student on the student Portal"
            />
          )}
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="State/Village" name="state" />
          <TextInput register={register} errors={errors} label="Birth Certificate No." name="BCN" />
          <FormSelectInput
            label="Religion"
            options={religions}
            option={selectedReligion}
            setOption={setSelectedReligion}
          />
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelectInput
            label="Gender"
            options={genders}
            option={selectedGender}
            setOption={setSelectedGender}
            isSearchable={false}
          />
          <TextInput register={register} errors={errors} label="Date of Birth" name="dob" type="date" />
          <TextInput register={register} errors={errors} label="Admission Date" name="admissionDate" type="date" />
        </div>

        {/* Row 6: type + address | image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <RadioInput
              radioOptions={studentTypes}
              register={register}
              label="Student Type"
              name="studentType"
              errors={errors}
              defaultValue="PS"
            />
            <TextInput register={register} errors={errors} label="Address" name="address" />
          </div>
          <div className="min-h-[200px]">
            <ImageInput
              title="Student Profile Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="studentProfileImage"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/students"
        editingId={editingId}
        loading={loading}
        title="Student"
        parent=""
      />
    </form>
  );
}
