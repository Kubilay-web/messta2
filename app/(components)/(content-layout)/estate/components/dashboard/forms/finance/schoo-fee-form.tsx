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
import ImageInput from "../../../../components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "../../../../components/FormInputs/PasswordInput";
import FormSelectInput from "../../../../components/FormInputs/FormSelectInput";
import { countries } from "../../../../countries";
import InfoBanner from "../../../../components/info-banner";
import { Class, Parent, Period } from "../../../../types/types";
import { createStudent } from "../../../../actions/students";
import RadioInput from "../../../../components/FormInputs/RadioInput";
import { generateRegistrationNumber } from "../../../../lib/generateRegNo";
import { generateRollNumber } from "../../../../lib/generateRoll";
import useSchoolStore from "../../../../store/school";
import { Plus, Trash2 } from "lucide-react";
import { createSchoolFees } from "../../../../actions/school-fees";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SchoolFeeFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes: Class[];
  terms: Period[];
};
export type SchoolFeeProps = {
  term: string;
  title: string;
  year: number;
  fees: {
    title: string;
    amount: number;
  }[];
  schoolId: string;
  classId: string;
  periodId: string;
  schoolName: string;
  className: string;
};
interface FeeEntry {
  id: number;
  title: string;
  amount: string;
}
export default function SchoolFeeForm({
  editingId,
  initialData,
  classes,
  terms,
  schoolId,
  schoolName
}: SchoolFeeFormProps
) {
  const currentYear = new Date().getFullYear(); //eg 2025
  const termOptions = terms
    .filter((item) => item.year === currentYear)
    .map((term) => {
      return {
        label: `Term ${term.term}-${term.year}`,
        value: term.id,
      };
    });
  const [selectedTerm, setSelectedTerm] = useState<any>(null);

  // Class
  const classOptions = classes.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolFeeProps>({
    defaultValues: {
      title: "",
    },
  });
  const [feeEntries, setFeeEntries] = useState<FeeEntry[]>([
    { id: 1, title: "", amount: "" },
  ]);

  const addFeeEntry = (): void => {
    const newEntry: FeeEntry = {
      id: feeEntries.length + 1,
      title: "",
      amount: "",
    };
    setFeeEntries([...feeEntries, newEntry]);
  };

  const removeFeeEntry = (id: number): void => {
    setFeeEntries(feeEntries.filter((entry) => entry.id !== id));
  };

  const updateFeeEntry = (
    id: number,
    field: keyof FeeEntry,
    value: string
  ): void => {
    setFeeEntries(
      feeEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const totalFees: number = feeEntries.reduce(
    (sum, entry) => sum + (Number(entry.amount) || 0),
    0
  );

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { school } = useSchoolStore();
  async function saveFees(data: SchoolFeeProps) {
    try {
      setLoading(true);
      data.schoolId = schoolId ?? "";
      data.schoolName = schoolName ?? "";
      data.classId = selectedClass.value;
      data.className = selectedClass.label;
      data.periodId = selectedTerm.value;
      data.term = selectedTerm.label;
      data.title = `${selectedClass.label} ${selectedTerm.label} School Fees`;
      data.fees = feeEntries.map((item) => {
        return {
          title: item.title,
          amount: Number(item.amount),
        };
      });
      data.year = currentYear;

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        console.log(data);
        await createSchoolFees(data);
        toast.success("Student Successfully Created!");
        reset();
        setFeeEntries([{ id: 1, title: "", amount: "" }]);
        router.push("/management/dashboard/finance/fees");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveFees)}>
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Class"
                options={classOptions}
                option={selectedClass}
                setOption={setSelectedClass}
                toolTipText="Add New Class"
                href="/management/dashboard/academics/classes"
              />
              <FormSelectInput
                label="Term"
                options={termOptions}
                option={selectedTerm}
                setOption={setSelectedTerm}
                toolTipText="Add New Term"
                href="/management/dashboard/academics/terms"
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Fee Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feeEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={entry.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateFeeEntry(entry.id, "title", e.target.value)
                          }
                          className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter fee title"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={entry.amount}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateFeeEntry(entry.id, "amount", e.target.value)
                          }
                          className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => removeFeeEntry(entry.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={addFeeEntry}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Fee
                      </button>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      Total: ${totalFees.toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/management/fees"
        editingId={editingId}
        loading={loading}
        title="School Fees"
        parent="finance"
      />
    </form>
  );
}
